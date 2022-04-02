import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';

import StudentInfo from './StudentInfo';
import EditStudentForm from './EditStudentForm';

const StudentModal = ({ visible, edit, studentId, handleCancel, handleToggleEdit }) => {

    return (
        edit ?
            <EditStudentForm
                visible={visible}
                edit={edit}
                studentId={studentId}
                handleCancel={handleCancel}
                handleToggleEdit={handleToggleEdit}
            />
            :
            <StudentInfo
                visible={visible}
                edit={edit}
                studentId={studentId}
                handleCancel={handleCancel}
                handleToggleEdit={handleToggleEdit}
            />
    )
}

export default StudentModal