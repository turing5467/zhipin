import React, { Component } from 'react'
import { Form, Input, Button, Select ,DatePicker} from 'antd';
import observer from '../../common/observer'
import moment from 'moment'
import {requestUpdateDetail} from '../../common/request'
const { Option } = Select;
// window.moment = moment

export default class InfoForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            showInfoForm: false,
            initialUser: {},
            dateFormat: 'YYYY-MM',
            phone: ''
        }
    }

    enShowForm = () => {
        this.setState({showInfoForm: false})
        observer.trigger('enShowInfoForm',false)
    }

    formRef = React.createRef();

    onFinish = values => {
        let {phone} = this.state;
        requestUpdateDetail(phone, values).then(data => {
            console.log(data);
            this.enShowForm();
        })
      };
    
    componentWillMount() {
        let {dateFormat} = this.state
        //监听事件
        observer.addlisten('showInfoForm', () => {
            this.setState({showInfoForm:true})
        })
        observer.addlisten('getUser', (user) => {
            this.setState({initialUser: user, phone: user.phone});
            console.log(this.formRef);
            
            this.formRef.current && this.formRef.current.setFieldsValue({...user,
                birth: user.birth?moment(new Date(user.birth).toLocaleDateString(), dateFormat):undefined
            })
        })
    }

    render() {
        let {showInfoForm, initialUser, dateFormat} = this.state
    
    return (
        <div className="item-form" style={{display:showInfoForm?'block':'none'}}>
            <h3 class="title">编辑个人信息</h3>
            <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish} className="ui-form ui-form-label-top">
                <div class="form-item form-item-required">
                    <div class="item-label">姓名</div>
                    <div class="item-content">
                    <Form.Item name="name" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item form-item-required">
                    <div class="item-label">当前求职状态</div>
                    <div class="item-content">
                    <Form.Item name="status">
                        <Select
                            placeholder=""
                            allowClear>
                            <Option value="离校-随时到岗">离校-随时到岗</Option>
                            <Option value="在校-暂不考虑">在校-暂不考虑</Option>
                            <Option value="在校-考虑机会">在校-考虑机会</Option>
                            <Option value="在校-月内到岗">在校-月内到岗</Option>
                        </Select>
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item form-item-required">
                    <div class="item-label">性别</div>
                    <div class="item-content">
                    <Form.Item name="gender">
                        <Select
                            placeholder=""
                            allowClear>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item form-item-required">
                    <div class="item-label">生日</div>
                    <div class="item-content">
                    <Form.Item name="birth">
                        <DatePicker  picker="month" format={dateFormat}/>
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item form-item-required">
                    <div class="item-label">微信号(选填)</div>
                    <div class="item-content">
                    <Form.Item name="weixin">
                        <Input placeholder="请输入您的微信号"/>
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item">
                    <div class="item-label">电话</div>
                    <div class="item-content">
                        <div class="input-wrap input-wrap-text input-group input-group-with-append input-hide-icon" ka="resume_form_edit_phone">
                            <input autocomplete="off" spellcheck="false" type="text" placeholder="请输入您的手机号" disabled="disabled" class="input input-disabled" value={initialUser.phone}/>
                            <div class="input-group-append">
                                <div class="append-tip"><p class="gray"> 电话即为登录账号，如需修改可直接在 <a href="/setting">账号设置</a> 中修改 </p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-item form-item-required">
                    <div class="item-label">邮箱(选填)</div>
                    <div class="item-content">
                    <Form.Item name="mail">
                        <Input placeholder="请输入您的邮箱"/>
                    </Form.Item>
                    </div>
                </div>
                <div class="form-item form-item-required">
                <div class="item-label"></div>
                    <Form.Item wrapperCol={{ offset: 8 }}>
                        <Button  onClick={this.enShowForm}>取消</Button>
                        <Button type="primary" htmlType="submit">
                        完成
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
        );
    }
}
