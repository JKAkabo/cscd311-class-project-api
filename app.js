const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const models = require('./models')
const db = require('./db');
const middlewares = require('./middlewares/index');

const app = express();
const jwtKey = '12345';

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/halls', middlewares.auth.protectRoute(), (req, res) => {
    models.Hall.find((err, halls) => {
        if (err) res.status(500).json(err);

        res.json(halls);
    });
});

app.post('/halls', middlewares.auth.protectRoute(), async (req, res) => {
    try {
        const newHall = new models.Hall(req.body);
        await newHall.save()
        res.json(newHall);
    }
    catch (err) { res.status(500).json(err) }
});

app.get('/halls/:id/rooms', middlewares.auth.protectRoute(), (req, res) => {
    models.Student.findOne({ idNumber: req.decodedToken.idNumber }, (err, student) => {
        if (err) res.status(500).json(err);

        if (req.query.ignoreGender == 'true') {
            models.Room.find({ hallId: req.params.id }, async (err, rooms) => {
                if (err) res.status(500).json(err);
                
                res.json(rooms);
            });
        }
        else {
            models.Room.find({ hallId: req.params.id, occupantGender: student.gender }, async (err, rooms) => {
                if (err) res.status(500).json(err);

                if (req.query.emptyOnly == 'true') {
                    let emptyRooms = [];
                    for (let index = 0; index < rooms.length; index++) {
                        let room = rooms[index];
                        await models.Student.find({ room: room.id }, (err, students) => {
                            if (students.length !== null)
                                emptyRooms.push(room);
                        });
                    }
                    res.json(emptyRooms);
                } else {
                    res.json(rooms);
                }
            });
        }
    });
});

app.post('/rooms', middlewares.auth.protectRoute(), async (req, res) => {
    try {
        const newRoom = new models.Room(req.body);
        await newRoom.save();
        res.json(newRoom);
    }
    catch (err) { res.status(500).json(err) }
});

app.post('/authenticate', async (req, res) => {
    const { idNumber, pin } = req.body;

    if (!idNumber || !pin) {
        res.status(401).end();
    }

    models.Student.findOne({ idNumber: idNumber }, (err, student) => {
        if (err) res.status(401).json(err);

        student.comparePin(pin, (err, isMatch) => {
            if (err) res.json(401).json(err);

            const token = jwt.sign({ idNumber }, jwtKey);

            res.json({ accessToken: token });
        })
    })
});

app.post('/students', middlewares.auth.protectRoute(), async (req, res) => {
    try {
        const newStudent = new models.Student(req.body);
        await newStudent.save();
        res.json(newStudent);
    } catch (err) { res.status(500).json({ error: err }) }
});

app.get('/students', middlewares.auth.protectRoute(), async (req, res) => {

    if (req.query.sessionStudentOnly === 'true') {
        models.Student.findOne({ idNumber: req.decodedToken.idNumber }, (err, student) => {
            if (err) res.status(500).json(err);

            res.json(student);
        })
    }

    if (req.query.roomId) {
        models.Student.find({ roomId: req.query.roomId }, (err, students) => {
            if (err) res.status(500).json(err);

            res.json(students)
        })
    }
})

app.patch('/students', middlewares.auth.protectRoute(), async (req, res) => {
    models.Student.updateOne({ idNumber: req.decodedToken.idNumber }, req.body, (err, status) => {
        if (err) res.status(500).json(err);
        res.json(status);
    })
})

db.connect().then(async () => {
    app.listen(3000, () => { console.log("Server is up") });
});