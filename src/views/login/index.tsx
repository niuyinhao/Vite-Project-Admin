import { Button, Checkbox, Form, Input, message } from 'antd';
import SwitchDark from '@/components/SwitchDark'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom'

import Style from './index.module.less'
import { loginApi } from '@/api/modules/login';
import { setTabsList } from '@/redux/modules/tabs/action'
const Login = (props: any) => {

    console.log(props);
    const navigate = useNavigate()
    const onFinish = async (values: any) => {
        console.log(values);
        const { username, password } = values
        const res = await loginApi({ username, password })
        console.log(res);
        if (res.code === '111') {
            props.setTabsList([])
            navigate('/home/index')
        } else {
            message.success('账号密码错误')
        }


    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={Style['login']}>
            <SwitchDark />
            <span className={Style['spp']}>222</span>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </Form.Item>
            </Form>


        </div>

    )
}
const actionMapping = {
    setTabsList
}
export default connect(null, actionMapping)(Login);