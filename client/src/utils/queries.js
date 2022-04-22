import { gql } from '@apollo/client'

export const GET_STUDENT_CARDS = gql`
    {
        getAllStudents {
            id
            first_name
            last_name
            time_zone
            class_code
            grad_date
            status
            github
        }
    }
`

export const GET_STUDENT_NAMES = gql`
    query getStudentsByParam($parameter: String!, $val: String!)
    {
        getStudentsByParam(parameter: $parameter, val: $val) {
            id
            first_name
            last_name
            grad_date
        }
    }
`

export const GET_STUDENT_MODAL = gql`
    query getStudent($id: Int!) {
        getStudent(id: $id) {
            id
            first_name
            last_name
            email
            class_code
            grad_date
            time_zone
            slack
            status
            github
        }
    }
`

export const GET_TUTOR_SESSIONS = gql`
    query Query($tutorId: Int!) {
        getTutorSessions(tutorId: $tutorId) {
            id
            date
            presession_conf
            tutor_eval
            Student {
                first_name
                last_name
                email
                class_code
                grad_date
                time_zone
                slack
            }
        }
}
`

export const GET_SESSION = gql`
    query Query($id: Int!) {
        getSession(id: $id) {
            id
            date
            presession_conf
            tutor_eval
            Student {
                first_name
                last_name
                email
                class_code
                grad_date
                time_zone
                slack
            }
        }
}
`
