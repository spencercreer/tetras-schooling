import { useState } from 'react'

import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;

const StudentCard = ({ loading, studentId, firstName, lastName, status, handleToggleModal, setSelectedStudentId }) => {
    const [active, setActive] = useState(status === "Active")

    const handleOnClick = () => {
        setSelectedStudentId(studentId)
        handleToggleModal()
    }
    
    const getAvatar = (firstName, lastName, github) => {
        if (github) {
            return <Avatar src="https://github.com/spencercreer.png" />
        } else if (firstName && lastName) {
            return <Avatar style={{ backgroundColor: '#00a2ae' }}>{firstName[0] + lastName[0]}</Avatar>
        } else {
            return <Avatar>{"Icon"}</Avatar>
        }
    }

    return (
        <Card
            style={{ width: 300, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
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
                    avatar={getAvatar(firstName, lastName, null)}
                    title={`${firstName} ${lastName}`}
                    description="This is the description"
                />
            </Skeleton>
        </Card>
    )
}

export default StudentCard