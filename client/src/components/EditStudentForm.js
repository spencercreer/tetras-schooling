import { useState } from 'react'

import { Row, Modal, Button, message, Avatar, Tooltip, Form, Input, Select, Alert } from 'antd'
import { CopyOutlined, MailOutlined, StopTwoTone } from '@ant-design/icons';

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

const EditStudentForm = ({ student }) => {
    const [editName, setEditName] = useState(false)
    const [form] = Form.useForm()

    const { first_name, last_name, email, class_code, graduation, time_zone, slack } = student

    const onFinish = async (values) => {
        // try {
        //   const { data } = await addStudent({
        //     variables: { studentData: { ...values.student } }
        //   })

        //   if (data.addid) {
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

    return (
        <>
            <Row>
                <Avatar style={{ backgroundColor: '#00a2ae', marginRight: '8px' }}>{first_name[0] + last_name[0]}</Avatar>
                {editName ?
                    <Input
                        style={{ width: '90%' }}
                        defaultValue={`${first_name}  ${last_name}`}
                    />
                    :
                    <h2 onClick={() => setEditName(true)}>{`${first_name}  ${last_name}`}</h2>
                }
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
                            style={{ width: '60%' }}
                            defaultValue={getStudentsTime()}
                            disabled
                        />
                        <Select
                            style={{ width: '40%' }}
                            defaultValue={time_zone}
                        >
                            <Option value="PT">Pacific Time</Option>
                            <Option value="MST">Arizona Time</Option>
                            <Option value="MT">Mountain Time</Option>
                            <Option value="CT">Central Time</Option>
                            <Option value="ET">Eastern Time</Option>
                        </Select>
                    </Input.Group>
                </Item>
                <Item name={['student', 'grad_date']} label="Graduation Date">
                    <Input
                        defaultValue={graduation.gradDate}
                        suffix={graduation.graduated && <StopTwoTone twoToneColor={"red"} />}
                    />
                </Item>
                <Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    {
                        message && <Alert message={message.text} type={message.error ? "error" : "success"} />
                    }
                </Item>
            </Form>
        </>
    )
}

export default EditStudentForm