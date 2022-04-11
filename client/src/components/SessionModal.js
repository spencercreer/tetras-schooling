import { Modal, Form, Button, message, Tooltip } from 'antd'

const SessionModal = ({ visible, handleToggleModal }) => {
    return (
        <>
            <Modal
                title={'Session Info'}
                visible={visible}
                // onCancel={handleCloseClick}
                // footer={footerButtons}
            >
                <div>
                    Hello Session Modal
                </div>
            </Modal>
        </>
    )
}

export default SessionModal