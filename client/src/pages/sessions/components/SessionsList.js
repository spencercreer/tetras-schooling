// React
import { useState } from 'react'
// Components
import SessionCard from './SessionCard'
import SessionModal from './SessionModal'
// Styles
import '../../../App.css'

const SessionsList = ({ sessions }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedSessionId, setSelectedSessionId] = useState(11)

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            {
                sessions?.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                        handleToggleModal={handleToggleModal}
                        setSelectedSessionId={setSelectedSessionId}
                    />
                ))
            }
            <SessionModal
                visible={modalVisible}
                sessionId={selectedSessionId}
                handleCloseModal={handleToggleModal}
            />
        </>
    )
}

export default SessionsList