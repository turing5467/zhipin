import React, { Component } from 'react'
import {hasClass, addClass, removeClass, randomNumber} from '../../common/util'
import {message} from 'antd'
import Cookies from 'js-cookie'
import {requestLogin} from '../../common/request'

 class Login extends Component {

    constructor(props) {
        super(props)
        Cookies.remove('userId');
    }
    
    state = {
        tabIndex: 1,
        phone_1: '',
        phone_2: '',
        password: '',
        codeAsideText: '发送验证码',
        curCode: '',    //发送至手机的短信验证码
        verifyCode: '',  //用户输入的验证码
        phone_1ErrInfo: '',
        phone_2ErrInfo: '',
        pwdErrInfo: '',
        codeErrInfo: '',
    }

    setTab = (index) => {
        this.setState({tabIndex: index, password:''})
    }

    changePhone = (e, index) => {
        let v = e.target.value;
        this.setState({['phone_'+index]: v})
    }
    changePwd = (e) => {
        this.setState({password: e.target.value})
    }
    changeCode = (e) => {
        this.setState({verifyCode: e.target.value})
    }


    handleLogin = () => {
        let index = this.state.tabIndex
        let {phone_1, phone_2, password, verifyCode, curCode} = this.state
        if(index === 1) {
            //密码登录
            if(phone_1.match(/^1[3-9]\d{9}$/)) {
                requestLogin(phone_1, password).then(data => {
                    switch(data.status) {
                        case 0:
                            Cookies.set('userId', data.user._Id)
                            message.success('登陆成功')
                            setTimeout(()=>{
                                window.location.href = '/'
                            },500)
                            break
                        case -1:
                            this.setState({phone_1ErrInfo: '手机号未注册'})
                            break;
                        case -2:
                            this.setState({pwdErrInfo: '密码错误'})
                        default:
                            break;
                    }})
            }else {
                this.setState({phone_1ErrInfo: '请正确填写手机号'})
            }
        }else {
            //短信登录
            if(verifyCode === curCode) {
                this.setState({codeErrInfo: ''})
                requestLogin(phone_2, '').then(data => {
                    switch(data.status) {
                        case 0:
                            Cookies.set('userId', data.user._id, {expires: 7})
                            message.success('登陆成功')
                            setTimeout(()=>{
                                window.location.href = '/'
                            },500)
                            break
                        case -1:
                            this.setState({phone_2ErrInfo: '手机号未注册'})
                            break;
                        default:
                            break
                    }
                })
            }else {
                this.setState({codeErrInfo: '验证码错误'})
                
            }
        }
    }

    getVerifyCode = () => {
        let code = randomNumber(1000,9999).toString()
        console.log(code);
        
        if(this.state.phone_2.match(/^1[3-9]\d{9}$/)) {
            //手机号未注册
            if(false) {
                message.warning('手机号未注册');
                return;
            }
            //发送验证码
            this.setState({curCode:code, codeAsideText: '请稍后',phone_2ErrInfo: ''})
            // 5min后验证码失效
            setTimeout(() => {
                this.setState({curCode: ''})
            },1000*60*5)

            //修改codeAsideText
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
            this.setState({phone_2ErrInfo: '请正确填写手机号'})
        }
    }

    handleClick = (e) => {
        
        let items = Array.from(document.getElementsByClassName('ipt-wrap'))
        removeClass(items, 'focus-wrap')
        addClass(e.currentTarget, 'focus-wrap')
    }

    componentWillMount() {
        //添加事件
        document.addEventListener('click', (e) => {
            if(!hasClass(e.target, 'ipt')) {
                let items = Array.from(document.getElementsByClassName('ipt-wrap'))
                removeClass(items, 'focus-wrap')
            }
            
        })
    }
    
    render() {

        

        let {tabIndex, phone_1ErrInfo, phone_2ErrInfo,pwdErrInfo, codeErrInfo,codeAsideText} = this.state
        return (
            <div id="wrap">
                <div className="sign-wrap sign-wrap-v2">
                    <div className="sign-form sign-pwd" style={{display:'block'}}>
                        <div className="sign-content">
                            <div className="inner-box" >
                                <div class="sign-tab">
                                    <span 
                                    class={tabIndex===1?'link-signin cur': 'link-signin'} 
                                    onClick={this.setTab.bind(this, 1)}>密码登录</span>
                                    <span class={tabIndex===2?'link-sms cur': 'link-sms'}
                                    onClick={this.setTab.bind(this, 2)}>短信登录</span>
                                </div>
                                <div class="form-row row-select">
                                    <span class="ipt-wrap" onClick={this.handleClick}>
                                        <i class="icon-sign-phone"></i>
                                        <input type="tel" class="ipt ipt-phone required" placeholder="手机号" value={this.state['phone_'+tabIndex]} onChange={(e) => {
                                            this.changePhone(e,tabIndex)
                                        }}/>
                                    </span>
                                    <div className="tip-error" style={{display: (tabIndex===1?phone_1ErrInfo:phone_2ErrInfo)?'block':'none'}}>{tabIndex===1?phone_1ErrInfo:phone_2ErrInfo}</div>
                                </div>
                                <div class="form-row" style={{display: tabIndex===1?'block':'none'}}>
                                    <span class="ipt-wrap" onClick={this.handleClick}>
                                        <i class="icon-sign-pwd"></i>
                                        <input type="password" class="ipt ipt-pwd required"  placeholder="密码" autoComplete="off" value={this.state.password} onChange={this.changePwd}/>
                                    </span>
                                    <div className="tip-error" style={{display: pwdErrInfo?'block':'none'}}>{pwdErrInfo}</div>
                                </div>
                                <div className="form-row" style={{display: tabIndex===2?'block':'none'}}>
                                    <span className="ipt-wrap" onClick={this.handleClick}>
                                        <i className="icon-sign-sms"></i>
                                        <input type="text" className="ipt ipt-sms required" placeholder="短信验证码" name="phoneCode" maxLength="4"
                                         value={this.state.verifyCode}
                                         onChange={this.changeCode}
                                          />
                                        <button type="button" className={codeAsideText==="发送验证码"?"btn btn-sms":"btn btn-sms btn-disabled count-down"} onClick={this.getVerifyCode}>{codeAsideText}</button>
                                    </span>
                                    <div className="tip-error" style={{display: codeErrInfo?'block':'none'}}>{codeErrInfo}</div>
                                </div>
                                <div class="form-btn">
                                    <button class="btn" onClick={this.handleLogin}>登录</button>
                                </div>
                                <div class="text-tip">
                                    <a href="/register" class="link-signup">免费注册</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;