const models = require('./models');
const db = require('./db');

let setupStudents = async (studentsData) => {
    studentsData.forEach(async studentData => {
        console.log('Setting up student: ' + studentData.firstName + ' ' + studentData.lastName );
        try {
            let student = new models.Student(studentData);
            await student.save();
        } catch (err) { console.log(err) }
    });
}

let setupRooms = async (roomsData) => {
    roomsData.forEach(async roomData => {
        console.log('Setting up room: ' + roomData.number);
        try {
            let room = new models.Room(roomData);
            await room.save();
        } catch (err) { console.log(err) }
    })
}

db.connect().then(async () => {
    // CREATE STUDENTS
    const studentsData = [
        {
            idNumber: '10664053',
            pin: '12345',
            firstName: 'Jimmy',
            lastName: 'Neutron',
            gender: 'M'
        },
        {
            idNumber: '10664055',
            pin: '12345',
            firstName: 'Tony',
            lastName: 'Stark',
            gender: 'M'
        },
        {
            idNumber: '10664058',
            pin: '12345',
            firstName: 'Natasha',
            lastName: 'Romanoff',
            gender: 'F'
        },
        {
            idNumber: '10664056',
            pin: '12345',
            firstName: 'Scarlet',
            lastName: 'Witch',
            gender: 'F'
        },
        {
            idNumber: '10664057',
            pin: '12345',
            firstName: 'Nick',
            lastName: 'Fury',
            gender: 'M'
        }
    ];

    let legonHall = new models.Hall({ name: 'Legon Hall' });
    await legonHall.save();

    let akuaffoHall = new models.Hall({ name: 'Akuaffo Hall' });
    await akuaffoHall.save();

    let voltaHall = new models.Hall({ name: 'Volta Hall' });
    await voltaHall.save();

    let commonwealthHall = new models.Hall({ name: 'Commonwealth Hall' });
    await commonwealthHall.save();

    const roomsData = [
        {
            number: 'AA406',
            hallId: legonHall._id,
            occupantGender: 'M'
        },
        {
            number: 'AA407',
            hallId: legonHall._id,
            occupantGender: 'M'
        },
        {
            number: 'AB406',
            hallId: legonHall._id,
            occupantGender: 'F'
        },
        {
            number: 'AB407',
            hallId: legonHall._id,
            occupantGender: 'F'
        },
        {
            number: 'AA201',
            hallId: akuaffoHall._id,
            occupantGender: 'F'
        },
        {
            number: 'AA204',
            hallId: akuaffoHall._id,
            occupantGender: 'F'
        },
        {
            number: 'AB304',
            hallId: akuaffoHall._id,
            occupantGender: 'M'
        },
        {
            number: 'AB307',
            hallId: akuaffoHall._id,
            occupantGender: 'M'
        },
        {
            number: '2022',
            hallId: voltaHall._id,
            occupantGender: 'F',
        },
        {
            number: '2034',
            hallId: voltaHall._id,
            occupantGender: 'F'
        },
        {
            number: 'D14',
            hallId: commonwealthHall._id,
            occupantGender: 'M'
        },
        {
            number: 'E10',
            hallId: commonwealthHall._id,
            occupantGender: 'M'
        }
    ]

    setupStudents(studentsData);
    setupRooms(roomsData);

    stop();
})
