import React, { useEffect, useState } from 'react'

import { Menu, Spin } from 'antd'
import { connect } from 'react-redux'
import type { MenuProps } from 'antd';
import * as Icon from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchRoute, findBreadcrumb, getOpenKeys } from '@/utils/utils'
import { setMenuList } from '@/redux/modules/menu/action'
import { setBreadcrumbList } from '@/redux/modules/breadcrumb/action'
import './index.less'
const LayoutMenu = (props: any) => {
    const { setMenuList: setMenuListAction, setBreadcrumbList } = props
    const { pathname } = useLocation()
    type MenuItem = Required<MenuProps>['items'][number];
    const [openKey, setOpenkey] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const [loading, setLoading] = useState(false);
    const [menuList, setMenuList] = useState<MenuItem[]>([]);
    useEffect(() => {
        getMenuData()
    }, [])
    useEffect(() => {
        setSelectedKeys([pathname])
        setOpenkey(getOpenKeys(pathname))
    }, [pathname])
    //获取菜单数据
    const getMenuData = () => {
        setLoading(true)
        const res = [
            {
                icon: "HomeOutlined",
                path: "/home/index",
                title: "首页"
            },
            {
                icon: "TableOutlined",
                path: "/proTable/index",
                title: "Table表格"
            },
            {
                icon: "FileTextOutlined",
                title: "表单 Form",
                path: "/form",
                children: [
                    {
                        icon: "AppstoreOutlined",
                        path: "/form/basicForm",
                        title: "基础 Form"
                    },
                    {
                        icon: "AppstoreOutlined",
                        path: "/form/validateForm",
                        title: "校验 Form"
                    },
                    {
                        icon: "AppstoreOutlined",
                        path: "/form/dynamicForm",
                        title: "动态 Form"
                    }
                ]
            }
        ]
        // console.log(res);

        const meunList = deepLoopFloat(res);
        const findBreadcrumbs = findBreadcrumb(res);
        console.log(findBreadcrumbs);

        setBreadcrumbList(findBreadcrumbs)
        setMenuList(meunList)
        setMenuListAction(res)
        setLoading(false)


    }
    const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
        menuList.forEach((item: Menu.MenuOptions) => {
            if (!item?.children?.length) {
                return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
            }
            newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)))
        })
        return newArr
    }
    const customIcons: { [key: string]: any } = Icon
    const addIcon = (name: string) => {
        return React.createElement(customIcons[name])
    }


    const onOpenChange = (openKey: string[]) => {
        if (openKey.length === 0 || openKey.length === 1) return setOpenkey(openKey);
        const lastOpenKey = openKey[openKey.length - 1];
        if (lastOpenKey.includes(openKey[0])) return setOpenkey(openKey)
        setOpenkey([lastOpenKey])

    }


    // 点击当前菜单跳转页面
    const navigate = useNavigate();
    const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
        const route = searchRoute(key, props.menuList);
        if (route.isLink) window.open(route.isLink, "_blank");
        navigate(key);
    };
    return (
        <div>
            <Spin spinning={loading} tip='loading...'>
                <div className='logo'>MyLOGO</div>
                <Menu
                    theme='dark'
                    mode="inline"
                    items={menuList}
                    selectedKeys={selectedKeys}
                    openKeys={openKey}
                    onClick={clickMenu}
                    onOpenChange={onOpenChange}
                >
                </Menu>
            </Spin>
        </div>
    )
}

const mapStateToProps = (state: any) => state.menu;
// const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
const mapDispatchToProps = { setBreadcrumbList, setMenuList };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
