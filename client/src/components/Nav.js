import { Layout, Menu } from "antd"

const { Header } = Layout

const Nav = () => {
  return (
    <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1">Students</Menu.Item>
            <Menu.Item key="2">Add Student</Menu.Item>
            <Menu.Item key="3">Email Template</Menu.Item>
        </Menu>
    </Header>
  )
}

export default Nav