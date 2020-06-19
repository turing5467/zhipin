import React, { useState, useEffect, useCallback } from 'react'
import {randomNumber} from '../../common/util'
import {message} from 'antd'
import {requestRegister} from '../../common/request'
import Cookies from 'js-cookie';


export default function Register() {

   const [phone, setPhone] = useState('')
   const [phoneErrInfo, setPhoneErrInfo] = useState('')
   const [codeErrInfo, setCodeErrInfo] = useState('')
   const [checkedErrInfo, setCheckedErrInfo] = useState('')
   const [curCode, setCurCode] = useState('')
   const [verifyCode, setVerifyCode] = useState('')
   const [codeAsideText, setCodeAsideText] = useState('发送验证码')
   const [agreePolicyFlag, setAgreePolicyFlag] = useState(false)

   const changePhone = useCallback(
    (e) => {
        setPhone(e.target.value)
    },[])

    const changeCode = useCallback(
        (e) => {
            setVerifyCode(e.target.value)
        },[])

    const changeAgree = useCallback(
        (e) => {
            setAgreePolicyFlag(e.target.checked)
        }, [])

    const getVerifyCode = useCallback(
        () => {
            let code = randomNumber(1000,9999).toString()
            console.log(code);
            
            if(phone.match(/^1[3-9]\d{9}$/)) {
                //发送验证码
                setCurCode(code)
                setCodeAsideText('请稍后')
                setPhoneErrInfo('')
                // 5min后验证码失效
                setTimeout(() => {
                    setCurCode('')
                },1000*60*5)
    
                //修改getCodeText
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
                setPhoneErrInfo('请正确填写手机号')
            }
        },
        [phone],
    )

    const handleRegister = useCallback(
        () => {
            // let {curCode, verifyCode, phone} = this.state;
            
            //验证码是否正确
            if(curCode !== '' && curCode === verifyCode) {
                setCodeErrInfo('')
                
                //是否同意用户协议
                if(agreePolicyFlag){
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
                setCodeErrInfo('验证码错误')
            }
            
        },
        [curCode, verifyCode, agreePolicyFlag],
    )

    useEffect(() => {
        Cookies.remove('userId');
    }, [])

    console.log('register 组件 rendering');
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
                                    <input type="tel" className="ipt ipt-phone required" placeholder="手机号" value={phone} onChange={changePhone}/>
                                </span>
                                <div className="tip-error" style={{display: phoneErrInfo?'block':'none'}}>{phoneErrInfo}</div>
                            </div>
                            <div className="form-row">
                                <span className="ipt-wrap">
                                    <i className="icon-sign-sms"></i>
                                    <input type="text" className="ipt ipt-sms required" placeholder="短信验证码" name="phoneCode" maxLength="4"
                                        value={verifyCode}
                                        onChange={changeCode}/>
                                    <button type="button" className={codeAsideText==="发送验证码"?"btn btn-sms":"btn btn-sms btn-disabled count-down"} onClick={getVerifyCode}>{codeAsideText}</button>
                                </span>
                                <div className="tip-error" style={{display: codeErrInfo?'block':'none'}}>{codeErrInfo}</div>
                            </div>
                            <div className="form-btn">
                                <button className="btn" onClick={handleRegister}>注册</button>
                            </div>
                            <div className="text-tip">
                                <div className="tip-error">{checkedErrInfo}</div>
                                <input type="checkbox" className="agree-policy" onChange={changeAgree}/>我已同意用户协议及隐私政策
                                <a href="/login" className="link-signin">直接登录</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>   
        </div>
    )
}