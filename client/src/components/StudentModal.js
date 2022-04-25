// React
import { useState } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries'
import { UPDATE_STUDENT } from '../utils/mutations'
// Antd
import { Modal, Form, Button, message, Tooltip } from 'antd'
import { UserOutlined, EditOutlined, SlackOutlined, CopyOutlined, ClockCircleOutlined } from '@ant-design/icons'
// Components
import StudentInfo from './StudentInfo'
import EditStudentForm from './EditStudentForm'
// Utils
import { convertDate } from '../utils/conversions'
import { getSlackMessage, getRandomEmoji } from '../utils/messages'

const StudentModal = ({ visible, edit, studentId, handleCloseModal, handleToggleEdit }) => {
    const [form] = Form.useForm()
    const [updateMessage, setUpdateMessage] = useState(null)
    const [updateStudent] = useMutation(UPDATE_STUDENT)
    const { loading, data } = useQuery(GET_STUDENT_MODAL, { variables: { id: studentId } })
    if (loading)
        return <div>Loading...</div>

    const { first_name, last_name, email, class_code, grad_date, time_zone, slack } = data?.getStudent
    const gradDate = convertDate(grad_date, 'MMMM Do YYYY')
    let student = { first_name, last_name, email, class_code, gradDate, time_zone, slack }

    const handleCloseClick = () => {
        setUpdateMessage(null)
        handleCloseModal()
    }

    const handleSlackClick = () => {
        navigator.clipboard.writeText(getSlackMessage(class_code))
        message.success('Slack message copied! ' + getRandomEmoji())
    };

    const handleSubmitEdit = async (values) => {
        try {
            const { data } = await updateStudent({
                variables: { 
                    id: studentId,
                    studentData: { ...values.student }
                }
            })

            if (data.updateStudent.id) {
                student = { ...student, ...data.updateStudent}
                message.success(`The student's info was updated successfully. ` + getRandomEmoji(), 1.5)
            } else {
                setUpdateMessage({ text: 'The student was not updated.', error: true })
            }
        }
        catch (err) {
            setUpdateMessage({ text: 'The student was not updated.', error: true })
            console.error(err)
        }
    };

    const footerButtons = edit ?
        [
            <Button key='back' onClick={handleCloseClick}>
                Exit
            </Button>,
            <Tooltip key='info' title={'Student Info'}>
                <Button
                    type='primary'
                    onClick={() => handleToggleEdit(false)}
                >
                    <UserOutlined />
                </Button>
            </Tooltip>,
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
        :
        [
            <Button
                key='back'
                onClick={handleCloseClick}
            >
                Exit
            </Button>,
            <Tooltip key='slack-message' title={'Slack Message'}>
                <Button
                    type='primary'
                    onClick={handleSlackClick}
                >
                    <SlackOutlined />
                </Button>
            </Tooltip>,
            <Tooltip key='edit' title={'Edit'}>
                <Button
                    type='primary'
                    onClick={() => handleToggleEdit(true)}
                >
                    <EditOutlined />
                </Button>
            </Tooltip>,
        ]

    return (
        <>
            <Modal
                title={edit ? 'Edit Student Info' : 'Student Info'}
                visible={visible}
                onCancel={handleCloseClick}
                footer={footerButtons}
            >
                {edit ?
                    <EditStudentForm
                        student={student}
                        form={form}
                        updateMessage={updateMessage}
                        onFinish={handleSubmitEdit}
                    />
                    :
                    <StudentInfo
                        student={student}
                    />
                }
            </Modal>
        </>
    )
}

export default StudentModal