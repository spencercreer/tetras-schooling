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
import { Layout, Row, Col, Card } from 'antd'
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
                    <Row style={{ marginBottom: '15px' }}>
                        <Col sm={24} md={18} style={{paddingRight: '15px'}}>
                            <Card
                                // style={{ width: '100%' }}
                                tabList={[
                                    {
                                        key: 'today',
                                        tab: 'Today',
                                    },
                                    {
                                        key: 'tomorrow',
                                        tab: 'Tomorrow',
                                    },
                                ]}
                                activeTabKey={selectedDay}
                                onTabChange={key => {
                                    setSelectedDay(key);
                                }}
                            >
                                {filteredSessions.length === 0 ?
                                    <div style={{ height: '215px', fontSize: '30px' }}>You don't have any sessions {selectedDay}</div>
                                    :
                                    <SessionsList sessions={filteredSessions} />
                                }
                            </Card>
                        </Col>
                        <Col sm={24} md={6}>
                            <Card title="Paycheck Info">
                                <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                                    Inner Card content
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                    <div>
                        <Card title="Paycheck Info">
                            <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                                Inner Card content
                            </Card>
                            <Card
                                style={{ marginTop: 16 }}
                                type="inner"
                                title="Inner Card title"
                                extra={<a href="#">More</a>}
                            >
                                Inner Card content
                            </Card>
                        </Card>
                    </div>
                    <div>
                        <Card title="Student Info">
                            <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
                                Inner Card content
                            </Card>
                            <Card
                                style={{ marginTop: 16 }}
                                type="inner"
                                title="Inner Card title"
                                extra={<a href="#">More</a>}
                            >
                                Inner Card content
                            </Card>
                        </Card>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default TutorDashboard