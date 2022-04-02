import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';
import convertGradDate from '../utils/conversions';

import { Row, Modal, Button, message, Avatar, Tooltip, Form, Input, Select, Alert } from 'antd'
import { UserOutlined, CopyOutlined, MailOutlined, StopTwoTone } from '@ant-design/icons';

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

const EditStudentForm = ({ visible, edit, studentId, handleCancel, handleToggleEdit }) => {
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

    const getStudentsTime = () => {
        let currentTime = new Date()
        currentTime = currentTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        return currentTime
    }

    const footerButtons = [
        <Button key="back" onClick={handleCancel}>
            Exit
        </Button>,
        <Tooltip key="info" title={'Student Info'}>
            <Button
                type="primary"
                onClick={() => handleToggleEdit(false)}
            >
                <UserOutlined />
            </Button>
        </Tooltip>,
        <Button
            type="primary"
            htmlType="submit"
            style={{ width: "125px" }}
            loading={loading}
        >
            Submit
        </Button>,
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
                                disabled
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

export default EditStudentForm