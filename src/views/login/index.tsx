import { Button, Checkbox, Form, Input } from 'antd';

import { connect } from 'react-redux'
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom'

import myApp from '@/store/action/myApp.js';
import './index.less'
const Login = (props: any) => {

    console.log(props);
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        console.log(values);
        const { username, password } = values
        if (username === '111' && password === '111') {
            navigate('/home')
        }

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
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
const propsMaping = (state) => {
    return {
        state
    }
}
const actionMapping = (dispath) => {
    return {
        upMyapp: compose(dispath, myApp.updatemyApp),
        numUpdate: compose(dispath, myApp.numUpdate)
    }
}
export default connect(propsMaping, actionMapping)(Login);