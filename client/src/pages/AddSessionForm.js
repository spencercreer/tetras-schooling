// React
import { useState } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_NAMES } from '../utils/queries';
import { ADD_SESSION } from '../utils/mutations';
// Antd
import { Form, Select, DatePicker, Button } from 'antd'
// Utils
import { validateMessages, layout } from '../utils/form'

const { Item } = Form
const { Option } = Select

const AddSessionForm = () => {
  const [form] = Form.useForm()
  const [message, setMessage] = useState()
  const [addSession] = useMutation(ADD_SESSION)

  const { loading, data } = useQuery(GET_STUDENT_NAMES)
  if (loading)
        return <div>Loading...</div>

  const students = data.getStudents || []

  const onFinish = async (values) => {
    try {
      console.log(values)
      const { data } = await addSession({
        variables: { sessionData: { ...values, tutor_id: 1 } }
      })
      if (data.addSession.id) {
        form.resetFields()
      } else {
        setMessage({ text: 'The session was not added.', error: true })
      }
    }
    catch (err) {
      setMessage({ text: 'The session was not added.', error: true })
      console.error(err)
    }
    // setLoading(false)
  }

  return (
    <Form
      style={{ marginTop: 30, marginRight: 40 }}
      {...layout}
      form={form}
      name="add-session"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Item name={'student_id'} label="Student" rules={[{ required: true }]}>
        <Select>
          {
            students?.map((student) => (
              <Option value={student.id}>{`${student.first_name} ${student.last_name}`}</Option>
            ))
          }
        </Select>
      </Item>
      <Item name={'date'} label="Date & Time" rules={[{ required: true }]}>
        <DatePicker showTime minuteStep={15} format="MM-DD-YYYY HH:mm a" />
      </Item>

      <Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
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

export default AddSessionForm