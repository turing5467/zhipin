import React, { Component } from 'react'
import InfoForm from '../../components/resume/userinfo'
import SuperiorityForm from '../../components/resume/superiority'
import InternForm from '../../components/resume/intern'
import ProjectForm from '../../components/resume/project'
import EducationForm from '../../components/resume/education'
import CertForm from '../../components/resume/certificate'
import UploadForm from '../../components/resume/upload'
import observer from '../../common/observer'
import {requestGetDetail, requestGetUser} from '../../common/request'
import Cookies from 'js-cookie'
import moment from 'moment'


class Resume extends Component {
    state = {
        showInfoForm: false,
        showSuperiorityForm: false,
        showInternForm: false,
        showProjectForm: false,
        showEducationForm: false,
        showCertForm: false,
        user: {
            intern: [{}],
            project: [{}],
            education: [{}],
            certificate: [],
            expect: {}
        }
    }

    tags = ['experience', 'degree', 'status', 'phone', 'weixin', 'mail']


    componentWillMount() {
        
        observer.addlisten('enShowInfoForm', () => {
            this.setState({showInfoForm:false})
        })
        observer.addlisten('enShowSuperiorityForm', () => {
            this.setState({showSuperiorityForm:false})
        })
        observer.addlisten('enShowInternForm', () => {
            this.setState({showInternForm:false})
        })
        observer.addlisten('enShowProjectForm', () => {
            this.setState({showProjectForm:false})
        })
        observer.addlisten('enShowEducationForm', () => {
            this.setState({showEducationForm:false})
        })
        observer.addlisten('enShowCertForm', () => {
            this.setState({showCertForm:false})
        })
        let id = Cookies.get('userId')
        requestGetUser(id).then(data => {
            
            requestGetDetail(data.user.phone).then(data => {
                
                this.setState({user: data.user})
                observer.trigger('getUser', data.user)
                observer.trigger('getSuperiority', data.user)
                observer.trigger('getPhone', data.user.phone)
                observer.trigger('getCert', data.user)
            })
        })
        
    }

    setAndTrigger(name) {
        this.setState({[name]:true})
        observer.trigger(name)
    }


    render() {
        let {tags} = this
        let {user,showInfoForm, showSuperiorityForm, showInternForm, showProjectForm, showEducationForm, showCertForm} = this.state
        this.pSpan = '' 
        for(let i = 0;i<6;) {
            this.pSpan += '<p>'
            for(let j = 0;j<3;){
                if(user[tags[i]]) {
                    this.pSpan += `<span class="prev-line">
                        <i class="fz-resume fz-${tags[i]}"></i>${user[tags[i]]}
                    </span>`;
                    j++
                }
                i++;
                if(i===6) {
                    break;
                }
            }
            this.pSpan+='</p>'
        }
        console.log(observer);
        
        

        return (
            <div id="main">
                <div id="container" className="resume-container inner">
                    <div className="resume-content">
                        <div className="resume-content-box">
                            <div className="resume-box">
                                <div id="userinfo" className="resume-item resume-userinfo">
                                    <div className="item-primary" style={{display: showInfoForm?'none':'block'}}>
                                        <div className="info-flex">
                                            <div className="info-flex-item">
                                                <h2 className="name">{user.name}<i className={user.gender==='女'?'fz-resume fz-female':'fz-resume fz-male'}></i></h2>
                                                <div className="info-labels" dangerouslySetInnerHTML={{__html: this.pSpan}}></div>
                                            </div>
                                            <div className="info-flex-item header-upload">
                                                <div className="header-box">
                                                    <div className="header-mask"></div><img src={user.avatar} className="header-img" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="op"><a href="javascript:;" className="link-edit" onClick={() => this.setAndTrigger('showInfoForm')}>
                                        <i className="fz-resume fz-edit"></i>
                                            <span>编辑</span></a></div>
                                    </div>
                                    <InfoForm />
                                </div>
                                <div id="summary" className="resume-item resume-summary" >
                                    <div className="item-primary advantage-show" style={{display: showSuperiorityForm?'none':'block'}}>
                                        <h3 className="title"> 个人优势 </h3>
                                        <ul>
                                            <li className=""><div className="primary-info">
                                                <div className="info-text advantage-text" onClick={() => this.setAndTrigger('showSuperiorityForm')}>{user.superiority}</div></div>
                                                <div className="op op-show">
                                                    <a href="javascript:;" ka="user-resume-edit-advantage" className="link-edit" onClick={() => this.setAndTrigger('showSuperiorityForm')}>
                                                        <i className="fz-resume fz-edit"></i><span>编辑</span>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <SuperiorityForm />
                                </div>
                                <div id="history" className="resume-item resume-history">
                                    <div className="item-primary" style={{display: showInternForm?'none':'block'}}>
                                        <h3 className="title"> 实习经历 <a href="javascript:;" className="link-add" onClick={() => {
                                                this.setAndTrigger('showInternForm')
                                                observer.trigger('getIntern',user.intern,-1)
                                            }}>
                                            <i className='fz-resume fz-add'></i>
                                            <span>添加</span></a>
                                        </h3>
                                        <ul>
                                            {user.intern.map((ele,index, arr) => (<li><div className="primary-info"><div className="info-text"><h4 className="name">{ele.CPNName}</h4><span className="gray period">{moment(new Date(ele.starttime).toLocaleDateString()).format('YYYY.MM')}-{moment(new Date(ele.endtime).toLocaleDateString()).format('YYYY.MM')}</span></div><h4><span className="prev-line">{ele.department}</span><span className="prev-line">{ele.jobName}</span></h4><div className="info-text"><span className="text-type">内容：</span>{ele.content}</div><div className="info-text"><span className="text-type">业绩：</span>{ele.profit}</div></div><div className="op"><a href="javascript:;" className="link-delete"><i className='fz-resume fz-delete'></i><span>删除</span></a>
                                                <a href="javascript:;" className="link-edit" onClick={() => {
                                                    this.setAndTrigger('showInternForm')
                                                    observer.trigger('getIntern',arr,index)
                                                }}><i className='fz-resume fz-edit' ></i><span>编辑</span></a></div>
                                                </li>))
                                            }
                                        </ul>
                                    </div>
                                    <InternForm />
                                </div>
                                <div id="project" className="resume-item resume-project">
                                    <div className="item-primary" style={{display: showProjectForm?'none':'block'}}>
                                        <h3 className="title"> 项目经历 <a href="javascript:;" className="link-add" onClick={()=>{
                                            this.setAndTrigger('showProjectForm')
                                            observer.trigger('getProject', user.project, -1)
                                        }}><i className="fz-resume fz-add"></i><span>添加</span></a>
                                        </h3>
                                        <ul>
                                            {user.project.map((ele,index,arr) => (<li><div className="primary-info"><i className="icon-garbage"></i><div className="info-text"><h4 className="name">{ele.name}</h4><span className="gray period">{moment(new Date(ele.starttime).toLocaleDateString()).format('YYYY.MM')}-{moment(new Date(ele.endtime).toLocaleDateString()).format('YYYY.MM')}</span></div><div className="info-text"><h4><span className="prev-line">{ele.job}</span></h4></div><div className="info-text"><span className="text-type">内容：</span>{ele.content}</div><div className="info-text"><span className="text-type">业绩：</span>{ele.profit}</div><div className="info-text"><span className="text-type">项目链接：</span>{ele.link}</div></div><div className="op"><a href="javascript:;" className="link-edit" onClick={()=>{
                                                this.setAndTrigger('showProjectForm');
                                                observer.trigger('getProject', arr, index)
                                            }}><i className="fz-resume fz-edit"></i><span>编辑</span></a></div>
                                            </li>))}
                                        </ul>
                                    </div>
                                    <ProjectForm />
                                </div>
                                <div id="education" className="resume-item resume-education">
                                    <div className="item-primary" style={{display: showEducationForm?'none':'block'}}>
                                        <h3 className="title"> 教育经历 <a href="javascript:;" className="link-add" onClick={()=>{
                                            this.setAndTrigger('showEducationForm')
                                            observer.trigger('getEducation', user.education, -1)
                                        }}><i className="fz-resume fz-add"></i><span>添加</span></a>
                                        </h3>
                                        <ul>
                                            {user.education.map((ele, index, arr) => (<li>
                                                <div className="primary-info">
                                                    <div className="info-text"><h4 className="name">{ele.school}</h4><span className="gray period">{ele.startYear}-{ele.endYear}</span></div><div className="info-text"><h4><span className="prev-line">{ele.specialty}</span><span className="prev-line">{ele.eduBG}</span></h4>
                                                    </div>
                                                    <div className="info-text">{ele.experience}</div>
                                                </div>
                                                <div className="op"><a href="javascript:;" className="link-edit" onClick={()=>{
                                                this.setAndTrigger('showEducationForm');
                                                observer.trigger('getEducation', arr, index)
                                            }}><i className="fz-resume fz-edit" ></i><span>编辑</span></a></div>
                                            </li>))}
                                        </ul>
                                    </div>
                                    <EducationForm />
                                </div>
                                <div id="certification" className="resume-item resume-certification">
                                    <div className="item-primary">
                                        <h3 className="title"> 资格证书 <a href="javascript:;" className="link-add" onClick={() => {
                                            this.setAndTrigger('showCertForm')
                                        }}><i className="fz-resume fz-add"></i><span>添加</span></a></h3><ul><li ka="edit-certificate-click" className=""><div className="primary-info"><div className="visible-wrap"><div>
                                            {user.certificate.map(ele => (<span className="resume-cert-tag">{ele}</span>))}</div></div></div><div className="op"><a href="javascript:;" ka="edit-certificate-click" className="link-edit" onClick={() => {
                                            this.setAndTrigger('showCertForm')
                                        }}><i className="fz-resume fz-edit"></i><span>编辑</span></a></div></li></ul></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="user-sider">
                        <UploadForm />
                    </div>
                </div>
                <CertForm />
            </div>
        )
    }
}

export default Resume
