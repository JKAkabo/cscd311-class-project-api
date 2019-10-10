const models = require('./models');
const db = require('./db');

let setupStudents = async (studentsData) => {
    let students = [];
    studentsData.forEach(studentData => {
        try {
            let student = new models.Student(studentData);
            await student.save();
            students.push(student);
        } catch (err) { console.log(err) }
    });
}
db.connect().then(() => {
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
            idNumber: '10664055',
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

    let students = [];
    let halls = [];

    const hallsData =  [
        { name: 'Legon Hall' },
        { name: 'Akuaffo Hall' },
        { name: 'CommonWealth Hall' },
        { name: 'Mensah Sarbah Hall' }
    ];

    hallsData.forEach(hallData => {
        try {
            let hall = new models.Hall(hallData);
            hall.save();

            halls.push(hall);
        } catch (err) { console.log(err) }
    })
})
