import { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_CARDS } from '../utils/queries'
import { UPDATE_STATUSES } from '../utils/mutations'

import StudentCard from '../components/StudentCard';
import LoadingStudentCard from '../components/LoadingStudentCard';
import StudentModal from '../components/StudentModal';

import { Row, Button } from 'antd'

const StudentsList = ({ statuses }) => {
    // TODO: Search input
    const [modalVisible, setModalVisible] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(1)
    //change state variable names
    const [statusUpdates, setStatusUpdates] = useState([])

    const [updateStatuses] = useMutation(UPDATE_STATUSES)
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

    const handleUpdateStatuses = async () => {
        try {
            const { data } = await updateStatuses({
                variables: {
                    studentsData: statusUpdates
                }
            })
            console.log(data)
            setStatusUpdates([])
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleToggleStatus = (id, status) => {
        const found = statusUpdates.find((statusUpdate) => statusUpdate.id === id)
        if (found) {
            const copyArray = statusUpdates.map((statusUpdate) => {
                if(statusUpdate.id === id){
                    return { id, status }
                }
                return statusUpdate            
            })
            console.log(copyArray)
            setStatusUpdates(copyArray)
        } else {
            console.log([...statusUpdates, {id, status}])
            setStatusUpdates([...statusUpdates, {id, status}])
        }
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleToggleEdit = (edit) => {
        setEditModal(edit)
    }

    return (
        <div style={{ marginLeft: 10, marginRight: 10, paddingTop: 10 }}>
            <Row>
                <Button
                    type="primary"
                    onClick={handleUpdateStatuses}
                >
                    Update Student Statuses
                </Button>
            </Row>
            {
                students?.map((student) => (
                    statuses.includes(student.status) &&
                    <StudentCard
                        key={student.id}
                        student={student}
                        loading={false}
                        handleToggleStatus={handleToggleStatus}
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