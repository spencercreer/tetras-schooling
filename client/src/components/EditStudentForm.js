import { useState, useEffect } from 'react'

import { Row, Avatar, Form, Input, Select, DatePicker, Alert } from 'antd'
import moment from 'moment';

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
};

const EditStudentForm = ({ student, form, onFinish }) => {
    const { first_name, last_name, email, class_code, graduation, time_zone, slack } = student
    useEffect(() => {
        form.resetFields()
    }, [student])
    const [editName, setEditName] = useState(false)
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState()

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
                        // defaultValue={`${first_name}  ${last_name}`}
                    />
                    :
                    <h2 onClick={() => setEditName(true)}>{`${first_name}  ${last_name}`}</h2>
                }
            </Row>
            <Form
                {...layout}
                form={form}
                name="edit-student"
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={{
                    student: {
                        class_code: class_code,
                        email: email,
                        time_zone: time_zone,
                        grad_date: moment(graduation.gradDate, "MM/DD/YYYY")
                    }
                }}
            >
                <Item name={['student','class_code']} label="Class Code"
                    rules={[{ required: true }]}
                >
                        <Input />
                </Item>
                <Item name={['student', 'email']} label="Email" rules={[{ required: true }, { type: 'email' }]} >
                        <Input />
                </Item>
                <Item name={['student', 'time_zone']} label="Time Zone">
                        <Select
                        >
                            <Option value="PT">Pacific Time</Option>
                            <Option value="MST">Arizona Time</Option>
                            <Option value="MT">Mountain Time</Option>
                            <Option value="CT">Central Time</Option>
                            <Option value="ET">Eastern Time</Option>
                        </Select>
                </Item>
                <Item name={['student', 'grad_date']} label="Graduation Date">
                    <DatePicker
                        style={{width: "100%"}}
                        format={"MM/DD/YYYY"}
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