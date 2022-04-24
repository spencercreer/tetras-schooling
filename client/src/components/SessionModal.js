// React
import { useEffect } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_SESSION } from '../utils/queries'
import { UPDATE_SESSION } from '../utils/mutations'
// Antd
import { Modal, Form, Button, Select, Input, TimePicker, Alert, message, Tooltip } from 'antd'
import { UserOutlined, EditOutlined, SlackOutlined, CopyOutlined, ClockCircleOutlined } from '@ant-design/icons'
// Utils
import { layout, validateMessages, topics } from '../utils/form'
import { convertDate, formatTimeZone, getRandomEmoji } from '../utils/conversions'
import moment from 'moment'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input;

const SessionModal = ({ visible, handleCloseModal, sessionId }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.resetFields()
    }, [sessionId, form])
    const [updateSession] = useMutation(UPDATE_SESSION)
    const { loading, data } = useQuery(GET_SESSION, { variables: { id: sessionId } })
    if (loading)
        return <div>Loading...</div>

    const { id, date, Student: { first_name, last_name, email, class_code, grad_date, time_zone } } = data?.getSession


    const onFinish = async ({ b2b, clock_in, clock_out, show, topics, notes }) => {
        const { data } = await updateSession({
            variables: { sessionData: { id, b2b, clock_in, clock_out, show } }
        })
        const gradDate = convertDate(grad_date, 'L')
        const today = convertDate(Date.now(), 'YYYY-MM-DD')
        const { diff } = formatTimeZone(time_zone)
        const clockIn = convertDate(date, 'LT ', 0)
        const clockOut = convertDate(data.updateSession.clock_out, 'LT', 0)
        const B2B = b2b ? 'Yes' : 'No'
        const SHOW = show ? 'Show' : 'No Show'
        //TODO: Add Notes input to form and presession conf

        console.log(today)
        //TODO: Automate this process
        navigator.clipboard.writeText(`=SPLIT("${class_code},${gradDate.formatted},${first_name} ${last_name},${email},${today.formatted},+${diff}hr,${clockIn.formatted},${clockOut.formatted},Yes, ${B2B},Yes, ${SHOW},${topics},${notes},Yes", ",")`)
            .then(() => message.success(`Google sheets row copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(`${class_code}
${first_name} ${last_name}
B2B-No`))
            .then(() => message.success('Clock-out notes copied! ' + getRandomEmoji(), .7))
            .then(() => message.loading("Opening Form", 1))
//Clock in and out

            // .then(() => window.open(`https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform?entry.1626809215=${class_code}&entry.1262798942=${last_name}, ${first_name}&entry.1509111758=${email}&entry.1450620354=No&entry.758887222=Creer, Spencer&entry.1572772860=Yes&entry.568333504=FSF - Full Stack Flex Web Development(Javascript)&entry.1311659485=${B2B}&entry.401287639=${today.formatted}&entry.781752343_hour=21&entry.781752343_minute=30&entry.721200944_hour=22&entry.721200944_minute=04&entry.1394734474=No&entry.2041303987=${topics}&entry.790082012=I am not a TA in this student's class&entry.2075286046=5&entry.1836903312=No mention of it at all.&entry.2058615286=${notes}`, "noreferrer"))
    }

    const footerButtons = [
        <Button
            key="back"
            onClick={handleCloseModal}
        >
            Exit
        </Button>,
        <Tooltip key="slack-message" title={'Slack Message'}>
            <Button
                type="primary"
            // onClick={handleSlackClick}
            >
                <SlackOutlined />
            </Button>
        </Tooltip>,
        <Tooltip key="clock-out-notes" title={'Clock-Out Notes'}>
            <Button
                type="primary"
            // onClick={handleClockOutClick}
            >
                <ClockCircleOutlined />
            </Button>
        </Tooltip>,
        <Button
            key="record-session"
            type="primary"
            style={{ width: "125px" }}
            // loading={loading}
            onClick={() => form.submit()}
        >
            Record Session
        </Button>,
    ]

    return (
        <>
            <Modal
                title={'Session Info'}
                visible={visible}
                onCancel={handleCloseModal}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    form={form}
                    name="session"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    initialValues={{
                        //  clock_in: moment(convertDate(date, 'HH:mm a', 0).formatted, "HH:mm a")
                    }}
                >
                    <Item name={'clock_in'} label="Clock-in" rules={[{ required: true }]}
                    >
                        <TimePicker
                            format="HH:mm a"
                            disabled={true}
                        />
                    </Item>
                    <Item name={'clock_out'} label="Clock-Out" rules={[{ required: true }]}
                    >
                        <TimePicker
                            format="HH:mm a"
                        />
                    </Item>
                    <Item name={'b2b'} label="B2B" rules={[{ required: true }]}
                    >
                        <Select
                        >
                            <Option value={false}>No</Option>
                            <Option value={true}>Yes</Option>
                        </Select>
                    </Item>
                    <Item name={'show'} label="Show" rules={[{ required: true }]}
                    >
                        <Select
                        >
                            <Option value={true}>Show</Option>
                            <Option value={false}>No Show</Option>
                        </Select>
                    </Item>
                    <Item name={'topics'} label="Topics" rules={[{ required: true }]}
                    >
                        <Select
                        >
                            {topics.map((topic, index) => (
                                <Option key={index} value={topic}>{topic}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item name={'notes'} label="Notes" rules={[{ required: true }]}
                    >
                        <TextArea rows={2} />
                    </Item>
                    {/* {
                        updateMessage && <Alert message={updateMessage.text} type={updateMessage.error ? "error" : "success"} />
                    } */}
                </Form>
            </Modal>
        </>
    )
}

export default SessionModal