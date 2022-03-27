import { Form, Input, Select, DatePicker, Switch, Button } from 'antd'

const { Item } = Form
const { Option } = Select

const layout = {
  labelCol: { span: 8 },
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
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div style={{ marginTop: 30, marginRight: 40 }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Item name={['student', 'firstName']} label="First Name" rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item name={['student', 'lastName']} label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item name={['student', 'email']} label="Email" rules={[{ required: true }, { type: 'email' }]}>
          <Input />
        </Item>
        <Item name={['student', 'classCode']} label="Class Code" rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item name={['student', 'timeZone']} label="Time Zone">
          <Select>
            <Option value="PT">Pacific Time</Option>
            <Option value="MST">Arizona Time</Option>
            <Option value="MT">Mountain Time</Option>
            <Option value="CT">Central Time</Option>
            <Option value="ET">Eastern Time</Option>
          </Select>
        </Item>
        <Item name={['student', 'gradDate']} label="Graduation Date">
          <DatePicker />
        </Item>
        <Item name={['student', 'status']} label="Active" valuePropName="checked" >
          <Switch defaultChecked />
        </Item>
        <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  )
}

export default StudentForm