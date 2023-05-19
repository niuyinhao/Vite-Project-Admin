import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Menu from './components/Menu/index'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Tabs from './components/Tabs'
import './index.less'
const LayoutIndex = (props: any) => {
    const { Sider, Content } = Layout;
    // console.log(props, '1111');

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={props.isCollapse} width={200} theme='dark'
                style={{
                    height: '100vh',
                }}
            >
                <Menu></Menu>
            </Sider>
            <Layout>
                <Header />
                <Tabs />
                <Content style={{
                    margin: '24px 16px',
                    // minHeight: 280,
                }}>
                    <Outlet></Outlet>
                </Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    )
}

// const mapStateToProps = (state: any) => state.menu;
// const mapDispatchToProps = { setAuthButtons, updateCollapse };
// export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
