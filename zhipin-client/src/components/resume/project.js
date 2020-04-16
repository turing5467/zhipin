import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, message} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail} from '../../common/request'
import moment from 'moment'

export default class ProjectForm extends Component {
    state = {
        showProjectForm:false,
        dateFormat: 'YYYY-MM',
        phone: '',
        index: -1,
        project: []
    }

    componentWillMount() {
        let {dateFormat} = this.state
        observer.addlisten('showProjectForm', () => {
            this.setState({showProjectForm: true});
        })
        observer.addlisten('getProject', (arr, index) => {
            
            this.setState({index, project: arr})
            if(index===-1) {
                this.formRef.current && this.formRef.current.resetFields();
                return;
            }
            let item = arr[index]
            this.formRef.current && this.formRef.current.setFieldsValue({
                ...item, 
                starttime: moment(new Date(item.starttime).toLocaleDateString(), dateFormat), 
                endtime: moment(new Date(item.endtime).toLocaleDateString(), dateFormat)
            })
        })
        observer.addlisten('getPhone', (phone) => {
            this.setState({phone})
        })
    }
    formRef = React.createRef();

    onFinish = (values) => {
        
        let {phone, index, project} = this.state 
        
        if(index===-1){
            //添加
            project.push(values);
        }else {
            //修改
            project[index] = values;
        }
        
        requestUpdateDetail(phone, {project}).then(data => {
            message.success(index===-1?'添加成功':'修改成功')
            setTimeout(() => {
                this.setAndTrigger('showProjectForm')
                window.location.reload();
            }, 1000);
        })
    }

    setAndTrigger = (name) =>{
        this.setState({[name]:false})
        let name_ = 'enS'+name.slice(1)
        observer.trigger(name_)
    }

    render() {
        let {showProjectForm, dateFormat} = this.state
        return (
            <div className="item-form" style={{display:showProjectForm?'block':'none'}}>
                <h3 class="title">编辑项目经历</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    <div class="form-item form-item-required">
                        <div class="item-label">项目名称</div>
                        <div class="item-content">
                        <Form.Item name="name" rules={[{ required: true, message: '项目名称不允许为空'}]}>
                            <Input placeholder="例如：直聘网"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required">
                        <div class="item-label">项目角色</div>
                        <div class="item-content">
                        <Form.Item name="job" rules={[{ required: true, message: '项目角色不允许为空'}]}>
                            <Input placeholder="例如：UI设计师"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required form-full">
                        <div class="item-label">项目链接(选填)</div>
                        <div class="item-content">
                        <Form.Item name="link">
                            <Input placeholder="例如：github.com/turing5467"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required form-time form-full">
                        <div class="item-label">项目开始时间</div>
                        <div class="item-content">
                        <Form.Item name="starttime" rules={[{ required: true , message: '项目开始时间不允许为空'}]}>
                            <DatePicker picker="month" format={dateFormat}/>
                        </Form.Item>
                        <span class="date-scope-text">至</span>
                        <Form.Item name="endtime" rules={[{ required: true, message: '项目结束时间不允许为空'}]}>
                            <DatePicker picker="month" format={dateFormat}/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div class="form-item form-item-required form-full">
                        <div class="item-label">项目描述</div>
                        <div class="item-content">
                            <Form.Item name='content' 
                            rules={[{ required: true, message: '项目描述不允许为空'}]} 
                            wrapperCol={{ span: 36}}>
                                <Input.TextArea placeholder="请填写内容"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required form-full">
                        <div class="item-label">项目业绩(选填)</div>
                        <div class="item-content">
                            <Form.Item name='profit'>
                                <Input.TextArea placeholder="请填写内容"/>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item wrapperCol={{ offset: 17 }}>
                        <Button  onClick={() => {
                            this.setAndTrigger('showProjectForm')
                        }}>取消</Button>
                        <Button type="primary" htmlType="submit">
                        完成
                        </Button>
                    </Form.Item>
                </Form>
                
            </div>
        )
    }
}
