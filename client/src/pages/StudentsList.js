import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STUDENT_CARDS } from '../utils/queries'

import StudentCard from '../components/StudentCard';
import LoadingStudentCard from '../components/LoadingStudentCard';
import StudentModal from '../components/StudentModal';

const StudentsList = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(1)

    const { loading, data } = useQuery(GET_STUDENT_CARDS)
    if (loading)
        return (
            [...Array(12).keys()].map((i) => (
                <LoadingStudentCard
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
            students?.map((student) => (
                <StudentCard
                    key={student.id}
                    student={student}
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