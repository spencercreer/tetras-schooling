// React
import { useState } from 'react'
// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../utils/queries'
// Components
import SessionCard from '../components/SessionCard'
import LoadingCard from '../components/LoadingCard'
import SessionModal from '../components/SessionModal'
import SessionListHeader from '../components/SessionListHeader'

const SessionsList = () => {
    const [modalVisible, setModalVisible] = useState(false)

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

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <div style={{ marginLeft: 10, marginRight: 10, paddingTop: 10 }}>
            <SessionListHeader />
            {
                sessions?.map((session) => (
                   <SessionCard 
                        key={session.id}
                        session={session}
                        handleToggleModal={handleToggleModal}
                    />
                ))
            }
            <SessionModal
                visible={modalVisible}
                handleCloseModal={handleToggleModal}
            />
        </div>
    )
}

export default SessionsList