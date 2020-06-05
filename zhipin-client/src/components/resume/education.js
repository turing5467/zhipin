import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, message, Radio, Select} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail} from '../../common/request'
const { Option } = Select;

export default class ProjectForm extends Component {

    constructor(props) {
        super(props)
        observer.addlisten('showEducationForm', () => {
            this.setState({showEducationForm: true});
        })
        observer.addlisten('getEducation', (arr, index) => {
            console.log(123);
            
            this.setState({index, education: arr})
            if(index===-1) {
                this.formRef.current && this.formRef.current.resetFields();
                return;
            }
            let item = arr[index]
            this.formRef.current && this.formRef.current.setFieldsValue(item)
            // this.setState({endYear: [item.endYear]})
            this.change(item.startYear)
        })
        observer.addlisten('getPhone', (phone) => {
            this.setState({phone})
        })
    }

    state = {
        showEducationForm:false,
        phone: '',
        index: -1,
        education: [],
        endYear: []
    }

    formRef = React.createRef();

    onFinish = (values) => {
        console.log(values);
        
        let {phone, index, education} = this.state 
        
        if(index===-1){
            //添加
            education.push(values);
        }else {
            //修改
            education[index] = values;
        }
        
        requestUpdateDetail(phone, {education}).then(data => {
            message.success(index===-1?'添加成功':'修改成功')
            setTimeout(() => {
                this.setAndTrigger('showEducationForm')
                window.location.reload();
            }, 1000);
        })
    }
    
    componentDidMount() {
        let Y = new Date().getFullYear();
        let gap = Y - 1990;
        this.startYear = Array.from(new Array(gap + 1).keys(), ele => ele + 1990).reverse()
        this.startYear.push('1990年以前')
        
    }

    change = (v) =>{
        console.log(typeof v);
        // let {endYear} = this.state
        this.setState({
            endYear: Array.from(new Array(8).keys(), ele => ele + v + 1)
        })
    }

    setAndTrigger = (name) =>{
        this.setState({[name]:false})
        let name_ = 'enS'+name.slice(1)
        observer.trigger(name_)
    }

    render() {
        let {showEducationForm, endYear} = this.state
        console.log(showEducationForm);
        
        return (
            <div className="item-form" style={{display:showEducationForm?'block':'none'}}>
                <h3 className="title">编辑教育经历</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    <div className="form-item form-item-required">
                        <div className="item-label">学校名称</div>
                        <div className="item-content">
                        <Form.Item name="school" rules={[{ required: true, message: '学校名称不允许为空'}]}>
                            <Input placeholder="例如：清华大学"/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div className="form-item form-item-required">
                        <div className="item-label"> </div>
                        <div className="item-content">
                        <Form.Item name="isFullTime" rules={[{ required: true, message: '请选择是否全日制'}]}>
                            <Radio.Group>
                                <Radio.Button value="全日制">全日制</Radio.Button>
                                <Radio.Button value="非全日制">非全日制</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        </div>
                    </div>

                    <div className="form-item form-item-required">
                        <div className="item-label">学历</div>
                        <div className="item-content">
                        <Form.Item name="eduBG" rules={[{ required: true, message: '请填写学历'}]}>
                        <Select placeholder="选择学历">
                            <Option value="初中及以下">初中及以下</Option>
                            <Option value="中专/中技">中专/中技</Option>
                            <Option value="高中">高中</Option>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                        </Select>
                        </Form.Item>
                        </div>
                    </div>

                    <div className="form-item form-item-required">
                        <div className="item-label">专业</div>
                        <div className="item-content">
                        <Form.Item name="specialty" rules={[{ required: true, message: '请填写专业'}]}>
                            <Input placeholder="例如：信息安全"/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div className="form-item form-item-required form-time form-full">
                        <div className="item-label">时间段</div>
                        <div className="item-content">
                        <Form.Item name="startYear" rules={[{ required: true , message: '请填写时间段'}]}>
                        <Select placeholder="选择年份" onChange={this.change}>
                            {this.startYear.map(ele => (<Option value={ele}>{ele}</Option>))}
                        </Select>
                        </Form.Item>
                        <span className="date-scope-text">至</span>
                        <Form.Item name="endYear" rules={[{ required: true , message: '请填写时间段'}]}>
                        <Select placeholder="选择年份" disabled={endYear.length>0?false:true} onChange={this.change}>
                            {endYear.map(ele => (<Option value={ele}>{ele}</Option>))}
                        </Select>
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required form-full">
                        <div className="item-label">在校经历(选填)</div>
                        <div className="item-content">
                        <Form.Item name="experience" rules={[{ required: true, message: '请填写专业'}]}>
                            <Input.TextArea placeholder="请填写内容"/>
                        </Form.Item>
                        </div>
                    </div>

                    <Form.Item wrapperCol={{ offset: 17 }}>
                        <Button  onClick={() => {
                            this.setAndTrigger('showEducationForm')
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
