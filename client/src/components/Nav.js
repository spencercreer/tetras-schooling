import { Layout, Menu } from "antd"

const { Header } = Layout
const { Item } = Menu

const Nav = () => {
  return (
    <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
            <Item key="1">Students</Item>
            <Item key="2">Add Student</Item>
            <Item key="3">Email Template</Item>
        </Menu>
    </Header>
  )
}

export default Nav