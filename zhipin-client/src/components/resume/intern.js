import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, message} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail} from '../../common/request'
import moment from 'moment'

export default class InternForm extends Component {
    state = {
        showInternForm:false,
        dateFormat: 'YYYY-MM',
        phone: '',
        index: -1,
        intern: []
    }

    componentWillMount() {
        let {dateFormat} = this.state
        observer.addlisten('showInternForm', () => {
            this.setState({showInternForm: true});
        })
        observer.addlisten('getIntern', (arr, index) => {
            this.setState({index, intern: arr})
            if(index===-1) {
                this.formRef.current && this.formRef.current.resetFields();
                return;
            }
            let item = arr[index]
            this.formRef.current && this.formRef.current.setFieldsValue({
                ...item, 
                starttime: item.starttime?moment(new Date(item.starttime).toLocaleDateString(), dateFormat):undefined, 
                endtime: item.endtime?moment(new Date(item.endtime).toLocaleDateString(), dateFormat):undefined})
            this.setState({index, intern: arr})
        })
        observer.addlisten('getPhone', (phone) => {
            this.setState({phone})
        })
    }
    formRef = React.createRef();

    onFinish = (values) => {
        
        let {phone, index, intern} = this.state 
        if(index===-1){
            //添加
            intern.push(values);
        }else {
            //修改
            intern[index] = values;
        }
        
        requestUpdateDetail(phone, {intern}).then(data => {
            message.success(index===-1?'添加成功':'修改成功')
            setTimeout(() => {
                this.setAndTrigger('showInternForm')
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
        let {showInternForm, dateFormat} = this.state
        return (
            <div className="item-form" style={{display:showInternForm?'block':'none'}}>
                <h3 class="title">编辑实习经历</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    <div class="form-item form-item-required">
                        <div class="item-label">公司名称</div>
                        <div class="item-content">
                        <Form.Item name="CPNName" rules={[{ required: true, message: '请填写公司名称'}]}>
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required">
                        <div class="item-label">所属行业</div>
                        <div class="item-content">
                        <Form.Item name="industry">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required">
                        <div class="item-label">所属部门(选填)</div>
                        <div class="item-content">
                        <Form.Item name="department">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required">
                        <div class="item-label">职位名称(选填)</div>
                        <div class="item-content">
                        <Form.Item name="jobName">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required form-time">
                        <div class="item-label">在职时间</div>
                        <div class="item-content">
                        <Form.Item name="starttime" rules={[{ required: true, message: '请填写在职时间'}]}>
                            <DatePicker picker="month" format={dateFormat}/>
                        </Form.Item>
                        <span class="date-scope-text">至</span>
                        <Form.Item name="endtime" rules={[{ required: true, message: '请填写在职时间'}]}>
                            <DatePicker picker="month" format={dateFormat}/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div class="form-item form-item-required">
                        <div class="item-label">工作内容</div>
                        <div class="item-content">
                            <Form.Item name='content' rules={[{ required: true, message: '工作内容不允许为空'}]} >
                                <Input.TextArea placeholder="输入工作内容"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div class="form-item form-item-required">
                        <div class="item-label">工作业绩(选填)</div>
                        <div class="item-content">
                            <Form.Item name='profit'>
                                <Input.TextArea placeholder="输入工作业绩"/>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item wrapperCol={{ offset: 17 }}>
                        <Button  onClick={() => {
                            this.setAndTrigger('showInternForm');
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
