import React, { Component } from 'react'
import {requestJobList, requestCPNDetail, requestAddOneContactToChat, requestGetUser} from '../../common/request';
import { Pagination, message } from 'antd';
import observer from '../../common/observer';
import Cookie from 'js-cookie';
import LazyLoad from 'react-lazyload'

export default class JobList extends Component {
    state = {
        jobList: [{contact: {},tag_more: []}],
        CPNList:[{}],
        total: 0,
        canSubmit: false,
        level: 0,
        feedback: '',
        condition: [],
        phone: ''
    }
    getJobList(page, condition) {
        // console.log(condition);
        
        requestJobList(page, {$and: condition}).then((data) => {
            console.log('data', data);
            
            this.setState({jobList: data.list, total: data.total, CPNList: data.list && data.list.map(ele => ({}))}, () => {
                let {jobList, CPNList} = this.state
                for(let i = 0;i<jobList.length;i++) {
                    let code = jobList[i].companyCode
                    
                    requestCPNDetail(code).then(data => {
                        CPNList[i] = data.data || {};
                        this.setState({CPNList})
                        
                    })
                }
                
            })
        })
    }
    handlePage = (page) => {
        let {condition} = this.state
        this.getJobList(page, condition)
        window.location.reload()
        window.scrollTo(0,0)
    }
    handleFeedBack(e, level){
        
        let index = e.target.className.indexOf('select');
        if(index === -1) {
            e.target.parentNode.childNodes.forEach(ele => {
                if(ele.className.indexOf('selected')!==-1) {
                    ele.className = ele.className.slice(0,-9);
                }
            })
            e.target.className += " selected";
            this.setState({canSubmit: true, level})
        }else {
            e.target.className = e.target.className.slice(0,-9);
            this.setState({canSubmit: false, level});
        }
    }
    onFeedBack = (e) => {
        this.setState({feedback: e.target.value})
        
    }
    componentWillMount() {
        observer.addlisten('setCity', (city) => {
            
            let {condition} = this.state
            let i = condition.findIndex(ele => ele.city !== undefined)
            if(city==='全国') {
                condition.splice(i,1)
                // delete condition['city']
            }else {
                if(i === -1) {
                    condition.push({city})
                }else {
                    condition[i] = {city}
                }
            }
            
            this.setState({condition})  
            this.getJobList(1, condition)
        })
        observer.addlisten('setSearch', (search) => {
            
            if(search === '') return;
            let {condition} = this.state;
            let i =  condition.findIndex(ele => ele.name !== undefined)
            if(i===-1) {
                condition.push({name: {$regex: search}})
            }else {
                condition[i] = {name: {$regex: search}}
            }
            this.setState({condition})  
            this.getJobList(1, condition)
        })

        observer.addlisten('setCondition', (condition) => {
            if(!condition) {
                //清空筛选条件
                this.getJobList(1, [{}])
            }else {
                condition = [...this.state.condition, ...condition];
                // this.setState({condition})  
                this.getJobList(1, condition)
            }
        })

        this.getJobList();
        let userId = Cookie.get('userId');
        if(!userId) {
            this.setState({phone:''})
        }else {
            requestGetUser(userId).then(data => {
                this.setState({phone: data.user.phone})
            })
        }
    }

    toChat = (event, ele) =>{
        event.stopPropagation();
        
        let {phone} = this.state
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
            // window.location.href = '/chat'
        })
    }

    render() {
        let {jobList,CPNList,  total, canSubmit} = this.state;
        
        return (
            <div id="main">
                <div className="inner">
                <div className="job-list">
                <ul>
                    {jobList.map((ele,i) => <li key={ele.code}>
                        <div className="job-primary">
                            <div className="info-primary">
                            <div className="primary-wrapper">
                                            <a className="primary-box" href={"/job_detail/"+ele.code} data-jid={ele.code} target="_blank">
                                                <div className="job-title">
                                                    <span className="job-name">{ele.name}</span>
                                                </div>
                                                <div className="job-limit clearfix">
                                                    <span className="red">{ele.salary}</span>
                                                    <p>{ele.experience}<em className="vline"></em>{ele.eduBG}</p>
                                                    <div className="info-publis">
                                                        <h3 className="name"><img className="icon-chat" src="https://z.zhipin.com/web/geek/resource/icon-chat-v2.png"/>{ele.contact.name}<em className="vline"></em>{ele.contact.post}</h3>
                                                    </div>
                                                    <button className="btn btn-startchat" href={"/job_detail/"+ele.code} >
                                                        <img className="icon-chat icon-chat-hover" src="https://z.zhipin.com/web/geek/resource/icon-chat-hover-v2.png" alt=""/>
                                                        <span onClick={(event) => {
                                                            this.toChat(event, {...ele, companyName: CPNList[i].name});
                                                        }}>立即沟通</span>
                                                    </button>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="info-company">
                                            <div className="company-text">
                                                <h3 className="name"><a href={"/company/"+ele.companyCode} target="_blank">{CPNList[i].name}</a></h3>
                                                <p>{CPNList[i].industry}<em className="vline"></em>{CPNList[i].finance}<em className="vline"></em>{CPNList[i].scale}</p>
                                            </div>
                                            <a href={"/company/"+ele.companyCode} target="_blank">
                                                <LazyLoad height={54}>
                                                <img className="company-logo" src={CPNList[i].logo} alt=""/>
                                                </LazyLoad>
                                                </a>
                                        </div>
                            </div>
                            <div className="info-append clearfix">
                                <div className="info-desc">{ele.tag_more.join(',')}</div>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <Pagination defaultCurrent={1} total={total} pageSize={20} showSizeChanger={false} onChange={this.handlePage}/>
                </div>
                {/* 反馈框 */}
            <div className="satisfaction-feedback">
                <b className="title">对搜索结果是否满意?</b>
                <div className="satisfaction level-2" data-level="1" onClick={(e)=> this.handleFeedBack(e, 1)}>不满意</div>
                <div className="satisfaction level-3" data-level="2" onClick={(e)=> this.handleFeedBack(e, 2)}>一般</div>
                <div className="satisfaction level-4" data-level="3" onClick={(e)=> this.handleFeedBack(e, 3)}>满意</div>
                <textarea className="ipt" name="feedback" placeholder="请填写更多反馈建议..." value={this.state.feedback} onChange={this.onFeedBack}></textarea>
                <button className={canSubmit?"btn":"btn disabled"} onClick={()=>{
                    if(canSubmit) {
                        message.success('感谢反馈')
                    }else {
                        return false;
                    }
                }}>提交</button>
            </div>
                </div>
                
                
            </div>
        )
    }
}
