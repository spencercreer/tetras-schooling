import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { GET_STUDENTS } from '../utils/queries'

const Students = () => {
    const [studentData, setStudentData] = useState()

    const { loading, data } = useQuery(GET_STUDENTS)
    if (loading)
        return <div>Loading...</div>

    const students = data.getStudents || []

    return (
        <>
        {
            students?.map(({ first_name, last_name }) => (
                <div>{`${first_name} ${last_name}`}</div>
            ))
        }
        
        </>
    )
}

export default Students