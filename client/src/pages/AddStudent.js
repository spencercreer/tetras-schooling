import Nav from '../components/Nav';
import NavSider from '../components/NavSider';
import Students from '../components/Students';
import StudentForm from '../components/StudentForm';

import { Layout } from 'antd'

const { Footer, Content } = Layout

const AddStudent = () => {
  return (
    <StudentForm />
  )
}

export default AddStudent