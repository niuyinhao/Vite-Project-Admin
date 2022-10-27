import Home from '@/views/Home/index'
import { RouterObject } from '../interface'

const homeRouter: Array<RouterObject> = [
    {
        path: '/home',
        element: <Home />,
        meta: {
            title: '首页',
            key: 'home'
        }

    }
]
export default homeRouter