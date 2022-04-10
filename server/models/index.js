const Tutor = require('./Tutor')
const Student = require('./Student')
const Session = require('./Session')

Session.belongsTo(Tutor, {
    foreignKey: 'tutor_id'
})

Tutor.hasMany(Session, {
    foreignKey: 'tutor_id'
})

Session.belongsTo(Student, {
    foreignKey: 'student_id'
})

Student.hasMany(Session, {
    foreignKey: 'student_id'
})

Student.belongsTo(Tutor, {
    foreignKey: 'tutor_id'
})

Tutor.hasMany(Student, {
    foreignKey: 'tutor_id'
})

module.exports = { Tutor, Student, Session }