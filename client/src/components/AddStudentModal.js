// React
import { useState } from 'react'
// Apollo
import { useMutation } from "@apollo/client"
import { ADD_STUDENT } from '../utils/mutations'
// Antd
import { Modal, Form, Input, Select, DatePicker, message, Alert, Button } from 'antd'
// Utils
import { validateMessages, layout } from '../utils/form'
import { getRandomEmoji } from '../utils/conversions'

const { Item } = Form
const { Option } = Select

const AddStudentModal = ({ visible, handleCloseModal }) => {
    const [form] = Form.useForm()
    const [alert, setAlert] = useState()
    const [loading, setLoading] = useState()
    const [addStudent] = useMutation(ADD_STUDENT)

    const onFinish = async (values) => {
        try {
            const { data } = await addStudent({
                variables: { studentData: { ...values.student, status: "Active" } }
            })

            if (data.addStudent.id) {
                form.resetFields()
                message.success('Student added successfully! ' + getRandomEmoji())
                setAlert({ text: 'The student was added.', error: false })

            } else {
                setAlert({ text: 'Error: The student was not added.', error: true })
            }
        }
        catch (err) {
            setAlert({ text: 'Error: The student was not added.', error: true })
            console.error(err)
        }
        setLoading(false)
    }

    const footerButtons =
        [
            <Button key="back" onClick={handleCloseModal}>
                Exit
            </Button>,
            <Button
                type="primary"
                htmlType="submit"
                style={{ width: "125px" }}
                loading={loading}
                onClick={() => form.submit()}
            >
                Submit
            </Button>,
        ]

    return (
        <>
            <Modal
                title={"Add Student"}
                visible={visible}
                onCancel={handleCloseModal}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    form={form}
                    name="add-student"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Item name={['student', 'first_name']} label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Item>
                    <Item name={['student', 'last_name']} label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Item>
                    <Item name={['student', 'email']} label="Email" rules={[{ required: true }, { type: 'email' }]}>
                        <Input />
                    </Item>
                    <Item name={['student', 'class_code']} label="Class Code" rules={[{ required: true }]}>
                        <Input />
                    </Item>
                    <Item name={['student', 'time_zone']} label="Time Zone">
                        <Select>
                            <Option value="PT">Pacific Time</Option>
                            <Option value="MST">Arizona Time</Option>
                            <Option value="MT">Mountain Time</Option>
                            <Option value="CT">Central Time</Option>
                            <Option value="ET">Eastern Time</Option>
                        </Select>
                    </Item>
                    <Item name={['student', 'grad_date']} label="Graduation Date">
                        <DatePicker />
                    </Item>
                    {
                        alert?.error && <Alert message={alert.text} type="error" />
                    }
                </Form>
            </Modal>
        </>
    )
}

export default AddStudentModal