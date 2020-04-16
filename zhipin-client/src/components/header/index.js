import React, { Component } from 'react';
import logo from '../../assets/logo-2x.png'
import BHeader from './css';
import {
    NavLink
  } from "react-router-dom";
import {connect} from 'react-redux';
import {login} from '../../store/actions'
import Cookies from 'js-cookie';
import {requestGetUser, requestGetDetail} from '../../common/request'



 class Header extends Component {
    constructor(props) {
        super(props);
        
        this.userId = Cookies.get('userId')
        this.props.login(this.userId?this.userId:false)
        
    }
    state = {
        user: {}
    }

    handleNav = (e) => {
        console.log(e);
    }

    componentWillMount() {

        this.userId && requestGetUser(this.userId).then(data => {
            requestGetDetail(data.user.phone).then(data => {
                this.setState({
                    user: {
                        avatar: data.user.avatar,
                        name: data.user.name
                    }
                })
            })
        })
    }
    
    render() {
        let {user} = this.state
        
        return (
            <BHeader logo={logo}>
                <div id="header" className='inner'>
                    {/* <div className='logo'>
                        <a href="https://www.zhipin.com/" title="BOSS直聘"><span>BOSS直聘</span></a>
                    </div> */}
                    <div className="nav">
                        <ul>
                            <li><NavLink to="/" exact activeClassName='cur'>首页</NavLink></li>
                            <li><NavLink to="/jobs" activeClassName='cur'>职位</NavLink></li>
                            <li><NavLink to="/company" activeClassName='cur'>公司</NavLink></li>
                        </ul>
                    </div>
                    <div className="user-nav">
                        <div class="btns" style={{display: this.props.isLogin?'none':'block'}}>
                            <a href="/resume" ka="nlp_resume_upload" class="link-sign-resume" title="上传简历，解析内容，完善注册">上传简历</a>
                            <a href="/login" class="link-sign-resume" title="上传简历，解析内容，完善注册">我要找工作<span class="new" style={{display: 'inline-block'}}>hot</span></a>
                            <a href="/register" class="btn btn-outline">注册</a>
                            <a href="/login" class="btn btn-outline">登录</a>
                        </div>
                        <ul onClick={(e) => this.handleNav(e)} style={{display: !this.props.isLogin?'none':'block'}}>
                            
                            
                            <li><NavLink to="/resume" activeClassName='cur'>简历</NavLink></li>
                            <li class="nav-figure">
                                <a href="/jobs">
                                    <span class="label-text">{user.name}</span><img src={user.avatar} alt="" />
                                </a>
                                <div class="dropdown">
                                    <a href="/setting" >账号设置<span>修改密码等</span></a>
                                    <a href="/login" class="link-logout">退出登录</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </BHeader>
        )
    }
}

export default connect(
    state => ({
            isLogin: state.isLogin,
            user: state.user
        })
    ,
    {login}
)(Header);



