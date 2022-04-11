// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../utils/queries'
// Components
import SessionCard from '../components/SessionCard'
import LoadingCard from '../components/LoadingCard';


const SessionsList = () => {
    const { loading, data } = useQuery(GET_TUTOR_SESSIONS, { variables: { tutorId: 1 } })
    if (loading)
        return (
            [...Array(12).keys()].map((i) => (
                <LoadingCard
                    key={i}
                    loading={true}
                />
            ))
        )

    const sessions = data.getTutorSessions || []

    return (
        <>
            {
                sessions?.map((session) => (
                   <SessionCard session={session} />
                ))
            }
        </>
    )
}

export default SessionsList