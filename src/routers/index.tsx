import { Navigate, useRoutes } from 'react-router-dom'
import { RouterObject } from './interface';
import Login from '@/views/login'
//导入所以router
const metaRouters = import.meta.globEager("./modules/*.tsx");

//处理路由
export const routerArray: RouterObject[] = [];
Object.keys(metaRouters).forEach(item => {
    Object.keys(metaRouters[item]).forEach((key: any) => {
        routerArray.push(...metaRouters[item][key]);
    });
});

export const rootRouter: RouterObject[] = [
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path: '/login',
        element: <Login />,
        meta: {
            title: '登陆页'
        }
    },
    ...routerArray,
    // {
    //     path: '*',
    //     element: <Navigate to='/404' />
    // }
];
const Router = () => {
    const routers = useRoutes(rootRouter);
    return routers;
}
export default Router;