// Apollo
import { useQuery } from '@apollo/client'
import { GET_TUTOR_SESSIONS } from '../../utils/queries'
// Components
import NavSider from '../../components/NavSider'
import SessionsList from './components/SessionsList'
import SessionListHeader from './components/SessionListHeader'
import LoadingCard from '../../components/LoadingCard'
// Antd
import { Layout } from 'antd'
// Styles
import '../../App.css'

const { Content } = Layout

const SessionsPage = () => {
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
            <NavSider page={'sessions'} />
            <Content className='page-content'>
                <SessionListHeader />
                <SessionsList sessions={sessions} />
            </Content>
        </>
    )
}

export default SessionsPage