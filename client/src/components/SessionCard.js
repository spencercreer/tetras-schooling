// Antd
import { Skeleton, Switch, Card } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { convertDate } from '../utils/conversions'

const { Meta } = Card;

const SessionCard = ({ session }) => {
    const { date, Student: { first_name, last_name } } = session
    const sessionDate = convertDate(date)
    return (
        <>
            <div>{session.id}</div>
            <div>{sessionDate.formatted}</div>
            <div>{first_name} {last_name}</div>
            <Card
            style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
            actions={[
                <EllipsisOutlined
                    key="ellipsis"
                    // onClick={() => handleOnClick(false)}
                />,
                <EditOutlined
                    key="edit"
                    // onClick={() => handleOnClick(true)}
                />,
                <Switch 
                    // checked={active}
                    // onChange={handleStatusChange}
                />,
            ]}
        >
            <Skeleton 
                loading={false}
                // avatar active
            >
                <Meta
                    // avatar={getAvatar()}
                    title={session.Student.first_name}
                    // description={getDescription()}
                />
            </Skeleton>
        </Card>
        </>
    )
}

export default SessionCard