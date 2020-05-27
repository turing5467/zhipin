import React, { Component } from 'react'
import {randomNumber} from '../../common/util'
import {message} from 'antd'
import {requestRegister} from '../../common/request'
import Cookies from 'js-cookie';

export default class Register extends Component {
    constructor(props) {
        super(props)
        Cookies.remove('userId');
    }

    state = {
        phone:'',
        phoneErrInfo: '',
        codeErrInfo:'',
        checkedErrInfo: '',
        curCode: '',
        verifyCode: '',
        codeAsideText: '发送验证码',
        isAgreePolicy: false
    }

    changePhone = (e) => {
        this.setState({phone: e.target.value})
    }

    changeCode = (e) => {
        this.setState({verifyCode: e.target.value})
    }

    changeAgree = (e) => {
        this.setState({isAgreePolicy:e.target.checked})
    }

    getVerifyCode = () => {
        let code = randomNumber(1000,9999).toString()
        console.log(code);
        
        if(this.state.phone.match(/^1[3-9]\d{9}$/)) {
            //发送验证码
            this.setState({curCode:code, codeAsideText: '请稍后',phoneErrInfo: ''})
            // 5min后验证码失效
            setTimeout(() => {
                this.setState({curCode: ''})
            },1000*60*5)

            //修改getCodeText
            let i = 60;
            let timer = setInterval(() => {
                i--;
                this.setState({codeAsideText: '已发送'+i+'秒'})
                if(i===0) {
                    this.setState({codeAsideText: '发送验证码'})
                    clearInterval(timer)
                }
            }, 1000);
        }else {
            this.setState({phoneErrInfo: '请正确填写手机号'})
        }
    }

    handleRegister = () => {
        let {curCode, verifyCode, phone} = this.state;
        
        //验证码是否正确
        if(curCode !== '' && curCode === verifyCode) {
            this.setState({codeErrInfo: ''})
            
            //是否同意用户协议
            if(this.state.isAgreePolicy){
                requestRegister(phone).then(data => {
                    
                    if(data.status === -1) {
                        //已经注册过
                        message.info('此手机号已注册，请直接登录');
                    }else {
                        //注册成功
                        message.success('注册成功,请登录');
                        window.location.href = '/login'
                    }

                })
            }else {
                message.info('请阅读并同意用户协议，方可注册');
            }
        }else {
            this.setState({codeErrInfo: '验证码错误'})
        }
        
    }

    render() {
        
        let {phoneErrInfo, codeErrInfo, checkedErrInfo, codeAsideText} = this.state;

        return (
            <div id="wrap">
                <div className="sign-wrap sign-wrap-v2">
                    <div className="sign-form sign-register" style={{display:'block'}}>
                        <div className="sign-content">
                            <div className="inner-box">
                                <h3 className="title">注册</h3>
                                <div className="form-row row-select">
                                    <span className="ipt-wrap">
                                        <i className="icon-sign-phone"></i>
                                        <input type="tel" className="ipt ipt-phone required" placeholder="手机号" value={this.state.phone} onChange={this.changePhone}/>
                                    </span>
                                    <div className="tip-error" style={{display: phoneErrInfo?'block':'none'}}>{phoneErrInfo}</div>
                                </div>
                                <div className="form-row">
                                    <span className="ipt-wrap">
                                        <i className="icon-sign-sms"></i>
                                        <input type="text" className="ipt ipt-sms required" placeholder="短信验证码" name="phoneCode" maxLength="4"
                                         value={this.state.verifyCode}
                                         onChange={this.changeCode}/>
                                        <button type="button" className={codeAsideText==="发送验证码"?"btn btn-sms":"btn btn-sms btn-disabled count-down"} onClick={this.getVerifyCode}>{codeAsideText}</button>
                                    </span>
                                    <div className="tip-error" style={{display: codeErrInfo?'block':'none'}}>{codeErrInfo}</div>
                                </div>
                                <div className="form-btn">
                                    <button className="btn" onClick={this.handleRegister}>注册</button>
                                </div>
                                <div className="text-tip">
                                    <div className="tip-error">{checkedErrInfo}</div>
                                    <input type="checkbox" className="agree-policy" onChange={this.changeAgree}/>我已同意用户协议及隐私政策
                                    <a href="/login" className="link-signin">直接登录</a>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>   
            </div>
        )
    }
}

