// React
import { useState } from 'react'
// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../utils/queries'
// Components
import NavSider from '../components/NavSider'
import SessionCard from './sessions/components/SessionCard'
import LoadingCard from '../components/LoadingCard'
// Utils
import { convertDate } from '../utils/conversions'
// Antd
import { Layout, Row, Radio } from 'antd'

const { Content } = Layout

const TutorDashboard = () => {
    const [selectedDay, setSelectedDay] = useState('today')
    const diff = selectedDay === 'tomorrow' ? 24 : 0

    const day = convertDate(Date.now(), 'L', diff).formatted

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

    const filteredSessions = sessions.filter((session) => (
        convertDate(session.date, 'L').formatted === day
    ))

    return (
        <>
            <NavSider page={'dashboard'} />
            <Content style={{ marginLeft: '45px', marginTop: '20px' }}>
                <h1 style={{ fontSize: '30px' }}>Welcome Spencer</h1>
                <div style={{ margin: '20px' }}>
                    <div>
                        <Row>
                            <Radio.Group value={selectedDay} buttonStyle="solid" onChange={(event) => setSelectedDay(event.target.value)}>
                                <Radio.Button value='today'>Today</Radio.Button>
                                <Radio.Button value='tomorrow'>Tomorrow</Radio.Button>
                            </Radio.Group>
                        </Row>
                        {filteredSessions.length === 0 ?
                            <div style={{ height: '215px', fontSize: '30px'}}>You don't have any sessions {selectedDay}</div>
                            :
                            filteredSessions.reverse().map(session => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                // handleToggleModal={handleToggleModal}
                                // setSelectedSessionId={setSelectedSessionId}
                                />
                            ))
                        }
                    </div>
                    <div>
                        <h2>Paycheck Info</h2>
                    </div>
                    <div>
                        <h2>Student Analytics</h2>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default TutorDashboard