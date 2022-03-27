import { Modal, Button } from 'antd'

const StudentModal = ({ visible, handleCancel, student }) => {
    const { studentId, firstName, lastName } = student

    const handleOk = () => {
        console.log('ok')
        //   setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="Student Info" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <h2>{`${firstName}  ${lastName}`}</h2>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer">jimmyjohn@fakemail.com</a>
                <p>Class Code</p>
                <p>Grad Date</p>
            </Modal>
        </>
    )
}

export default StudentModal