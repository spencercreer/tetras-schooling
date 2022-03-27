import { gql } from '@apollo/client'

export const GET_STUDENT_CARDS = gql`
    {
        getStudents {
            id
            first_name
            last_name
            time_zone
            grad_date
            status
        }
    }
`

export const GET_STUDENT_MODAL = gql`
    query getStudent($id: Int!) {
        getStudent (id: $id) {
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