import React, { Component } from 'react'
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import server from '../../lib/server';
import './index.css';
import drawBg from '../../utils/canvasBg';

const FormItem = Form.Item;
class NormalLogin extends Component {

    state= {
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values);
                this.login({name: values.userName, pwd: values.password, rember: values.rember})
            }
        });
    }

    login = (data) => {
        this.setState({loading: true});
        server.post('/account/login', data, (res) => {
            this.setState({loading: false});
            window.location.href = '/admin';
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-bg">
                <canvas id="canvas"></canvas>
                <div className="login-title">刘佩玉博客管理后台</div>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {
                            getFieldDecorator('userName', {
                                rules: [{ require: true, message: '请输入管理员用户名！' }]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="管理员名" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入管理后台密码!' }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理后台密码" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox className="login-form-check">Rember me</Checkbox>
                            )
                        }
                        <br />
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>登录</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
    
    componentDidMount() {
        drawBg();
    }
    
}

const Login = Form.create()(NormalLogin);

export default Login;