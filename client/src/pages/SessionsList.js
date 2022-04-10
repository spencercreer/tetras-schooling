import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../utils/queries'

const SessionsList = () => {
    const { loading, data } = useQuery(GET_TUTOR_SESSIONS, { variables: { tutorId: 1 } })
    if (loading) return <div>Loading...</div>

    const sessions = data.getTutorSessions || []

    return (
        <>
            {
                sessions?.map((session) => (
                    <>
                        <div>{session.id}</div>
                        <div>{session.date}</div>
                        <div>{session.Student.first_name}</div>
                    </>
                ))
            }
        </>
    )
}

export default SessionsList