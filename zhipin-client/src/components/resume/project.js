import React, { Component } from 'react'
import { Form, Input, DatePicker} from 'antd';
import FormArrCPN from './FormArrCPN';

export default class ProjectForm extends Component {

    render() {
        return (
            <FormArrCPN arrName={"project"} attrName={"showProjectForm"} title={"项目经历"}>
                <div className="form-item form-item-required">
                        <div className="item-label">项目名称</div>
                        <div className="item-content">
                        <Form.Item name="name" rules={[{ required: true, message: '项目名称不允许为空'}]}>
                            <Input placeholder="例如：直聘网"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required">
                        <div className="item-label">项目角色</div>
                        <div className="item-content">
                        <Form.Item name="job" rules={[{ required: true, message: '项目角色不允许为空'}]}>
                            <Input placeholder="例如：UI设计师"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required form-full">
                        <div className="item-label">项目链接(选填)</div>
                        <div className="item-content">
                        <Form.Item name="link">
                            <Input placeholder="例如：github.com/turing5467"/>
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required form-time form-full">
                        <div className="item-label">项目开始时间</div>
                        <div className="item-content">
                        <Form.Item name="starttime" rules={[{ required: true , message: '项目开始时间不允许为空'}]}>
                            <DatePicker picker="month"/>
                        </Form.Item>
                        <span className="date-scope-text">至</span>
                        <Form.Item name="endtime" rules={[{ required: true, message: '项目结束时间不允许为空'}]}>
                            <DatePicker picker="month"/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div className="form-item form-item-required form-full">
                        <div className="item-label">项目描述</div>
                        <div className="item-content">
                            <Form.Item name='content' 
                            rules={[{ required: true, message: '项目描述不允许为空'}]} 
                            wrapperCol={{ span: 36}}>
                                <Input.TextArea placeholder="请填写内容"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required form-full">
                        <div className="item-label">项目业绩(选填)</div>
                        <div className="item-content">
                            <Form.Item name='profit'>
                                <Input.TextArea placeholder="请填写内容"/>
                            </Form.Item>
                        </div>
                    </div>
            </FormArrCPN>
            
        )
    }
}
