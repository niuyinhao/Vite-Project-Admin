import ProTable from '@/views/proTable/index'
import { RouteObject } from '../interface'
import LayoutIndex from '@/layouts/index'

// 首页
const proTable: Array<RouteObject> = [

    {
        element: <LayoutIndex />,
        children: [
            {
                path: '/proTable/index',
                element: <ProTable />,
                meta: {
                    requiresAuth: true,
                    title: '表格',
                    key: 'proTable'
                }

            }
        ]

    }
]
export default proTable