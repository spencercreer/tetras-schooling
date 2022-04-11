// Antd
import { Skeleton, Switch, Card } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { convertDate } from '../utils/conversions'

const { Meta } = Card;

const SessionCard = ({ session, handleToggleModal }) => {
    const { date, Student: { first_name, last_name } } = session
    const sessionDate = convertDate(date, 'ddd, ll')

    const handleOnClick = () => {
        handleToggleModal()
    }


    const getDescription = () => {
        return <div>
            <div>{first_name} {last_name}</div>
        </div>
    }
    return (
        <>
            <div>{session.id}</div>
            <div>{first_name} {last_name}</div>
            <Card
            style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
            actions={[
                <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => handleOnClick()}
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
            >
                <Meta
                    title={sessionDate.formatted}
                    description={getDescription()}
                />
            </Skeleton>
        </Card>
        </>
    )
}

export default SessionCard