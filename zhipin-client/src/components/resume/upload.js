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
                beforeUpload(file){
                    console.log(file);
                    let fileType = file.name.split('.')[1]
                    let arr = ['doc','docx','docm','pdf']
                    let flag = arr.some(ele => fileType==ele)
                    if(flag) {
                        return true
                    }else {
                        message.warning('请上传.doc,.docx,.docm,.pdf格式的文档')
                        return false;
                    }
                    // return ;
                },
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
                // accept: '.doc,.docx'
            }
        })
    }

    render() {
        return (
            <div className="sider-box sider-resume">
                <div className="resume-attachment">
                    <h3 className="sider-title">附件管理</h3>
                    <div className="btns">
                    <Upload {...this.options}>
                        <Button type="primary">上传简历</Button>
                    </Upload>
                    </div>
                </div>
            </div>
        )
    }
}
