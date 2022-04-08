// React
import { useState } from 'react'
// Apollo
import { useMutation } from "@apollo/client"
import { ADD_STUDENT } from '../utils/mutations'
// Antd
import { Form, Input, Select, DatePicker, Alert, Button } from 'antd'
// Utils
import { validateMessages, layout } from '../utils/form'

const { Item } = Form
const { Option } = Select

const StudentForm = () => {
  const [form] = Form.useForm()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState()
  const [addStudent] = useMutation(ADD_STUDENT)

  const onFinish = async (values) => {
    try {
      const { data } = await addStudent({
        variables: { studentData: { ...values.student, status: "Active" } }
      })

      if (data.addStudent.id) {
        form.resetFields()
      } else {
        setMessage({ text: 'The student was not added.', error: true })
      }
    }
    catch (err) {
      setMessage({ text: 'The student was not added.', error: true })
      console.error(err)
    }
    setLoading(false)
  };

  return (
      <Form
        style={{ marginTop: 30, marginRight: 40 }}
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
        <Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          {
            message && <Alert message={message.text} type={message.error ? "error" : "success"} />
          }
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Item>
      </Form>
  )
}

export default StudentForm