import { gql } from '@apollo/client'

export const ADD_STUDENT = gql`
    mutation addStudent($studentData: StudentInput!) {
        addStudent(studentData: $studentData) {
            id
            first_name
            last_name
        }
    }
`

export const UPDATE_STUDENT = gql`
    mutation updateStudent($id: Int!, $studentData: StudentInput!) {
        updateStudent(id: $id, studentData: $studentData) {
            id
            first_name
            last_name
            email
            class_code
            grad_date
            time_zone
            slack
            status
        }
    }
`

export const UPDATE_STATUSES = gql`
    mutation updateStatuses($studentsData: [StudentInput]) {
        updateStatuses(studentsData: $studentsData) {
            id
            status
        }
    }
`

export const ADD_SESSION = gql`
    mutation addSession($sessionData: SessionInput!) {
        addSession(sessionData: $sessionData) {
            id
            date
        }
    }
`

export const UPDATE_SESSION = gql`
    mutation updateSession($sessionData: SessionInput!) {
        updateSession(sessionData: $sessionData) {
            id
            presession_conf
            b2b
            clock_in
            clock_out
        }
    }
`