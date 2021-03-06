// React
import { useState } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_NAMES } from '../../../utils/queries';
import { ADD_SESSION } from '../../../utils/mutations';
// Antd
import { Modal, Form, Select, DatePicker, Button, Alert, message } from 'antd'
// Utils
import { validateMessages, layout } from '../../../utils/form'
import { dateIsPast } from '../../../utils/conversions'
import { getRandomEmoji } from '../../../utils/messages'

const { Item } = Form
const { Option } = Select

const AddSessionModal = ({ visible, handleCloseModal }) => {
    const [form] = Form.useForm()
    const [alert, setAlert] = useState()
    const [addSession] = useMutation(ADD_SESSION)

    const { loading, data } = useQuery(
        GET_STUDENT_NAMES,
        {
            variables: {
                parameter: 'status',
                val: 'Active'
            }
        })
    if (loading)
        return <div>Loading...</div>

    const students = data.getStudentsByParam || []

    const onFinish = async (values) => {
        try {
            const { data } = await addSession({
                variables: { sessionData: { ...values, tutor_id: 1 } }
            })
            if (data.addSession.id) {
                form.resetFields()
                message.success('Session added successfully! ' + getRandomEmoji())
                setAlert({ text: 'The session was added.', error: false })

            } else {
                setAlert({ text: 'The session was not added.', error: true })
            }
        }
        catch (err) {
            setAlert({ text: 'The session was not added.', error: true })
            console.error(err)
        }
    }

    const footerButtons =
        [
            <Button key='back' onClick={handleCloseModal}>
                Exit
            </Button>,
            <Button
                type='primary'
                htmlType='submit'
                style={{ width: '125px' }}
                loading={loading}
                onClick={() => form.submit()}
            >
                Submit
            </Button>,
        ]

    return (
        <>
            <Modal
                title={'Add Student'}
                visible={visible}
                onCancel={handleCloseModal}
                footer={footerButtons}
            >
                <Form
                    style={{ marginTop: 30, marginRight: 40 }}
                    {...layout}
                    form={form}
                    name='add-session'
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Item name={'student_id'} label='Student' rules={[{ required: true }]}>
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                students?.map(({ id, first_name, last_name, grad_date }) => (
                                    <Option value={id} style={{  color: dateIsPast(grad_date) && 'red'}}>{`${first_name} ${last_name}`}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item name={'date'} label='Date & Time' rules={[{ required: true }]}>
                        <DatePicker showTime minuteStep={15} format='MM-DD-YYYY HH:mm a' />
                    </Item>
                    {
                        alert?.error && <Alert message={alert.text} type='error' />
                    }
                </Form>
            </Modal>
        </>
    )
}

export default AddSessionModal