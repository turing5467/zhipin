import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {requestJobDetail, requestCPNDetail, requestGetUser, requestAddOneContactToChat} from '../../common/request';
import Cookie from 'js-cookie'
import {message} from 'antd'


function JobDetail(props) {
    const [job, setJobDetail] = useState({
        tag_more: [],
        contact: {}
    })
    const [cpn, setCPNDetail] = useState({
        business: {},
        desc: ''
    })
    const [showDesc, setShowDesc] = useState(false);
    const [phone, setPhone] = useState('');

    function toChat(ele) {
            if(!phone) {
                message.warning('请先登录哦~');
                return;
            }
            let chatMan = ele.contact;
            let chatJob = {
                code: ele.code,
                name: ele.name,
                salary: ele.salary,
                city: ele.city
            }
            let chatInfo = {
                chatMan,
                chatJob,
                chatCompany: ele.companyName,
                latestChatTime: Date.now()
            }
            requestAddOneContactToChat(phone, chatInfo).then(data => {
                window.location.href = '/chat'
            })
    }

    function getData() {
        let code = props.match.params.code;
        requestJobDetail(code).then(data => {
            
            setJobDetail(data.data)
            requestCPNDetail(data.data.companyCode).then(data => {
                setCPNDetail(data.data)
            })
        })
    }

    useEffect(() => {
        getData();

        let userId = Cookie.get('userId');
        if(!userId) {
            setPhone('')
        }else {
            requestGetUser(userId).then(data => {
                setPhone(data.user.phone)
            })
        }
    }, [])

    console.log('job_detail 组件 rendering');
        
    return (
        <div id="main" className="job-container">
            <div className="job-banner">
                <div className="inner home-inner">
                    <div className="job-primary detail-box">
                        <div className="info-primary">
                            <div className="job-status"><span>{job.status}</span></div>
                            <div className="name">
                                <h1>{job.name}</h1>
                                <span className="salary">{job.salary}</span>
                            </div>
                                <p>{job.city}<em className="dolt"></em>{job.experience}<em className="dolt"></em>{job.eduBG}</p>
                                <div className="tag-container">
                                    <div className="job-tags">
                                        {job.tag_more.map(ele => <span>{ele}</span>)}
                                    </div>
                                </div>
                        </div>
                        <div className="job-op">
                            <div className="btn-container">
                                <a className="btn btn-startchat" href="/chat" onClick={toChat.bind(this, {...job, companyName:cpn.name})}>立即沟通</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="job-box">
                <div className="inner home-inner">
                    <div className="job-sider">
                        <div className="sider-company">
                            <p className="title">公司基本信息</p>
                            <div className="company-info">
                                <a href={"/company/"+cpn.code} title={cpn.name} target="_blank">
                                        <img src={cpn.logo} alt="" />
                                </a>
                                <a  href={"/company/"+cpn.code}title={cpn.name} target="_blank">{cpn.name}</a>
                            </div>
                            <p><i className="icon-stage"></i>{cpn.finance}</p>
                            <p><i className="icon-scale"></i>{cpn.scale}</p>
                            <p><i className="icon-industry"></i>{cpn.industry}</p>
                            <p><i className="icon-net"></i>{cpn.link}</p>
                        </div>
                    </div>
                    <div className="job-detail">
                        <div className="detail-op">
                            <div className="btns">
                                <div className="op-links">
                                    <a href="#!"  className="link-like " code={job.code}>感兴趣</a>
                                    <a href="#!" className="link-report">举报</a>
                                </div>
                            </div>

                            <div className="detail-figure">
                                    <img src={job.contact.figure} alt=""/>
                            </div>
                            <h2 className="name">{job.contact.name}<i className="icon-vip"></i></h2>
                            <p className="gray">
                                {job.contact.post}<em className="vdot">·</em>{job.contact.status}
                            </p>
                        </div>
                        <div className="detail-content">
                            <div className="job-sec">
                                <h3>职位描述</h3>
                                <label  onClick={() => {
                                        setShowDesc(flag => !flag)
                                    }}><span>{showDesc?'收起':'展开'}</span><i className="fz fz-slidedown"></i></label>
                                <div className={showDesc?'text':'text fold-text'} dangerouslySetInnerHTML={{__html: job.desc}}>
                                </div>
                                
                            </div>
                            <div className="job-sec company-info">
                                <h3>公司介绍</h3>
                                <div className="text" dangerouslySetInnerHTML={{__html: cpn.desc.slice(0,cpn.desc.indexOf('<a'))}}></div>
                                <a href={"/company/"+cpn.code}target="_blank" className="look-all">查看全部</a>
                            </div>
                            <div className="job-sec">
                                <h3>工商信息</h3>
                                <div className="name">{cpn.business.name}</div>
                                <div className="level-list">
                                    <li><span>法人代表：</span>{cpn.business.LAR}</li>
                                    <li><span>注册资金：</span>2{cpn.business.registered_capital}</li>
                                    <li className="res-time"><span>成立时间：</span>{cpn.business.regiater_date}</li>
                                    <li className="company-type"><span>企业类型：</span>{cpn.business.type}</li>
                                    <li className="manage-state"><span>经营状态：</span>{cpn.business.status}</li>
                                </div>
                                <a href={"/company/"+cpn.code} target="_blank" className="look-all">查看全部</a>
                            </div>
                            <div className="job-sec">
                                <h3>工作地址</h3>
                                <div className="job-location">
                                    <div className="location-address">{cpn.address}</div>
                                    <div className="job-location-map js-open-map" data-content="厦门集美区厦门软件园3期B区">
                                        <img src={cpn.addressImg} alt="公司地址" />
                                        <p>点击查看地图</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default withRouter(JobDetail)