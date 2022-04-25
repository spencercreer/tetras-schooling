// React
import { useState } from 'react'
// Antd
import { Row, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// Components
import AddSessionModal from './AddSessionModal'

const SessionListHeader = () => {
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
                onClick={handleToggleAddModal}
            >
                <PlusOutlined />
            </Button>
        </Row>
        <AddSessionModal
        visible={modalVisible}
        handleCloseModal={handleToggleAddModal}
        />
    </>
    )
}

export default SessionListHeader