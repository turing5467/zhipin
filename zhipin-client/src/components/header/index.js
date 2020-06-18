import React, { useState, useEffect } from 'react';
// import logo from '../../assets/logo-2x.png'
// import BHeader from './css';
import {
    NavLink
  } from "react-router-dom";
import {connect} from 'react-redux';
import {login} from '../../store/actions'
import Cookies from 'js-cookie';
import {requestGetUser, requestGetDetail} from '../../common/request'


function Header(props) {
    
    const [user, setUser] = useState({})

    useEffect(() => {
        let userId = Cookies.get('userId')
        props.login(userId?userId:false)

        userId && requestGetUser(userId).then(data => {
            requestGetDetail(data.user.phone).then(data => {
                setUser({
                    avatar: data.user.avatar,
                    name: data.user.name
                })
            })
        })
    }, [])

    console.log('header 组件 rendering');
    return (

            <div id="header">
                <div className='inner'>
                <div className="nav">
                    <ul>
                        <li><NavLink to="/" exact activeClassName='cur'>首页</NavLink></li>
                        <li><NavLink to="/jobs" activeClassName='cur'>职位</NavLink></li>
                        <li><NavLink to="/company" activeClassName='cur'>公司</NavLink></li>
                    </ul>
                </div>
                <div className="user-nav">
                    <div className="btns" style={{display: props.isLogin?'none':'block'}}>
                        <a href="/login" ka="nlp_resume_upload" className="link-sign-resume" title="上传简历，解析内容，完善注册">上传简历</a>
                        <a href="/login" className="link-sign-resume" title="上传简历，解析内容，完善注册">我要找工作<span className="new" style={{display: 'inline-block'}}>hot</span></a>
                        <a href="/register" className="btn btn-outline">注册</a>
                        <a href="/login" className="btn btn-outline">登录</a>
                        <NavLink to="/register" className='btn btn-outline'>注册</NavLink>
                        <NavLink to="/login" className='btn btn-outline'>登录</NavLink>
                    </div>
                    <ul style={{display: !props.isLogin?'none':'block'}}>
                        
                        
                        <li><NavLink to="/chat" activeClassName='cur'>消息</NavLink></li>
                        <li><NavLink to="/resume" activeClassName='cur'>简历</NavLink></li>
                        <li className="nav-figure">
                            <a href="/jobs">
                                <span className="label-text">{user.name}</span><img src={user.avatar} alt="" />
                            </a>
                            <div className="dropdown">
                                <a href="/setting" >账号设置<span>修改密码等</span></a>
                                <a href="/login" className="link-logout">退出登录</a>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
    )

}

export default connect(
    state => ({
            isLogin: state.isLogin,
            user: state.user
        })
    ,
    {login}
)(Header);



