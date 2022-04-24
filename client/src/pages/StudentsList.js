// React
import { useState } from 'react'
// Apollo
import { useQuery, useMutation } from '@apollo/client'
import { GET_STUDENT_CARDS } from '../utils/queries'
import { UPDATE_STATUSES } from '../utils/mutations'
// Components
import NavSider from '../components/NavSider'
import StudentCard from '../components/StudentCard'
import LoadingCard from '../components/LoadingCard'
import StudentModal from '../components/StudentModal'
import StudentListHeader from '../components/StudentListHeader'
// Antd
import { Layout } from 'antd'

const { Content } = Layout

const StudentsList = ({ statuses }) => {
    // TODO: Search input
    const [modalVisible, setModalVisible] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(1)
    const [statusUpdates, setStatusUpdates] = useState([])

    const [updateStatuses] = useMutation(UPDATE_STATUSES)
    const { loading, data } = useQuery(GET_STUDENT_CARDS)
    if (loading)
        return (
            [...Array(12).keys()].map((i) => (
                <LoadingCard
                    key={i}
                    loading={true}
                />
            ))
        )

    const students = data.getAllStudents || []

    const handleUpdateStatuses = async () => {
        try {
            const { data } = await updateStatuses({
                variables: {
                    studentsData: statusUpdates
                }
            })
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
                if (statusUpdate.id === id) {
                    return { id, status }
                }
                return statusUpdate
            })
            setStatusUpdates(copyArray)
        } else {
            setStatusUpdates([...statusUpdates, { id, status }])
        }
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleToggleEdit = (edit) => {
        setEditModal(edit)
    }

    return (
        <>
            <NavSider page={'students'} />
            <Content>
                <div style={{ marginLeft: 10, marginRight: 10, paddingTop: 10 }}>
                    <StudentListHeader
                        handleUpdateStatuses={handleUpdateStatuses}
                        students={students}
                        statuses={statuses}
                    />
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
                        studentId={selectedStudentId}
                        handleCloseModal={handleToggleModal}
                        handleToggleEdit={handleToggleEdit}
                    />
                </div>
            </Content>
        </>
    )
}

export default StudentsList