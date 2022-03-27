import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';

import { Modal, Avatar } from 'antd'

const StudentModal = ({ visible, handleCancel, studentId }) => {
    console.log(studentId)

    const { loading, data } = useQuery(GET_STUDENT_MODAL, { variables: { id: studentId } })
    if (loading) 
        return <div>Loading...</div>

    const { first_name, last_name, email, class_code, grad_date, time_zone, slack } = data?.getStudent

    const handleOk = () => {
        console.log('ok')
        //   setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="Student Info" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <Avatar style={{ backgroundColor: '#00a2ae' }}>{first_name[0] + last_name[0]}</Avatar>
                <h2>{`${first_name}  ${last_name}`}</h2>
                <a href={email} target="_blank" rel="noopener noreferrer">{email}</a>
                <p>Class Code: {class_code}</p>
                <p>Grad Date: {grad_date}</p>
            </Modal>
        </>
    )
}

export default StudentModal