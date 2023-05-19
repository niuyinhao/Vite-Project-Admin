import Home from '@/views/home/index'
import { RouteObject } from '../interface'
import LayoutIndex from '@/layouts/index'

// 首页
const demoRouter: Array<RouteObject> = [

    {
        element: <LayoutIndex />,
        children: [
            {
                path: '/home/index',
                element: <Home />,
                meta: {
                    requiresAuth: true,
                    title: '首页',
                    key: 'home'
                }

            }
        ]

    }
]
export default demoRouter