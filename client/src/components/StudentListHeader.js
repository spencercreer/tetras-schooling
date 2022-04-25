// React
import { useState } from 'react'
// Antd
import { Row, Button, Tooltip, Input, message } from 'antd'
import { TeamOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons'
// Components
import AddStudentModal from '../components/AddStudentModal';
// Utils
import { getRandomEmoji } from '../utils/messages'

const StudentListHeader = ({ handleUpdateStatuses, students, statuses }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const studentPage = statuses.length === 1 ? 'Active' : 'All'

    const handleToggleAddModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleEmailClick = () => {
        let emails = []
        students.forEach(student => {
            if (statuses.includes(student.status))
                emails.push(student.email)
        })
        navigator.clipboard.writeText(emails.join(', '))
            .then(() => message.success(`${studentPage} students' emails copied! ` + getRandomEmoji(), .7))
    }

    return (
        <>
            <Row>
                <Tooltip key="add-student" title={'Add Student'}>
                    <Button
                        type="primary"
                        style={{ marginRight: 5 }}
                        onClick={handleToggleAddModal}
                    >
                        <PlusOutlined />
                    </Button>
                </Tooltip>
                <Tooltip key="update-statuses" title={'Update Student Statuses'}>
                    <Button
                        type="primary"
                        style={{ marginRight: 5 }}
                        onClick={handleUpdateStatuses}
                    >
                        <TeamOutlined />
                    </Button>
                </Tooltip>
                <Tooltip key="email-students" title={`Email ${studentPage} Students`}>
                    <Button
                        type="primary"
                        style={{ marginRight: 5 }}
                        onClick={handleEmailClick}
                    >
                        <MailOutlined />
                    </Button>
                </Tooltip>
                <Input placeholder={`Search ${studentPage} Students`} style={{ width: '200px'}} />
            </Row>
            <AddStudentModal
                visible={modalVisible}
                handleCloseModal={handleToggleAddModal}
            />
        </>
    )
}

export default StudentListHeader