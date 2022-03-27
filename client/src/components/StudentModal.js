import { Modal, Button } from 'antd'

const StudentModal = ({ visible, handleCancel }) => {

    const handleOk = () => {
        console.log('ok')
        //   setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="Student Info" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <h2>FirstName LastName</h2>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer">jimmyjohn@fakemail.com</a>
                <p>Class Code</p>
                <p>Grad Date</p>
            </Modal>
        </>
    )
}

export default StudentModal