import { useState } from 'react'
import convertGradDate from '../utils/conversions';

import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;

const StudentCard = ({ student, loading, handleToggleStatus, handleToggleModal, handleToggleEdit, setSelectedStudentId }) => {
    let { id, first_name, last_name, class_code, grad_date, status } = student
    const [active, setActive] = useState(status === "Active")

    const handleOnClick = (edit) => {
        setSelectedStudentId(id)
        handleToggleModal()
        handleToggleEdit(edit)
    }

    const handleStatusChange = () => {
        handleToggleStatus(id, active ? "Inactive" : "Active")
        setActive(!active)
    }
    
    const getAvatar = () => {
        const github = false
        if (github) {
            return <Avatar src="https://github.com/spencercreer.png" />
        } else if (first_name && last_name) {
            return <Avatar style={{ backgroundColor: '#00a2ae' }}>{first_name[0].toUpperCase() + last_name[0].toUpperCase()}</Avatar>
        } else {
            return <Avatar>{"Icon"}</Avatar>
        }
    }

    const getDescription = () => {
        const { gradDate, graduated } = convertGradDate(grad_date)
        return <div>
            <div>{class_code}</div>
            <div>Graduation Date: <span style={{ color: graduated && 'red'}}>{gradDate}</span></div>
        </div>
    }

    return (
        <Card
            style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
            actions={[
                <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => handleOnClick(false)}
                />,
                <EditOutlined
                    key="edit"
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
                    title={`${first_name} ${last_name}`}
                    description={getDescription()}
                />
            </Skeleton>
        </Card>
    )
}

export default StudentCard