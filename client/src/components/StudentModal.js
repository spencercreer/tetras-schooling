import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';

import { Modal, Button, Avatar } from 'antd'
import { SlackOutlined } from '@ant-design/icons';


const StudentModal = ({ visible, handleCancel, studentId }) => {
    console.log(studentId)

    const { loading, data } = useQuery(GET_STUDENT_MODAL, { variables: { id: studentId } })
    if (loading)
        return <div>Loading...</div>

    const { first_name, last_name, email, class_code, grad_date, time_zone, slack } = data?.getStudent

    const handleSlackClick = () => {
       navigator.clipboard.writeText(`Please fill out the evaluation form at the link below:
https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform

Your class code is: ${class_code}`)
    };

    return (
        <>
            <Modal
                title="Student Info"
                visible={visible}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading}>
                        Submit
                    </Button>,
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleSlackClick}
                    >
                        <SlackOutlined />
                    </Button>,
                ]}
            >
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