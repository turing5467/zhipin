import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {requestJobDetail, requestCPNDetail} from '../../common/request'

class JobDetail extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        JobDetail: {
            tag_more: [],
            contact: {}
        },
        CPNDetail: {
            business: {},
            desc: ''
        }
    }

    getData() {
        let code = this.props.match.params.code;
        requestJobDetail(code).then(data => {
            this.setState({JobDetail: data.data})
            requestCPNDetail(data.data.companyCode).then(data => {
                this.setState({CPNDetail: data.data})
            })
        })
    }

    componentWillMount() {
        this.getData()
    }

    componentDidMount() {
        console.log(this.state);
        
    }
    render() {

        

        let {JobDetail: job, CPNDetail: cpn} = this.state;

        
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
                                    <a className="btn btn-startchat" href="javascript:;" href={"/chat/"+job.contactCode}>立即沟通</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="job-box">
                    <div className="inner home-inner">
                        <div className="job-sider">
                            <div class="sider-company">
                                <p class="title">公司基本信息</p>
                                <div class="company-info">
                                    <a href={"/company/"+cpn.code} title={cpn.name} target="_blank">
                                            <img src={cpn.logo} alt="" />
                                    </a>
                                    <a  href={"/company/"+cpn.code}title={cpn.name} target="_blank">{cpn.name}</a>
                                </div>
                                <p><i class="icon-stage"></i>{cpn.finance}</p>
                                <p><i class="icon-scale"></i>{cpn.scale}</p>
                                <p><i class="icon-industry"></i>{cpn.industry}</p>
                                <p><i class="icon-net"></i>{cpn.link}</p>
                            </div>
                        </div>
                        <div className="job-detail">
                            <div class="detail-op">
                                <div class="btns">
                                    <div class="op-links">
                                        <a href="javascript:;"  class="link-like " code={job.code}>感兴趣</a>
                                        <a href="javascript:;" class="link-report">举报</a>
                                    </div>
                                </div>

                                <div class="detail-figure">
                                        <img src={job.contact.figure} alt=""/>
                                </div>
                                <h2 class="name">{job.contact.name}<i class="icon-vip"></i></h2>
                                <p class="gray">
                                    {job.contact.post}<em class="vdot">·</em>{job.contact.status}
                                </p>
                            </div>
                            <div className="detail-content">
                                <div class="job-sec">
                                    <h3>职位描述</h3>
                                    <div class="text" dangerouslySetInnerHTML={{__html: job.desc}}>
                                    </div>
                                </div>
                                <div class="job-sec company-info">
                                    <h3>公司介绍</h3>
                                    <div class="text" dangerouslySetInnerHTML={{__html: cpn.desc.slice(0,cpn.desc.indexOf('<a'))}}></div>
                                    <a href={"/company/"+cpn.code}target="_blank" class="look-all">查看全部</a>
                                </div>
                                <div class="job-sec">
                                    <h3>工商信息</h3>
                                    <div class="name">{cpn.business.name}</div>
                                    <div class="level-list">
                                        <li><span>法人代表：</span>{cpn.business.LAR}</li>
                                        <li><span>注册资金：</span>2{cpn.business.registered_capital}</li>
                                        <li class="res-time"><span>成立时间：</span>{cpn.business.regiater_date}</li>
                                        <li class="company-type"><span>企业类型：</span>{cpn.business.type}</li>
                                        <li class="manage-state"><span>经营状态：</span>{cpn.business.status}</li>
                                    </div>
                                    <a href={"/company/"+cpn.code} target="_blank" class="look-all">查看全部</a>
                                </div>
                                <div class="job-sec">
                                    <h3>工作地址</h3>
                                    <div class="job-location">
                                        <div class="location-address">{cpn.address}</div>
                                        <div class="job-location-map js-open-map" data-content="厦门集美区厦门软件园3期B区">
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
}

export default withRouter(JobDetail)