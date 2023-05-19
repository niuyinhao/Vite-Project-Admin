import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import { setTabsList } from '@/redux/modules/tabs/action'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchRoute } from '@/utils/utils'
import { routerArray } from '@/routers'
import { HOME_URL } from '@/config/config'
import './index.less'
function Index(props: any) {
    const { tabsList } = props.tabs
    const { setTabsList } = props;
    const { TabPane } = Tabs
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [activeVal, setActiveVal] = useState<string>(pathname)
    useEffect(() => {
        addTabs();
    }, [pathname])
    const addTabs = () => {
        const router = searchRoute(pathname, routerArray);
        let newTabsList = [...tabsList]
        console.log(tabsList);

        if (tabsList.every((item: any) => item.path !== router.path)) {
            newTabsList.push({ title: router.meta?.title, path: router.path })

        }
        // console.log('newTabsList', newTabsList);

        setTabsList(newTabsList);
        setActiveVal(pathname)
    }
    const clickTabs = (path: string) => {
        navigate(path)
    }
    const delTabs = (path: string) => {

        if (path === HOME_URL) return;
        let newTabsList = [...tabsList];
        //删除的是与当前路由一致的tab 往前或者往后跳转
        if (path === pathname) {
            const findTabsIndex = tabsList.findIndex((item: Menu.MenuOptions) => item.path === pathname);
            if (!findTabsIndex) return
            const nextTab = tabsList[findTabsIndex + 1] || tabsList[findTabsIndex - 1];
            if (!nextTab) return
            navigate(nextTab.path)
        }
        const delTabsList = newTabsList.filter((item: any) => item.path !== path)
        setTabsList(delTabsList)
        // console.log('delTabsList', delTabsList);

    }
    const items = () => {
        return tabsList.map((item: any) => {
            return { label: item.title, key: item.path }
        })
    }
    return (
        <div className='myTabs'>
            <Tabs
                activeKey={activeVal}
                animated
                hideAdd
                type="editable-card"
                onChange={clickTabs}
                onEdit={path => {
                    delTabs(path as string)
                }}
                items={
                    items()
                }
            >
                {/* {
                    tabsList.map((item: Menu.MenuOptions) => {
                        return (
                            <TabPane
                                key={item.path}
                                tab={
                                    <span>
                                        {item.title}
                                    </span>
                                }
                            ></TabPane>
                        )
                    })
                } */}
            </Tabs>
        </div>
    )
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = { setTabsList }
export default connect(mapStateToProps, mapDispatchToProps)(Index)