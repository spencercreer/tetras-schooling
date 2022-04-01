import { useState } from 'react'
import { Form, Input, Select, DatePicker, Alert, Button } from 'antd'
import { useMutation } from "@apollo/client"
import { ADD_STUDENT } from '../utils/mutations'

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

const StudentForm = () => {
  const [form] = Form.useForm()
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState()
  const [addStudent] = useMutation(ADD_STUDENT)

  const onFinish = async (values) => {
    try {
      const { data } = await addStudent({
        variables: { studentData: { ...values.student } }
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
    <div style={{ marginTop: 30, marginRight: 40 }}>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
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
    </div>
  )
}

export default StudentForm