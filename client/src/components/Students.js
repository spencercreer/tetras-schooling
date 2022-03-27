import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_STUDENTS } from '../utils/queries'

import StudentCard from './StudentCard';
import StudentModal from './StudentModal';

const Students = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const { loading, data } = useQuery(GET_STUDENTS)
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
                    firstName={first_name}
                    lastName={last_name}
                    status={status}
                    loading={false}
                    handleToggleModal={handleToggleModal}
                />
            ))
        }
        <StudentModal
            visible={modalVisible}
            handleCancel={handleToggleModal}
        />
        </div>
    )
}

export default Students