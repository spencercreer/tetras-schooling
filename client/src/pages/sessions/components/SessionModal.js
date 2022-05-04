// React
import { useState, useEffect } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_SESSION } from '../../../utils/queries'
import { UPDATE_SESSION } from '../../../utils/mutations'
// Antd
import { Modal, Form, Button, Radio, Select, Input, TimePicker, message, Tooltip } from 'antd'
import { SlackOutlined, ClockCircleOutlined } from '@ant-design/icons'
// Utils
import { layout, validateMessages, topics } from '../../../utils/form'
import { convertDate, formatTimeZone } from '../../../utils/conversions'
import { getClockOutNotes, getSlackMessage, getFormUrl, getSessionMessages, getRandomEmoji } from '../../../utils/messages'
// import moment from 'moment'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input;

const SessionModal = ({ visible, handleCloseModal, sessionId }) => {
    const [preworkSession, setPreworkSession] = useState(false)
    const [form] = Form.useForm()
    useEffect(() => {
        form.resetFields()
    }, [sessionId, form])
    const [updateSession] = useMutation(UPDATE_SESSION)
    const { loading, data } = useQuery(GET_SESSION, { variables: { id: sessionId } })
    if (loading)
        return <div>Loading...</div>

    const { id, date, Student: { first_name, last_name, email, class_code, grad_date, time_zone } } = data?.getSession
    const session = data?.getSession
    // TODO: This is doubled on SessionCard
    const timeZone = formatTimeZone(time_zone)
    const sessionDate = convertDate(date, 'llll')

    const onFinish = async (values) => {
        const { b2b, clock_out, show, topics, notes } = values
        const { data } = await updateSession({
            variables: { sessionData: { id, b2b, clock_out, tutor_eval: true, show, topics, notes } }
        })
        // TODO: Load the session modal with data if the session has already been recorded
        const { googleSheet, clockOutNotes, formUrl } = getSessionMessages(data, values, session)

        navigator.clipboard.writeText(googleSheet)
            .then(() => message.success(`Google sheets row copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(clockOutNotes))
            .then(() => message.success('Clock-out notes copied! ' + getRandomEmoji(), .7))
            .then(() => message.loading('Opening Form', 1))
            .then(() => window.open(formUrl, 'noreferrer'))
    }

    const handleSlackClick = () => {
        navigator.clipboard.writeText(getSlackMessage(class_code))
        message.success('Slack message copied! ' + getRandomEmoji())
    };

    const footerButtons = [
        <Button
            key='back'
            onClick={handleCloseModal}
        >
            Exit
        </Button>,
        <Tooltip key='slack-message' title={'Slack Message'}>
            <Button
                type='primary'
                onClick={handleSlackClick}
            >
                <SlackOutlined />
            </Button>
        </Tooltip>,
        <Tooltip key='record-session' title={'Record Session'}>
            <Button
                key='record-session'
                type='primary'
                // loading={loading}
                onClick={() => form.submit()}
            >
                <ClockCircleOutlined />
            </Button>
        </Tooltip>,
    ]

    return (
        <>
            <Modal
                title={
                    <>
                        <h3>{first_name} {last_name}</h3>
                        <h3>{sessionDate.formatted}</h3>
                    </>
                }
                visible={visible}
                onCancel={handleCloseModal}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    form={form}
                    name='session'
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    initialValues={{
                        prework: 'No',
                        b2b: false,
                        show: true,
                        effort: "5"
                        //  clock_in: moment(convertDate(date, 'HH:mm a', 0).formatted, 'HH:mm a')
                    }}
                >
                    <Item name={'prework'} label='Prework' rules={[{ required: true }]}>
                        <Radio.Group onChange={() => setPreworkSession(!preworkSession)}>
                            <Radio.Button value={'No'}>No</Radio.Button>
                            <Radio.Button value={'Yes'}>Yes</Radio.Button>
                        </Radio.Group>
                    </Item>
                    {preworkSession &&
                        <Item name={'prework_topics'} label='Prework Topics' rules={[{ required: true }]}>
                            <Input />
                        </Item>
                    }
                    <Item name={'show'} label='Show' rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value={true}>Show</Radio.Button>
                            <Radio.Button value={false}>No Show</Radio.Button>
                        </Radio.Group>
                    </Item>
                    <Item name={'clock_out'} label='Clock-Out' rules={[{ required: true }]}
                    >
                        <TimePicker
                            format='HH:mm a'
                        />
                    </Item>
                    <Item name={'b2b'} label='B2B' rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value={false}>No</Radio.Button>
                            <Radio.Button value={true}>Yes</Radio.Button>
                        </Radio.Group>
                    </Item>
                    <Item name='effort' label='Student Effort' rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value='1'>1</Radio>
                            <Radio value='2'>2</Radio>
                            <Radio value='3'>3</Radio>
                            <Radio value='4'>4</Radio>
                            <Radio value='5'>5</Radio>
                        </Radio.Group>
                    </Item>
                    <Item name={'topics'} label='Topics' rules={[{ required: true }]}
                    >
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {topics.map((topic, index) => (
                                <Option key={index} value={topic}>{topic}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item name={'notes'} label='Notes' rules={[{ required: true }]}
                    >
                        <TextArea rows={2} />
                    </Item>
                    {/* {
                        updateMessage && <Alert message={updateMessage.text} type={updateMessage.error ? 'error' : 'success'} />
                    } */}
                </Form>
            </Modal>
        </>
    )
}

export default SessionModal