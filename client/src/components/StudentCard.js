import { useState } from 'react'

import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;

const StudentCard = ({ student, loading, handleToggleModal, setSelectedStudentId }) => {
    let { id, first_name, last_name, class_code, grad_date, status } = student
    const [active, setActive] = useState(status === "Active")

    const handleOnClick = () => {
        setSelectedStudentId(id)
        handleToggleModal()
    }
    
    const getAvatar = () => {
        const github = false
        if (github) {
            return <Avatar src="https://github.com/spencercreer.png" />
        } else if (first_name && last_name) {
            return <Avatar style={{ backgroundColor: '#00a2ae' }}>{first_name[0] + last_name[0]}</Avatar>
        } else {
            return <Avatar>{"Icon"}</Avatar>
        }
    }

    const getDescription = () => {
        let graduationDate = new Date(parseInt(grad_date))
        const graduated = graduationDate < Date.now()
        graduationDate = graduationDate.toLocaleString().split(",")[0]
        return <div>
            <div>{class_code}</div>
            <div>Graduation Date: <span style={{ color: graduated && 'red'}}>{graduationDate}</span></div>
        </div>
    }

    return (
        <Card
            style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
            actions={[
                <EllipsisOutlined
                    key="ellipsis"
                    onClick={handleOnClick}
                />,
                <EditOutlined key="edit" />,
                <Switch 
                    checked={active}
                    onChange={() => setActive(!active)}
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