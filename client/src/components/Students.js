import { useQuery } from '@apollo/client';
import { GET_STUDENT } from '../utils/queries';

const Students = () => {
    const { loading, data } = useQuery(GET_STUDENT);
    if (loading)
        return <div>Loading...</div>

    const students = data.getStudent || []

    return (
        <>
            {
                students.map((student) => (
                    <div>Students</div>
                ))
            }
        </>
    )
}

export default Students