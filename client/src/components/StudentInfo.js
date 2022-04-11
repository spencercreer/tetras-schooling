// React
import { useState } from 'react'
// Antd
import { Row, Button, Avatar, Tooltip, Form, Input } from 'antd'
import { CopyOutlined, MailOutlined, StopTwoTone } from '@ant-design/icons';
// Utils
import { layout } from '../utils/form'
import { getStudentsTime } from '../utils/conversions';

const { Item } = Form

const StudentInfo = ({ student }) => {
    const { first_name, last_name, email, class_code, gradDate, time_zone, slack } = student
    const [form] = Form.useForm()
    const [studentsTime, setStudentsTime] = useState(getStudentsTime(time_zone))


    setInterval(() => {
        setStudentsTime(getStudentsTime(time_zone))
    }, 30000)

    return (
        <>
            <Row>
                <Avatar style={{ backgroundColor: '#00a2ae', marginRight: '8px' }}>{first_name[0] + last_name[0]}</Avatar>
                <h2>{`${first_name}  ${last_name}`}</h2>
            </Row>
            <Form
                {...layout}
                form={form}
                name="student-info"
            >
                <Item name={['student', 'class_code']} label="Class Code">
                    <Input.Group compact>
                        <Input
                            style={{ width: '90%' }}
                            defaultValue={class_code}
                            disabled
                        />
                        <Tooltip
                            style={{ width: '10%' }}
                            title="Copy Class Code"
                        >
                            <Button icon={<CopyOutlined />} />
                        </Tooltip>
                    </Input.Group>
                </Item>
                <Item name={['student', 'email']} label="Email">
                    <Input.Group compact>
                        <Input
                            style={{ width: '90%' }}
                            defaultValue={email}
                            disabled
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
                            value={studentsTime}
                            disabled
                        />
                        <Input
                            style={{ width: '30%' }}
                            defaultValue={time_zone}
                            disabled
                        />
                    </Input.Group>
                </Item>
                <Item name={['student', 'grad_date']} label="Graduation Date">
                    <Input
                        defaultValue={gradDate.formatted}
                        suffix={gradDate.past && <StopTwoTone twoToneColor={"red"} />}
                        disabled
                    />
                </Item>
            </Form>
        </>
    )
}

export default StudentInfo