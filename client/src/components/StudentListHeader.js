// React
import { useState } from 'react'
// Antd
import { Row, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import AddStudentModal from '../components/AddStudentModal';

const StudentListHeader = ({ handleUpdateStatuses }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleToggleAddModal = () => {
        setModalVisible(!modalVisible)
    }


    return (
        <>
            <Row>
                <Button
                    type="primary"
                    style={{ marginRight: 5 }}
                    onClick={handleUpdateStatuses}
                >
                    Update Student Statuses
                </Button>
                <Button
                    type="primary"
                    style={{ marginRight: 5 }}
                    onClick={handleToggleAddModal}
                >
                    <PlusOutlined />
                </Button>
                <Input placeholder="Search Students" />
            </Row>
            <AddStudentModal
            visible={modalVisible}
            handleCloseModal={handleToggleAddModal}
            />
        </>
    )
}

export default StudentListHeader