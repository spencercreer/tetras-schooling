// Antd
import { Skeleton, Switch, Card, message } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { convertDate, getEmailTemplate, getEmailSubject, getRandomEmoji } from '../utils/conversions'

const { Meta } = Card;

const SessionCard = ({ session, handleToggleModal }) => {
    const { date, Student: { first_name, last_name, email, time_zone } } = session
    const sessionDate = convertDate(date, 'llll')

    const handleOnClick = () => {
        handleToggleModal()
    }

    const getDescription = () => {
        return <div>
            <div>{first_name} {last_name}</div>
        </div>
    }

    const copySessionEmail = () => {
        navigator.clipboard.writeText(getEmailTemplate(first_name, sessionDate.formatted))
            .then(() => message.success('Session confirmation email copied! ' + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(getEmailSubject(sessionDate.formatted, time_zone)))
            .then(() => message.success('Email subject line copied! ' + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(email))
            .then(() => message.success(`Student email copied! ` + getRandomEmoji(), .7))
    }

    return (
        <>
            <Card
                style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
                actions={[
                    <EllipsisOutlined
                        key="ellipsis"
                        onClick={() => handleOnClick()}
                    />,
                    <EditOutlined
                        key="edit"
                        // TODO: Change icon
                        onClick={copySessionEmail}
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