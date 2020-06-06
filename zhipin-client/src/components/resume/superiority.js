import React, { PureComponent } from 'react'
import { Form, Input} from 'antd';
// import observer from '../../common/observer'
// import {requestUpdateDetail} from '../../common/request'
import FormCPN from './FormCPN';

export default class SuperiorityForm extends PureComponent {

    render() {
        console.log('superiority Rendering');
        return (<FormCPN title={"个人优势"} attrName={"showSuperiorityForm"} attrGetter={"getSuperiority"} offset={17}>
            
            <Form.Item name='superiority' >
                <Input.TextArea placeholder="例如：两年UI设计经验，熟悉IOS和Android的界面设计规范，对产品本色有独特见解，有一定的手绘基础"/>
            </Form.Item>

        </FormCPN>)
    }
}
