import React, { Component } from 'react'
import InfoForm from '../../components/resume/userinfo'
import SuperiorityForm from '../../components/resume/superiority'
import InternForm from '../../components/resume/intern'
import ProjectForm from '../../components/resume/project'
import EducationForm from '../../components/resume/education'
import UploadForm from '../../components/resume/upload'
import observer from '../../common/observer'
import {requestGetDetail, requestGetUser, uploadAvatarURL, requestUpdateDetail} from '../../common/request'
import Cookies from 'js-cookie'
import moment from 'moment'
import {Upload, message} from 'antd'


class Resume extends Component {
    state = {
        phone: '',
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


    componentDidMount() {
        
        observer.addlisten('enShowInfoForm', () => {
            this.setState({showInfoForm:false})
            this.getDetail();
        })
        observer.addlisten('enShowSuperiorityForm', () => {
            this.setState({showSuperiorityForm:false})
            this.getDetail();
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
            
            let phone = data.user.phone;
            this.setState({phone}, this.getDetail)
            
        })
        
    }

    getDetail = () => {
        let {phone} = this.state;
        requestGetDetail(phone).then(data => {
                
            this.setState({user: data.user})
            observer.trigger('getUser', data.user)
            observer.trigger('getSuperiority', data.user)
            observer.trigger('getPhone', phone)
        })
    }

    setAndTrigger(name) {
        this.setState({[name]:true})
        observer.trigger(name)
    }

    constructor(props) {
        super(props);
        requestGetUser(Cookies.get('userId')).then(data => {
            this.phone = data.user.phone;
            this.options = {
                name: 'avatar',
                action: uploadAvatarURL,
                onChange(info){
                    
                    if (info.file.status === 'done') {
                        message.success('上传成功');
                        window.location.reload()
                        console.log(info);
                        
                    } else if (info.file.status === 'error') {
                        message.error('上传失败，请稍后再试');
                    }
                 
                },
                data: {
                    phone: this.phone
                },
                showUploadList: false,
                beforeUpload(file) {
                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                      message.error('只允许上传JPG/PNG类型的文件');
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      message.error('图片文件不得大于2M');
                    }
                    return isJpgOrPng && isLt2M;
                  }
            }
        })
    }

    removeItem = (arrName, index) =>{
        //请求至服务端
        let flag = window.confirm('确定要删除该经历吗？删除后不可恢复')
        if(!flag) {
            return;
        }
        let {user, phone} = this.state;
        user[arrName].splice(index,1);
        requestUpdateDetail(phone, {[arrName]: user[arrName]}).then((data) => {
            if(data.nModified === 1) {
                message.success('删除成功')
            }
            
        })
        
        //刷新页面
        this.forceUpdate();
    }


    render() {
        console.log('resume组件 Rendering');
        
        let {tags} = this
        let {user,showInfoForm, showSuperiorityForm, showInternForm, showProjectForm, showEducationForm} = this.state
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
                                                    <Upload {...this.options}>
                                                    <div className="header-mask">
                                                    </div>
                                                    </Upload>
                                                    <img src={user.avatar} className="header-img" />
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
                                            {user.intern.map((ele,index, arr) => (<li key={ele.CPNName}><div className="primary-info"><div className="info-text"><h4 className="name">{ele.CPNName}</h4><span className="gray period">{moment(new Date(ele.starttime).toLocaleDateString()).format('YYYY.MM')}-{moment(new Date(ele.endtime).toLocaleDateString()).format('YYYY.MM')}</span></div><h4><span className="prev-line">{ele.department}</span><span className="prev-line">{ele.jobName}</span></h4><div className="info-text"><span className="text-type">内容：</span>{ele.content}</div><div className="info-text"><span className="text-type">业绩：</span>{ele.profit}</div></div><div className="op"><a href="javascript:;" onClick={()=>{this.removeItem('intern', index)}}    className="link-delete"><i className='fz-resume fz-delete'></i><span>删除</span></a>
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
                                            {user.project.map((ele,index,arr) => (<li key={ele.name}><div className="primary-info" ><i className="icon-garbage"></i><div className="info-text"><h4 className="name">{ele.name}</h4><span className="gray period">{moment(new Date(ele.starttime).toLocaleDateString()).format('YYYY.MM')}-{moment(new Date(ele.endtime).toLocaleDateString()).format('YYYY.MM')}</span></div><div className="info-text"><h4><span className="prev-line">{ele.job}</span></h4></div><div className="info-text"><span className="text-type">内容：</span>{ele.content}</div><div className="info-text"><span className="text-type">业绩：</span>{ele.profit}</div><div className="info-text"><span className="text-type">项目链接：</span>{ele.link}</div></div><div className="op"><a href="javascript:;" onClick={()=>{this.removeItem('project', index)}}    className="link-delete"><i className='fz-resume fz-delete'></i><span>删除</span></a><a href="javascript:;" className="link-edit" onClick={()=>{
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
                                            {user.education.map((ele, index, arr) => (<li key={ele.school}>
                                                <div className="primary-info">
                                                    <div className="info-text"><h4 className="name">{ele.school}</h4><span className="gray period">{ele.startYear}-{ele.endYear}</span></div><div className="info-text"><h4><span className="prev-line">{ele.specialty}</span><span className="prev-line">{ele.eduBG}</span></h4>
                                                    </div>
                                                    <div className="info-text">{ele.experience}</div>
                                                </div>
                                                <div className="op">
                                                <a href="javascript:;" onClick={()=>{this.removeItem('education', index)}}    className="link-delete"><i className='fz-resume fz-delete'></i><span>删除</span></a><a href="javascript:;" className="link-edit" onClick={()=>{
                                                this.setAndTrigger('showEducationForm');
                                                observer.trigger('getEducation', arr, index)
                                            }}><i className="fz-resume fz-edit" ></i><span>编辑</span></a></div>
                                            </li>))}
                                        </ul>
                                    </div>
                                    <EducationForm />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-sider">
                        <UploadForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default Resume
