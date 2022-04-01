import { useQuery } from '@apollo/client'
import { GET_STUDENT_MODAL } from '../utils/queries';

import { Modal, Button, message, Avatar, Tooltip } from 'antd'
import { SlackOutlined, CopyOutlined, ClockCircleOutlined } from '@ant-design/icons';


const StudentModal = ({ visible, handleCancel, studentId }) => {

    const { loading, data } = useQuery(GET_STUDENT_MODAL, { variables: { id: studentId } })
    if (loading)
        return <div>Loading...</div>

    const { first_name, last_name, email, class_code, grad_date, time_zone, slack } = data?.getStudent

    const getRandomEmoji = () => {
        const emojis = [0x1F600, 0x1F604, 0x1F609, 0x1F929, 0x1F92A, 0x1F920, 0x1F973, 0x1F60E, 0x1F9D0, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355, 0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA, 0x1F431, 0x1F42A, 0x1F439, 0x1F424];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)]
        return String.fromCodePoint(emoji)
    }

    const handleSlackClick = () => {
        navigator.clipboard.writeText(`Please fill out the evaluation form at the link below:
https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform

Your class code is: ${class_code}`)
        message.success('Slack message copied! ' + getRandomEmoji())
    };

    const handleNotesClick = () => {
        navigator.clipboard.writeText(`${class_code}
${first_name} ${last_name}
B2B-No
No Show`)
        message.success('Clock-out notes copied! ' + getRandomEmoji())
    }

    return (
        <>
            <Modal
                title="Student Info"
                visible={visible}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading}>
                        Submit
                    </Button>,
                      <Tooltip title={'Form Notes'}>
                      <Button
                          type="primary"
                        //   onClick={handleNotesClick}
                      >
                          <CopyOutlined />
                      </Button>
                  </Tooltip>,
                    <Tooltip title={'Slack Message'}>
                        <Button
                            type="primary"
                            onClick={handleSlackClick}
                        >
                            <SlackOutlined />
                        </Button>
                    </Tooltip>,
                    <Tooltip title={'Clock-Out Notes'}>
                        <Button
                            type="primary"
                            onClick={handleNotesClick}
                        >
                            <ClockCircleOutlined />
                        </Button>
                    </Tooltip>,
                ]}
            >
                <Avatar style={{ backgroundColor: '#00a2ae' }}>{first_name[0] + last_name[0]}</Avatar>
                <h2>{`${first_name}  ${last_name}`}</h2>
                <a href={email} target="_blank" rel="noopener noreferrer">{email}</a>
                <p>Class Code: {class_code}</p>
                <p>Grad Date: {grad_date}</p>
            </Modal>
        </>
    )
}

export default StudentModal