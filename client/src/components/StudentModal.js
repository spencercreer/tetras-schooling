import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';
import convertGradDate from '../utils/conversions';

import { Row, Modal, Button, message, Avatar, Tooltip, Form, Input, Select, Alert } from 'antd'
import { UserOutlined, EditOutlined, SlackOutlined, CopyOutlined, ClockCircleOutlined, MailOutlined, StopTwoTone } from '@ant-design/icons';

const { Item } = Form
const { Option } = Select

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const StudentModal = ({ visible, edit, studentId, handleCancel }) => {
    const [form] = Form.useForm()
    const { loading, data } = useQuery(GET_STUDENT_MODAL, { variables: { id: studentId } })
    if (loading)
        return <div>Loading...</div>

    const disabled = !edit
    const { first_name, last_name, email, class_code, grad_date, time_zone, slack } = data?.getStudent
    const { gradDate, graduated } = convertGradDate(grad_date)

    const onFinish = async (values) => {
        // try {
        //   const { data } = await addStudent({
        //     variables: { studentData: { ...values.student } }
        //   })

        //   if (data.addStudent.id) {
        //     form.resetFields()
        //   } else {
        //     setMessage({ text: 'The student was not added.', error: true })
        //   }
        // }
        // catch (err) {
        //   setMessage({ text: 'The student was not added.', error: true })
        //   console.error(err)
        // }
        // setLoading(false)
    };

    const getRandomEmoji = () => {
        const emojis = [0x1F600, 0x1F604, 0x1F609, 0x1F929, 0x1F92A, 0x1F920, 0x1F973, 0x1F60E, 0x1F9D0, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355, 0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA, 0x1F431, 0x1F42A, 0x1F439, 0x1F424];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)]
        return String.fromCodePoint(emoji)
    }

    const handleFormNotesClick = () => {
        navigator.clipboard.writeText(email)
            .then(() => message.success(`${email} copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(`${last_name}, ${first_name}`))
            .then(() => message.success(`${last_name}, ${first_name} copied! ` + getRandomEmoji(), .7))
            .then(() => navigator.clipboard.writeText(class_code))
            .then(() => message.success(`${class_code} copied! ` + getRandomEmoji(), .7))
            .then(() => message.loading("Opening Form", 1))
            .then(() => window.open("https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform", "_blank", "noreferrer"))
    }

    const handleSlackClick = () => {
        navigator.clipboard.writeText(`Please fill out the evaluation form at the link below:
https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform

Your class code is: ${class_code}`)
        message.success('Slack message copied! ' + getRandomEmoji())
    };

    const handleClockOutClick = () => {
        navigator.clipboard.writeText(`${class_code}
${first_name} ${last_name}
B2B-No
No Show`)
        message.success('Clock-out notes copied! ' + getRandomEmoji())
    }

    const getStudentsTime = () => {
        let currentTime = new Date()
        currentTime = currentTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        return currentTime
    }

    const footerButtons = edit ?
        [
            <Button key="back" onClick={handleCancel}>
                Exit
            </Button>,
            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
            >
                Submit
            </Button>,
            <Tooltip key="info" title={'Student Info'}>
                <Button
                    type="primary"
                // onClick={handleFormNotesClick}
                >
                    <UserOutlined />
                </Button>
            </Tooltip>,
        ]
        :
        [
            <Button key="back" onClick={handleCancel}>
                Exit
            </Button>,
            <Button
                key="submit"
                type="primary"
                loading={loading}
            >
                Record Session
            </Button>,
            <Tooltip key="edit" title={'Edit'}>
                <Button
                    type="primary"
                // onClick={handleFormNotesClick}
                >
                    <EditOutlined />
                </Button>
            </Tooltip>,
            <Tooltip key="form-notes" title={'Form Notes'}>
                <Button
                    type="primary"
                    onClick={handleFormNotesClick}
                >
                    <CopyOutlined />
                </Button>
            </Tooltip>,
            <Tooltip key="slack-message" title={'Slack Message'}>
                <Button
                    type="primary"
                    onClick={handleSlackClick}
                >
                    <SlackOutlined />
                </Button>
            </Tooltip>,
            <Tooltip key="clock-out-notes" title={'Clock-Out Notes'}>
                <Button
                    type="primary"
                    onClick={handleClockOutClick}
                >
                    <ClockCircleOutlined />
                </Button>
            </Tooltip>,
        ]

    return (
        <>
            <Modal
                title={edit ? "Edit Student Info" : "Student Info"}
                visible={visible}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={footerButtons}
            >
                <Row>
                    <Avatar style={{ backgroundColor: '#00a2ae', marginRight: '8px' }}>{first_name[0] + last_name[0]}</Avatar>
                    <h2>{`${first_name}  ${last_name}`}</h2>
                </Row>
                <Form
                    {...layout}
                    form={form}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Item name={['student', 'class_code']} label="Class Code" rules={[{ required: true }]}>
                        <Input.Group compact>
                            <Input
                                style={{ width: '90%' }}
                                defaultValue={class_code}
                                disabled={disabled}
                            />
                            <Tooltip
                                style={{ width: '10%' }}
                                title="Copy Class Code"
                            >
                                <Button icon={<CopyOutlined />} />
                            </Tooltip>
                        </Input.Group>
                    </Item>
                    <Item name={['student', 'email']} label="Email" rules={[{ required: true }, { type: 'email' }]}>
                        <Input.Group compact>
                            <Input
                                style={{ width: '90%' }}
                                defaultValue={email}
                                disabled={disabled}
                            />
                            <Tooltip
                                style={{ width: '10%' }}
                            >
                                <Button icon={<MailOutlined />} />
                            </Tooltip>
                        </Input.Group>
                    </Item>
                    <Item name={['student', 'time_zone']} label="Time Zone">
                        <Input.Group compact>
                            <Input
                                style={{ width: '70%' }}
                                defaultValue={getStudentsTime()}
                                disabled={disabled}
                            />
                            <Input
                                style={{ width: '30%' }}
                                defaultValue={time_zone}
                                disabled={disabled}
                            />
                        </Input.Group>
                    </Item>
                    <Item name={['student', 'grad_date']} label="Graduation Date">
                        <Input
                            defaultValue={gradDate}
                            suffix={graduated && <StopTwoTone twoToneColor={"red"} />}
                            disabled={disabled}
                        />
                    </Item>
                    <Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                        {
                            message && <Alert message={message.text} type={message.error ? "error" : "success"} />
                        }
                    </Item>
                </Form>
            </Modal>
        </>
    )
}

export default StudentModal