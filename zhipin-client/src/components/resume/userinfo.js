import React, { PureComponent } from 'react'
import { Form, Input, Select ,DatePicker} from 'antd';
import FormCPN from './FormCPN';
const { Option } = Select;

export default class InfoForm extends PureComponent {

    render() {
        console.log('userinfo rendering');
        
        return (<FormCPN title={"基本信息"} attrName={"showInfoForm"} attrGetter={"getUser"}  offset={8}>
            <div className="form-item form-item-required">
                <div className="item-label">姓名</div>
                <div className="item-content">
                <Form.Item name="name" rules={[{ required: true}]}>
                    <Input />
                </Form.Item>
                </div>
            </div>
            <div className="form-item form-item-required">
                <div className="item-label">当前求职状态</div>
                <div className="item-content">
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
            <div className="form-item form-item-required">
                <div className="item-label">性别</div>
                <div className="item-content">
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
            <div className="form-item form-item-required">
                <div className="item-label">生日</div>
                <div className="item-content">
                <Form.Item name="birth">
                    <DatePicker  picker="month"/>
                </Form.Item>
                </div>
            </div>
            <div className="form-item form-item-required">
                <div className="item-label">微信号(选填)</div>
                <div className="item-content">
                <Form.Item name="weixin">
                    <Input placeholder="请输入您的微信号"/>
                </Form.Item>
                </div>
            </div>
            <div className="form-item">
                <div className="item-label">电话</div>
                <div className="item-content">
                    <Form.Item name="phone" className="item-phone">
                        <Input disabled />
                    </Form.Item>
                    <div className="input-group-append">
                            <div className="append-tip"><p className="gray"> 电话即为登录账号，如需修改可直接在 <a href="/setting">账号设置</a> 中修改 </p></div>
                        </div>
                </div>
            </div>
            <div className="form-item form-item-required">
                <div className="item-label">邮箱(选填)</div>
                <div className="item-content">
                <Form.Item name="mail">
                    <Input placeholder="请输入您的邮箱"/>
                </Form.Item>
                </div>
            </div>
        </FormCPN>)
    }
}
