import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STUDENT_CARDS } from '../utils/queries'

import StudentCard from '../components/StudentCard';
import LoadingStudentCard from '../components/LoadingStudentCard';
import StudentModal from '../components/StudentModal';

const StudentsList = ({ statuses }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [editModal, setEditModal] = useState(false)
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

    const handleToggleEdit = (edit) => {
        setEditModal(edit)
    }

    return (
        <div style={{ marginLeft: 10, marginRight: 10 }}>
        {
            students?.map((student) => (
                statuses.includes(student.status) &&
                <StudentCard
                    key={student.id}
                    student={student}
                    loading={false}
                    handleToggleModal={handleToggleModal}
                    handleToggleEdit={handleToggleEdit}
                    setSelectedStudentId={setSelectedStudentId}
                />
            ))
        }
        <StudentModal
            visible={modalVisible}
            edit={editModal}
            handleCloseModal={handleToggleModal}
            handleToggleEdit={handleToggleEdit}
            studentId={selectedStudentId}
        />
        </div>
    )
}

export default StudentsList