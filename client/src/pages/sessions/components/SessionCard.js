// Apollo
import { useMutation } from '@apollo/client';
import { UPDATE_SESSION } from '../../../utils/mutations';
// Antd
import { Skeleton, Card, message } from 'antd';
import { MailOutlined, EllipsisOutlined, UserOutlined, CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
// Utils
import { convertDate, formatTimeZone } from '../../../utils/conversions'
import { getEmailTemplate, getEmailSubject, getRandomEmoji } from '../../../utils/messages';
import '../style.css';

const { Meta } = Card;

const SessionCard = ({ session, handleToggleModal, setSelectedSessionId }) => {
    const [updateSession] = useMutation(UPDATE_SESSION)
    const { id, date, presession_conf, tutor_eval, Student: { first_name, last_name, email, time_zone } } = session
    // TODO: move timezone conversion to the backend
    const timeZone = formatTimeZone(time_zone)
    // TODO: Student time for email is wrong
    const sessionDate = convertDate(date, 'llll')
    const studentDate = convertDate(date, 'llll', timeZone.diff)

    const handleOnClick = () => {
        setSelectedSessionId(id)
        handleToggleModal()
    }

    const getIcon = (check) => {
        return check ? <CheckCircleOutlined style={{ color: 'green' }} /> : <MinusCircleOutlined style={{ color: 'blue' }} />
    }

    const getDescription = () => {
        return (
            <div>
                <h3>{first_name} {last_name}, {studentDate.time} {timeZone.code}</h3>
                <div>Confirmation Email: {getIcon(presession_conf)}</div>
                <div>Tutor Evaluation Form: {getIcon(tutor_eval)}</div>
            </div>
        )
    }

    const copySessionEmail = async () => {
        navigator.clipboard.writeText(getEmailTemplate(first_name, studentDate.formatted, timeZone.long))
            .then(() => message.success('Session confirmation email copied! ' + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(getEmailSubject(studentDate.formatted, time_zone)))
            .then(() => message.success('Email subject line copied! ' + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(email))
            .then(() => message.success(`Student email copied! ` + getRandomEmoji(), .7))

        const { data } = await updateSession({
            variables: { sessionData: { id, presession_conf: true } }
        })
    }

    return (
        <>
            <Card
                className="session-card"
                actions={[
                    <EllipsisOutlined
                        key='ellipsis'
                        onClick={() => handleOnClick()}
                    />,
                    <MailOutlined
                        key='edit'
                        onClick={copySessionEmail}
                    />,
                    <UserOutlined />,
                ]}
            >
                <Skeleton
                    loading={false}
                >
                    <Meta
                        title={<h1>{sessionDate.formatted}</h1>}
                        description={getDescription()}
                    />
                </Skeleton>
            </Card>
        </>
    )
}

export default SessionCard