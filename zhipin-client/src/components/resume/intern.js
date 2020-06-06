import React, { PureComponent } from 'react'
import { Form, Input,  DatePicker} from 'antd';
import FormArrCPN from './FormArrCPN';

export default class InternForm extends PureComponent {

    render() {
        console.log('intern Rendering');
        return (
            <FormArrCPN arrName={"intern"} attrName={"showInternForm"} title={"实习经历"}>
                <div className="form-item form-item-required">
                        <div className="item-label">公司名称</div>
                        <div className="item-content">
                        <Form.Item name="CPNName" rules={[{ required: true, message: '请填写公司名称'}]}>
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required">
                        <div className="item-label">所属行业</div>
                        <div className="item-content">
                        <Form.Item name="industry">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required">
                        <div className="item-label">所属部门(选填)</div>
                        <div className="item-content">
                        <Form.Item name="department">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required">
                        <div className="item-label">职位名称(选填)</div>
                        <div className="item-content">
                        <Form.Item name="jobName">
                            <Input />
                        </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required form-time">
                        <div className="item-label">在职时间</div>
                        <div className="item-content">
                        <Form.Item name="starttime" rules={[{ required: true, message: '请填写在职时间'}]}>
                            <DatePicker picker="month"/>
                        </Form.Item>
                        <span className="date-scope-text">至</span>
                        <Form.Item name="endtime" rules={[{ required: true, message: '请填写在职时间'}]}>
                            <DatePicker picker="month"/>
                        </Form.Item>
                        </div>
                    </div>
                    
                    <div className="form-item form-item-required">
                        <div className="item-label">工作内容</div>
                        <div className="item-content">
                            <Form.Item name='content' rules={[{ required: true, message: '工作内容不允许为空'}]} >
                                <Input.TextArea placeholder="输入工作内容"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="form-item form-item-required">
                        <div className="item-label">工作业绩(选填)</div>
                        <div className="item-content">
                            <Form.Item name='profit'>
                                <Input.TextArea placeholder="输入工作业绩"/>
                            </Form.Item>
                        </div>
                    </div>
            </FormArrCPN>
            
        )
    }
}
