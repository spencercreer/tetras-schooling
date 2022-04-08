// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_NAMES } from '../utils/queries';
// Antd
import { Form, Input, Select, DatePicker, TimePicker, Alert, Button } from 'antd'
// Utils
import { validateMessages, layout } from '../utils/form'

const { Item } = Form
const { Option } = Select

const AddSessionForm = () => {
  const [form] = Form.useForm()
  const message = ''

  const { loading, data } = useQuery(GET_STUDENT_NAMES)
  if (loading)
        return <div>Loading...</div>

  const students = data.getStudents || []
  console.log(students)

  const onFinish = () => {
    console.log('finish')
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
      <Item name={'student'} label="Student" rules={[{ required: true }]}>
        <Select>
          {
            students?.map((student) => (
              <Option value={student.id}>{`${student.first_name} ${student.last_name}`}</Option>
            ))
          }
        </Select>
      </Item>
      <Item name={'session_date'} label="Date & Time" rules={[{ required: true }]}>
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