import React, { Component } from 'react'
import { Form, Input, Button} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail} from '../../common/request'

export default class SuperiorityForm extends Component {
    state = {
        showSuperiorityForm:false,
        phone: ''
    }

    formRef = React.createRef();

    componentWillMount() {
        observer.addlisten('showSuperiorityForm', () => {
            this.setState({showSuperiorityForm: true});
        })
        observer.addlisten('getSuperiority', (user) => {
            this.formRef.current && this.formRef.current.setFieldsValue({superiority:user.superiority})
            this.setState({phone: user.phone})
        })
    }

    enShowForm = () => {
        this.setState({showSuperiorityForm: false})
        observer.trigger('enShowSuperiorityForm',false)
    }

    onFinish = (values) => {
        console.log(values);
        let {phone} = this.state 
        requestUpdateDetail(phone, values).then(data => {
            console.log(data);
            this.enShowForm();
        })
    }
    render() {
        let {showSuperiorityForm} = this.state
        return (
            <div className="item-form" style={{display:showSuperiorityForm?'block':'none'}}>
                <h3 class="title">编辑个人信息</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    <Form.Item name='superiority' >
                        <Input.TextArea placeholder="例如：两年UI设计经验，熟悉IOS和Android的界面设计规范，对产品本色有独特见解，有一定的手绘基础"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 17 }}>
                        <Button  onClick={this.enShowForm}>取消</Button>
                        <Button type="primary" htmlType="submit">
                        完成
                        </Button>
                    </Form.Item>
                </Form>
                
            </div>
        )
    }
}
