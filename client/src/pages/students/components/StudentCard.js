// React
import { useState } from 'react'
// Antd
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { convertDate } from '../../../utils/conversions';
import '../style.css';

const { Meta } = Card;

const StudentCard = ({ student, loading, handleToggleStatus, handleToggleModal, handleToggleEdit, setSelectedStudentId }) => {
    let { id, first_name, last_name, class_code, grad_date, status, github } = student
    const [active, setActive] = useState(status === 'Active')

    const handleOnClick = (edit) => {
        setSelectedStudentId(id)
        handleToggleModal()
        handleToggleEdit(edit)
    }

    const handleStatusChange = () => {
        handleToggleStatus(id, active ? 'Inactive' : 'Active')
        setActive(!active)
    }
    
    const getAvatar = () => {
        if (github) {
            return <Avatar src={`https://github.com/${github}.png`} />
        } else if (first_name && last_name) {
            return <Avatar style={{ backgroundColor: '#00a2ae' }}>{first_name[0].toUpperCase() + last_name[0].toUpperCase()}</Avatar>
        } else {
            return <Avatar>{'Icon'}</Avatar>
        }
    }

    const getDescription = () => {
        const gradDate = convertDate(grad_date, 'MM/DD/YYYY')
        return <div>
            <div>{class_code}</div>
            <div>Graduation Date: <span style={{ color: gradDate.past && 'red'}}>{gradDate.formatted}</span></div>
        </div>
    }

    return (
        <Card
            className='student-card'
            actions={[
                <EllipsisOutlined
                    key='ellipsis'
                    onClick={() => handleOnClick(false)}
                />,
                <EditOutlined
                    key='edit'
                    onClick={() => handleOnClick(true)}
                />,
                <Switch 
                    checked={active}
                    onChange={handleStatusChange}
                />,
            ]}
        >
            <Skeleton loading={loading} avatar active>
                <Meta
                    avatar={getAvatar()}
                    title={<h1>{first_name} {last_name}</h1>}
                    description={getDescription()}
                />
            </Skeleton>
        </Card>
    )
}

export default StudentCard