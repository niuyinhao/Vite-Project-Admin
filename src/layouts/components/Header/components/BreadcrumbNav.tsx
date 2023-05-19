import { HOME_URL } from '@/config/config';
import { Breadcrumb, Button } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateCollapse } from '@/redux/modules/menu/action'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
function BreadcrumbNav(props: any) {
    console.log(props);

    const { pathname } = useLocation();
    const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];
    const { isCollapse } = props.menu

    // console.log(props);

    return (
        <div className='breadcrumbContent'>
            <Button
                type="text"
                icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => props.updateCollapse(!isCollapse)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Breadcrumb>
                <Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
                {
                    breadcrumbList.map((item: any) => {
                        return <Breadcrumb.Item key={item}>{item !== '首页' ? item : null}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        </div>
    )
}
const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { updateCollapse }
export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbNav)