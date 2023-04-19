import Mydemo from '@/views/Mydemo/index'
import { RouterObject } from '../interface'

const demoRouter: Array<RouterObject> = [
    {
        path: '/demo',
        element: <Mydemo />,
        meta: {
            title: 'Demo',
            key: 'demo'
        }

    }
]
export default demoRouter