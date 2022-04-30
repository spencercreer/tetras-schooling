import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu, Item } = Menu

const NavSider = ({ page }) => {

  const getSubMenu = () => {
    switch (page) {
      case 'dashboard':
        return (
          <SubMenu key='sub1' title='Dashboard'>
          <Item key='1'><Link to={'/students/active'} >Active</Link></Item>
          <Item key='2'><Link to={'/students'} >All Students</Link></Item>
        </SubMenu>
        )
        case 'students':
          return (
            <SubMenu key='sub1' title='Students'>
            <Item key='1'><Link to={'/students/active'} >Active</Link></Item>
            <Item key='2'><Link to={'/students'} >All Students</Link></Item>
          </SubMenu>
          )
          case 'sessions':
            return (
              <SubMenu key='sub1' title='Sessions'>
              <Item key='1'><Link to={'/students/active'} >Future</Link></Item>
              <Item key='2'><Link to={'/students/active'} >Past</Link></Item>
              <Item key='3'><Link to={'/students'} >All Sessions</Link></Item>
            </SubMenu>
            )
      default:
        break;
    }
  }

  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='md'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        {getSubMenu()}
      </Menu>
    </Sider>
  )
}

export default NavSider