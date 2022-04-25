// React
import { useState } from 'react'
// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../../utils/queries'
// Components
import NavSider from '../../components/NavSider'
import SessionsList from '../sessions/components/SessionsList'
import LoadingCard from '../../components/LoadingCard'
// Utils
import { convertDate } from '../../utils/conversions'
// Antd
import { Layout, Row, Radio } from 'antd'
import '../../App.css'

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
            <Content className='page-content'>
                <h1 style={{ fontSize: '30px' }}>Welcome Spencer!</h1>
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
                            <SessionsList sessions={filteredSessions} />
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