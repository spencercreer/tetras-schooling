// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../utils/queries'
// Components
import NavSider from '../components/NavSider'
import SessionCard from '../components/SessionCard'
import LoadingCard from '../components/LoadingCard'
// Antd
import { Layout, Radio } from 'antd'

const { Content } = Layout

const TutorDashboard = () => {

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
            <NavSider page={'dashboard'} />
            <Content style={{ marginLeft: '10px' }}>
                <h1>Tutor Dashboard</h1>
                <div>
                    <Radio.Group  >
                        <Radio.Button value='today'>Today</Radio.Button>
                        <Radio.Button value='tomorrow'>Tomorrow</Radio.Button>
                    </Radio.Group>
                    <h2>Today's Sessions</h2>
                    <SessionCard
                        key={sessions[0].id}
                        session={sessions[0]}
                        // handleToggleModal={handleToggleModal}
                        // setSelectedSessionId={setSelectedSessionId}
                    />
                    <SessionCard
                        key={sessions[1].id}
                        session={sessions[1]}
                        // handleToggleModal={handleToggleModal}
                        // setSelectedSessionId={setSelectedSessionId}
                    />
                    <SessionCard
                        key={sessions[2].id}
                        session={sessions[2]}
                        // handleToggleModal={handleToggleModal}
                        // setSelectedSessionId={setSelectedSessionId}
                    />
                </div>
                <div>
                    <h2>Paycheck Info</h2>
                </div>
                <div>
                    <h2>Student Analytics</h2>
                </div>
            </Content>
        </>
    )
}

export default TutorDashboard