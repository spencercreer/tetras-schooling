import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header } = Layout
const { Item } = Menu

const Nav = () => {
  return (
    <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' >
            <Item key='1'><Link to={'/'}>Dashboard</Link></Item>
            <Item key='2'><Link to={'/students/active'} >Students</Link></Item>
            <Item key='3'><Link to={'/sessions'}>Sessions</Link></Item>
        </Menu>
    </Header>
  )
}

export default Nav