import React, { useState, useEffect } from 'react'
import {requestGetUser, requestUpdateUser} from '../../common/request'
import Cookies from 'js-cookie'
import { Form, Input, Button, message} from 'antd';


export default function Setting() { 
    const [pwdFlag, setPwdFlag] = useState(false)
    const [phone, setPhone] = useState('')
    const [pwd, setPwd] = useState('')
    
    const onSetPwd = (values) => {
        let {pwd, rePwd} = values;
        if(pwd === rePwd) {
            changePwd(pwd)
        }else {
            message.error('两次输入密码不一致')
        }
    }
    const onChangePwd = (values) => {
        //旧密码不对
        let {oldPwd, newPwd, rePwd} = values
        if(oldPwd === pwd) {
            if(newPwd === rePwd) {
                changePwd(newPwd)
            }
        }else {
            message.error('旧密码输入错误,请重新输入')
        }
    }
    const changePwd = (pwd) => {
        requestUpdateUser(Cookies.get('userId'), pwd).then(data => {
            message.success('密码修改成功')
            window.location.reload()
        })
    }

    useEffect(() => {
        requestGetUser(Cookies.get('userId')).then(data => {
            
            let {pwd,phone} = data.user
            setPwdFlag(pwd !== '')
            setPhone(phone)
            setPwd(pwd);
        })
    })

    console.log('setting组件 Rendering');
        return (
            <div id="main" className="inner">
                <div className="account">
                    <div className="account-tab-nav">
                        <nav>
                            <h3 className="nav-title">账号设置</h3>
                            <ul>
                                <li className="nav-list active">设置密码</li>
                            </ul>
                        </nav>
                        <div className="content">
                            <div className="change-pwd-content">
                                <div className="form-item">
                                    <div className="item-label" >当前登录的账号</div>
                                    <div className="item-content" ><span className="text-gray">{phone.replace(phone.substring(3,7), '****')}</span></div>
                                </div>
                                <Form
                                    style={{display:pwdFlag?'none':'block'}} 
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 8 }} 
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onSetPwd}
                                    className="ant-form ant-form-horizontal"
                                    >
                                    
                                    <Form.Item
                                        label="设置登陆密码"
                                        name="pwd"
                                        rules={[{ required: true, message: 'Please input your username!' },{
                                            pattern: /.{8,}/,
                                            message: '请输入8位以上密码'
                                        }]}>
                                        <Input.Password placeholder="请输入密码"/>
                                    </Form.Item>
                                    <Form.Item
                                        label=" "
                                        name="rePwd"
                                        rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input.Password placeholder="请确认密码"/>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                        设置密码
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Form
                                    style={{display: !pwdFlag?'none':'block'}}
                                     labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 8 }} 
                                    onFinish={onChangePwd}
                                    className="ant-form ant-form-horizontal"
                                    >
                                    <Form.Item
                                        label="旧密码"
                                        name="oldPwd"
                                        rules={[{ required: true, message: '请输入旧密码' }]}>
                                        <Input.Password placeholder="请输入旧密码"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="新密码"
                                        name="newPwd"
                                        rules={[{ required: true, message: '请输入旧密码' }, {
                                            pattern: /.{8,}/,
                                            message: '请输入8位以上密码'
                                        }]}>
                                        <Input.Password placeholder="设置新密码"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="确认新密码"
                                        name="rePwd"
                                        rules={[{ required: true, message: '请再次输入新密码' }]}>
                                        <Input.Password placeholder="确认新密码"/>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                        确认更改密码
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
 }