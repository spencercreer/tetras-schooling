import { gql } from '@apollo/client'

export const GET_STUDENTS = gql`
    {
        getStudents {
            id
            first_name
            last_name
            time_zone
            status
        }
    }
`