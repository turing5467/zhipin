import React, { useState, useEffect } from 'react'
import {hasClass, addClass, removeClass, randomNumber} from '../../common/util'
import {message} from 'antd'
import Cookies from 'js-cookie'
import {requestLogin} from '../../common/request'


export default function Login(props) { 

    const [tabIndex, setTabIndex] = useState(1)
    const [phone_1, setPhone_1] = useState('')
    const [phone_2, setPhone_2] = useState('')
    const [password, setPassword] = useState('')
    const [codeAsideText, setCodeAsideText] = useState('发送验证码')
    const [curCode, setCurCode] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [phone_1ErrInfo, setPhone_1ErrInfo] = useState('')
    const [phone_2ErrInfo, setPhone_2ErrInfo] = useState('')
    const [pwdErrInfo, setPwdErrInfo] = useState('')
    const [codeErrInfo, setCodeErrInfo] = useState('')

    useEffect(() => {
        Cookies.remove('userId');
    }, [])

    useEffect(() => {
        function fn(e) {
            if(!hasClass(e.target, 'ipt')) {
                let items = Array.from(document.getElementsByClassName('ipt-wrap'))
                removeClass(items, 'focus-wrap')
            }
            
        }
        document.addEventListener('click', fn)
        return () => {
            document.removeEventListener('click', fn)
        }
    }, [])

    const setTab = (index) => {
        
        setTabIndex(index)
        setPassword('')
    }

    

    const changePhone = (e, index) => {
        let v = e.target.value;
        index === 1 && setPhone_1(v)
        index === 2 && setPhone_2(v)
    }
    const changePwd = (e) => {
        setPassword(e.target.value)
    }
    const changeCode = (e) => {
        setVerifyCode(e.target.value);
    }

    const handleLogin = () => {
        let index = tabIndex;
        if(index === 1) {
            //密码登录
            if(phone_1.match(/^1[3-9]\d{9}$/)) {
                if(password === '') {
                    setPwdErrInfo('请输入密码！')
                    return;
                }
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
                            setPhone_1ErrInfo('手机号未注册');
                            break;
                        case -2:
                            setPwdErrInfo('密码错误');
                            break;
                        default:
                            break;
                    }})
            }else {
                setPhone_1ErrInfo('请正确填写手机号')
            }
        }else {
            //短信登录
            if(verifyCode === curCode) {
                setCodeErrInfo('');
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
                            setPhone_2ErrInfo('手机号未注册')
                            break;
                        default:
                            break
                    }
                })
            }else {
                setCodeErrInfo('验证码错误')
            }
        }
    }

    const getVerifyCode = () => {
        let code = randomNumber(1000,9999).toString()
        console.log(code);
        
        if(phone_2.match(/^1[3-9]\d{9}$/)) {

            //发送验证码

            setCurCode(code)
            setCodeAsideText('请稍后')
            setPhone_2ErrInfo('');
            // 5min后验证码失效
            setTimeout(() => {
                setCurCode('')
            }, 1000*60*5)

            //修改codeAsideText
            let i = 60;
            let timer = setInterval(() => {
                i--;
                setCodeAsideText('已发送'+i+'秒')
                if(i===0) {
                    setCodeAsideText('发送验证码')
                    clearInterval(timer)
                }
            }, 1000);
        }else {
            setPhone_2ErrInfo('请正确填写手机号')
        }
    }

    const handleClick = (e) => {
        
        let items = Array.from(document.getElementsByClassName('ipt-wrap'))
        removeClass(items, 'focus-wrap')
        addClass(e.currentTarget, 'focus-wrap')
    }

    console.log('login 组件 rendering');
    return (
        <div id="wrap">
            <div className="sign-wrap sign-wrap-v2">
                <div className="sign-form sign-pwd" style={{display:'block'}}>
                    <div className="sign-content">
                        <div className="inner-box" >
                            <div className="sign-tab">
                                <span 
                                className={tabIndex===1?'link-signin cur': 'link-signin'} 
                                onClick={setTab.bind(this, 1)}>密码登录</span>
                                <span className={tabIndex===2?'link-sms cur': 'link-sms'}
                                onClick={setTab.bind(this, 2)}>短信登录</span>
                            </div>
                            <div className="form-row row-select">
                                <span className="ipt-wrap" onClick={handleClick}>
                                    <i className="icon-sign-phone"></i>
                                    <input type="tel" className="ipt ipt-phone required" placeholder="手机号" value={tabIndex===1?phone_1:phone_2} onChange={(e) => {
                                        changePhone(e,tabIndex)
                                    }}/>
                                </span>
                                <div className="tip-error" style={{display: (tabIndex===1?phone_1ErrInfo:phone_2ErrInfo)?'block':'none'}}>{tabIndex===1?phone_1ErrInfo:phone_2ErrInfo}</div>
                            </div>
                            <div className="form-row" style={{display: tabIndex===1?'block':'none'}}>
                                <span className="ipt-wrap" onClick={handleClick}>
                                    <i className="icon-sign-pwd"></i>
                                    <input type="password" className="ipt ipt-pwd required"  placeholder="密码" autoComplete="off" value={password} onChange={changePwd}/>
                                </span>
                                <div className="tip-error" style={{display: pwdErrInfo?'block':'none'}}>{pwdErrInfo}</div>
                            </div>
                            <div className="form-row" style={{display: tabIndex===2?'block':'none'}}>
                                <span className="ipt-wrap" onClick={handleClick}>
                                    <i className="icon-sign-sms"></i>
                                    <input type="text" className="ipt ipt-sms required" placeholder="短信验证码" name="phoneCode" maxLength="4"
                                        value={verifyCode}
                                        onChange={changeCode}
                                        />
                                    <button type="button" className={codeAsideText==="发送验证码"?"btn btn-sms":"btn btn-sms btn-disabled count-down"} onClick={getVerifyCode}>{codeAsideText}</button>
                                </span>
                                <div className="tip-error" style={{display: codeErrInfo?'block':'none'}}>{codeErrInfo}</div>
                            </div>
                            <div className="form-btn">
                                <button className="btn" onClick={handleLogin}>登录</button>
                            </div>
                            <div className="text-tip">
                                <a href="/register" className="link-signup">免费注册</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 }
