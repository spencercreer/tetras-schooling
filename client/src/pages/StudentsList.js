import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STUDENT_CARDS } from '../utils/queries'

import StudentCard from '../components/StudentCard';
import StudentModal from '../components/StudentModal';

const StudentsList = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(1)

    const { loading, data } = useQuery(GET_STUDENT_CARDS)
    if (loading)
        return (
            [...Array(12).keys()].map((i) => (
                <StudentCard
                    key={i}
                    loading={true}
                />
            ))
        )

    const students = data.getStudents || []

    const handleToggleModal = () => {
      setModalVisible(!modalVisible);
    };

    return (
        <div style={{ marginLeft: 10, marginRight: 10 }}>
        {
            students?.map(({ id, first_name, last_name, status }) => (
                <StudentCard
                    key={id}
                    studentId={id}
                    firstName={first_name}
                    lastName={last_name}
                    status={status}
                    loading={false}
                    handleToggleModal={handleToggleModal}
                    setSelectedStudentId={setSelectedStudentId}
                />
            ))
        }
        <StudentModal
            visible={modalVisible}
            handleCancel={handleToggleModal}
            studentId={selectedStudentId}
        />
        </div>
    )
}

export default StudentsList