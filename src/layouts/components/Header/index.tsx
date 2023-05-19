import React from 'react'
import { Layout } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav';
import './index.less'
function Header() {
    const { Header } = Layout;
    return (
        <Header style={{ padding: 0 }}>
            <BreadcrumbNav />
        </Header>
    )
}

export default Header