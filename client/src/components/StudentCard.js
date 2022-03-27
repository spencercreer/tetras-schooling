import { useState } from 'react'

import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;

const StudentCard = ({ firstName, lastName, status }) => {
    const [active, setActive] = useState(status === "Active")

    return (
        <Card
            style={{ width: 300, marginTop: 16, marginLeft: 10, marginRight: 10, display: "inline-block" }}
            actions={[
                <EllipsisOutlined key="ellipsis" />,
                <EditOutlined key="edit" />,
                <Switch 
                    checked={active}
                    onChange={() => setActive(!active)}
                />,
            ]}
        >
            <Skeleton loading={!firstName} avatar active>
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={`${firstName} ${lastName}`}
                    description="This is the description"
                />
            </Skeleton>
        </Card>
    )
}

export default StudentCard