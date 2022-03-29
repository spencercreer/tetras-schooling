import { Link } from 'react-router-dom'
import { Layout, Menu } from "antd"

const { Header } = Layout
const { Item } = Menu

const Nav = () => {
  return (
    <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
            <Item key="1"><Link to={'/students'} >Students</Link></Item>
            <Item key="2"><Link to={'/addStudent'} >Add Student</Link></Item>
            <Item key="3">Email Template</Item>
        </Menu>
    </Header>
  )
}

export default Nav