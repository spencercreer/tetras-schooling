import { gql } from '@apollo/client'

export const GET_STUDENT = gql`
    {
        getStudent {
            id
            first_name
            last_name
            time_zone
        }
    }
`