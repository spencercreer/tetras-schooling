// React
import { useState } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_SESSION } from '../utils/queries'
import { UPDATE_SESSION } from '../utils/mutations'
// Antd
import { Modal, Form, Button, Select, Input, DatePicker, TimePicker, Alert, message, Tooltip } from 'antd'
import { UserOutlined, EditOutlined, SlackOutlined, CopyOutlined, ClockCircleOutlined } from '@ant-design/icons'
// Utils
import { layout, validateMessages } from '../utils/form'
import { convertDate, getRandomEmoji } from '../utils/conversions'

const { Item } = Form
const { Option } = Select

const SessionModal = ({ visible, handleCloseModal, sessionId }) => {
    const [form] = Form.useForm()
    const [updateSession] = useMutation(UPDATE_SESSION)
    const { loading, data } = useQuery(GET_SESSION, { variables: { id: sessionId } })
    if (loading)
        return <div>Loading...</div>

    const { id, date, Student: { first_name, last_name, email, class_code }} = data?.getSession

    const onFinish = async (values) => {
        const { b2b, clock_in, clock_out } = values
        const { data } = await updateSession({
            variables: { sessionData: { id , b2b, clock_in, clock_out }}
        })
        console.log(data)

        navigator.clipboard.writeText(email)
            .then(() => message.success(`${email} copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(`${last_name}, ${first_name}`))
            .then(() => message.success(`${last_name}, ${first_name} copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(class_code))
            .then(() => message.success(`${class_code} copied! ` + getRandomEmoji(), .7))
            .then(() => message.loading("Opening Form", 1))
            .then(() => window.open("https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform", "_blank", "noreferrer"))
    }

    const footerButtons = [
        <Button
            key="back"
            onClick={handleCloseModal}
        >
            Exit
        </Button>,
        <Tooltip key="form-notes" title={'Form Notes'}>
            <Button
                type="primary"
            // onClick={handleFormNotesClick}
            >
                <CopyOutlined />
            </Button>
        </Tooltip>,
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
        <Tooltip key="edit" title={'Edit'}>
            <Button
                type="primary"
            // onClick={() => handleToggleEdit(true)}
            >
                <EditOutlined />
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
                // initialValues={{
                //     student: {
                //         class_code: class_code,
                //         email: email,
                //         time_zone: time_zone,
                //         grad_date: moment(gradDate.convertedDate, "MM/DD/YYYY")
                //     }
                // }}
                >
                    <Item
                        name={'clock_in'}
                        label="Clock-in"
                        rules={[{ required: true }]}
                    >
                        <TimePicker 
                            format="HH:mm a"
                        />
                    </Item>
                    <Item
                        name={'clock_out'}
                        label="Clock-Out"
                        rules={[{ required: true }]}
                    >
                        <TimePicker 
                            format="HH:mm a"
                        />
                    </Item>
                    <Item
                        name={'b2b'}
                        label="B2B"
                        rules={[{ required: true }]}
                    >
                        <Select
                        >
                            <Option value={false}>No</Option>
                            <Option value={true}>Yes</Option>
                        </Select>
                    </Item>
                    <Item name={'show'} label="Show"
                        rules={[{ required: true }]}
                    >
                        <Select
                        >
                            <Option value={true}>Show</Option>
                            <Option value={false}>No Show</Option>
                        </Select>
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