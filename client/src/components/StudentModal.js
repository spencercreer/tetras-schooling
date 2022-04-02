import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';
import convertGradDate from '../utils/conversions';

import { Row, Modal, Button, message, Avatar, Tooltip, Form, Input, Select, Alert } from 'antd'
import { UserOutlined, EditOutlined, SlackOutlined, CopyOutlined, ClockCircleOutlined, MailOutlined, StopTwoTone } from '@ant-design/icons';
import StudentInfo from './StudentInfo';
import EditStudentForm from './EditStudentForm';

const { Item } = Form
const { Option } = Select

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const StudentModal = ({ visible, edit, studentId, handleCancel, handleToggleEdit }) => {

    return (
        edit ? <EditStudentForm visible={visible} edit={edit} studentId={studentId} handleCancel={handleCancel} handleToggleEdit={handleToggleEdit}/> : <StudentInfo visible={visible} edit={edit} studentId={studentId} handleCancel={handleCancel} handleToggleEdit={handleToggleEdit} />
    )
}

export default StudentModal