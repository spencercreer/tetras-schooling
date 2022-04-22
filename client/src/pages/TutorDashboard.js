// Components
import NavSider from "../components/NavSider"
// Antd
import { Layout } from 'antd'

const { Content } = Layout

const TutorDashboard = () => {
    return (
        <>
        <NavSider page={'dashboard'} />
        <Content>
            <h1>TutorDashboard</h1>
            <div>
                <h2>Today's Sessions</h2>
                <div>Session Card 1</div>
                <div>Session Card 2</div>
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