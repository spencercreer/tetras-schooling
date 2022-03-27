import { Layout, Menu } from "antd"

const { Sider } = Layout
const { SubMenu, Item } = Menu;

const NavSider = () => {
  return (
    <Sider width={200} className="site-layout-background">
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0}}
        >
            <SubMenu key="sub1" title="subnav 1">
            <Item key="1">option1</Item>
            <Item key="2">option2</Item>
            <Item key="3">option3</Item>
            <Item key="4">option4</Item>
          </SubMenu>
          <SubMenu key="sub2" title="subnav 2">
            <Item key="5">option5</Item>
            <Item key="6">option6</Item>
            <Item key="7">option7</Item>
            <Item key="8">option8</Item>
          </SubMenu>
          <SubMenu key="sub3" title="subnav 3">
            <Item key="9">option9</Item>
            <Item key="10">option10</Item>
            <Item key="11">option11</Item>
            <Item key="12">option12</Item>
          </SubMenu>
        </Menu>
    </Sider>
  )
}

export default NavSider