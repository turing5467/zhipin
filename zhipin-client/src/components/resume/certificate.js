import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail, requestGetCert} from '../../common/request'

export default class SuperiorityForm extends Component {
    state = {
        showCertForm:false,
        phone: '',
        certificate:[],
        certs: []
    }
    componentWillMount() {
        observer.addlisten('showCertForm', () => {
            this.setState({showCertForm: true});
        })
        observer.addlisten('getCert', (user) => {
            
            this.formRef.current && this.formRef.current.setFieldsValue({certificate:user.certificate})
            this.setState({phone: user.phone, certificate: user.certificate})
        })
        requestGetCert().then(data => {
            
            this.setState({certs: data})
        })
    }
    formRef = React.createRef();

    onFinish = (values) => {
        console.log(values);
        
        let {phone} = this.state 
        requestUpdateDetail(phone, {certificate: values.certificate}).then(data => {
            console.log(data);
            this.setAndEntrigger('showCertForm')
        })
    }

    changeCert = (values) => {
        console.log(values);
        if(values.length > 30) {
            message.error('证书不得超过30个,请择优选择')
        }
        this.setState({certificate: values})
        
    }

    deleteCert = (index) => {
        let cert = this.state.certificate;
        cert.splice(index, 1);
        this.setState({certificate: cert})
    }

    setAndEntrigger = (name) => {
        this.setState({[name]:false})
        let name_ = 'enS'+name.slice(1)
        observer.trigger(name_)
    }

    render() {
        let {showCertForm, certificate, certs} = this.state
        return (
            <div class="dialog-wrap certification-dialog v-transfer-dom"
                style={{display:showCertForm?'block':'none'}}>
                <div class="dialog-layer"></div>
                <div class="dialog-container">
                    <div class="dialog-header">
                        <h3 class="title"> 资格证书   <span class="certification-count">
                            <span class="">{certificate.length}</span>/30 </span>
                        </h3>
                        <span ka="dialog_close" class="close"><i class="icon-close" onClick={() => {
                            this.setAndEntrigger('showCertForm')
                        }}></i></span>
                    </div>
                    <div className="dialog-body">
                    <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                        <div class="cert-select-form">
                            <div class="cert-select-tags">
                                {certificate.map((ele,index) => (<span class="cert-select-tag">{ele}<a href="javascript:;" class="cert-select-remove" onClick={() => {
                                    this.deleteCert(index)
                                }}></a>
                                </span>))}
                                <div class="cert-input-wrap">
                                    <div class="cert-input-value"></div>
                                    <div class="ui-suggest ui-dropmenu" placeholder="选择或输入证书,最多30个">
                                        <div class="ui-dropmenu-label">
                                            <div class="ui-suggest-input input-wrap input-wrap-text">
                                                <input autocomplete="on" spellcheck="false" type="text" placeholder="选择或输入证书,最多30个" class="input" />
                                            </div>
                                        </div>
                                        <div class="ui-dropmenu-list"></div>
                                    </div>
                                </div>
                            </div>
                            <Form.Item wrapperCol={{ offset: 17 }}>
                                <Button type="primary" htmlType="submit">
                                确定
                                </Button>
                            </Form.Item>
                        </div>
                        <div class="cert-content">
                            <Form.Item name="certificate" >
                            <Checkbox.Group onChange={this.changeCert}>
                                {certs.map(ele => (
                                    <div class="cert-catgory">
                                        <div class="cert-catgory-label">{ele.label}</div>
                                        <div class="cert-item-list">
                                            {ele.list.map(e => (
                                                <Checkbox value={e}>{e}</Checkbox>
                                            ))}
                                        </div>    
                                    </div>
                                ))}
                            </Checkbox.Group>
                            </Form.Item>
                        </div>
                    </Form>
                    </div>
                    
                </div>
            </div>
        )
    }
}
