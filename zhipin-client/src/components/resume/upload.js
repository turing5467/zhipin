import {Upload, Button, message} from 'antd'
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import {uploadResumeURL, requestGetUser} from '../../common/request'

export default class UploadForm extends Component {

    constructor(props) {
        super(props);
        requestGetUser(Cookies.get('userId')).then(data => {
            this.phone = data.user.phone;
            this.options = {
                name: 'resume',
                action: uploadResumeURL,
                onChange(info){
                    
                    if (info.file.status === 'done') {
                        message.success('上传成功');
                        
                    } else if (info.file.status === 'error') {
                        message.error('上传失败，请稍后再试');
                    }
                },
                data: {
                    phone: this.phone
                },
                showUploadList: false,
                accept: '.doc,.docx'
            }
        })
    }

    render() {
        return (
            <div class="sider-box sider-resume">
                <div class="resume-attachment">
                    <h3 class="sider-title">附件管理</h3>
                    <div class="btns">
                    <Upload {...this.options}>
                        <Button type="primary">上传简历</Button>
                    </Upload>
                    </div>
                </div>
            </div>
        )
    }
}
