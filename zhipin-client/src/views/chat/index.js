import React, { Component } from 'react'
import {requestGetDetail, requestGetUser, socketURL, requestDownloadResume} from '../../common/request'
import {getGapTime} from '../../common/util'
import Cookie from 'js-cookie'
import $ from 'jquery';


export default class Chat extends Component {

    state = {
        chatInfo: [],
        phone: '',
        selected: 0,
        curMsg: '',
        ws: null,
        showResumePanel: false
    }
    componentWillMount(){
        this.createConnection();
        let userId = Cookie.get('userId');
        requestGetUser(userId).then(data => {
            let phone = data.user.phone;
            requestGetDetail(phone).then(data => {
                this.setState({phone, chatInfo: data.user.chatInfo,
                    
                })
            })
        })
        $(document).on("click",'.download-resume', 
            function(e){ 
                console.log(e);
                let phone = e.currentTarget.dataset.phone;
                requestDownloadResume(phone).then((path) => {
                    // console.log(path);
                    //下载简历
                    window.location.href = path
                })
        }); 
        
        
    }

    componentDidMount() {
        
    }

    StampToTimeOrDate = (stamp) => {
        let date = new Date(stamp)
        let cur_d = new Date();
        let {d} = getGapTime(date, cur_d)

        // if(y>0 || m>0 ) return;
        if(d===0) {
            return date.toLocaleTimeString().slice(2,-3)
        }else if(d===1) {
            return '昨天'
        }else if(d===2) {
            return '前天'
        }else {
            return d+'天前'
        }
    }

    changeText = (e) => {

        let msg =  e.target.innerHTML

        //回车
        if(e.keyCode === 13) {
            //发送
            this.sendMsg(msg);
        }
        
       
        this.setState({canSent: msg!=='',curMsg: msg})

    }

    sendMsg = (msg) => {
        //清空输入框
        $('.chat-input').html('');
        let {ws} = this.state;
        ws.send(msg)
        this.chat(msg, true);
    }

    createConnection = () => {
        //建立ws连接
        let ws = new WebSocket(socketURL);
        
        ws.onmessage = (res) => {
            this.chat(res.data, false);
            
        }
        this.setState({ws})
    }

    chat = (content, flag, callback) => {
        let {chatInfo, selected} = this.state;
        let sendTime = Date.now();
        chatInfo[selected].chatHistory.push({
            content,
            sendTime,
            isMyMsg: flag
        })
        chatInfo[selected].latestChatTime = sendTime;
        this.forceUpdate();
        this.scrollToBottom();
        // callback && callback()
    }

    //确认发送简历吗
    sureToSendResume = (flag) => {
        let phone = this.state.phone
        this.setState({showResumePanel: false})
        if(flag === true) {
            let src = 'https://i.bmp.ovh/imgs/2020/05/1cd5119d9ddb74b8.png';
            
            this.chat(`<div data-phone=${phone} class="download-resume"><img src=${src} class="download-resume-img"/>点击下载简历</div>`, true)
        }
    }

    scrollToBottom = () => {
        setTimeout(() => {
            let box = $('.chat-message')
            box.get(0) && box.eq(0).scrollTop(box.get(0).scrollHeight);
        }, 300)
    }

    render() {
        
        let {chatInfo, selected, canSent, showResumePanel} = this.state;
        let curChat = chatInfo[selected] || {chatMan: {}, chatJob: {}, chatCompany: '', chatHistory: []}
        
        return (
            <div id="wrap" className="chat">
                <div className="chat-container page-container">
                    <div className="chat-wrap">
                        <div>
                            <div className="chat-user">
                                <div class="article">最近联系人</div>
                                <div className="user-list">
                                    <ul>
                                        {chatInfo.length>0 && chatInfo.map((ele,i) => (
                                        <li className={selected === 1?'selected': ''}>
                                            <div class="figure">
                                                <img src={ele.chatMan.figure} draggable={false} />
                                            </div>
                                            <div class="text">
                                                <div class="title">
                                                    <span class="time">{this.StampToTimeOrDate(ele.latestChatTime)}</span>
                                                    <span class="name">{ele.chatMan.name}</span>
                                                    <p class="gray">{ele.chatCompany}<i class="vline"></i>{ele.chatMan.post}</p>
                                                </div>
                                                {/* <span class="notice-badge" style="display: none;">0</span> */}
                                            </div>
                                        </li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="chat-record">
                            {/* HR信息 */}
                            <div class="article">
                                <p class="fl" >
                                    <span>{curChat.chatMan.name}</span>
                                    <span>{curChat.chatCompany}</span>
                                    <i class="vline"></i><span>{curChat.chatMan.post}</span>
                                </p>
                            </div>
                            {/* 职位信息 */}
                            <div class="chat-position-bar">
                                <a href={'/job_detail/'+ curChat.chatJob.code} target="_blank">
                                    <span>沟通职位</span>
                                    <span class="bar-position-name">{curChat.chatJob.name}</span>
                                    <span>{curChat.chatJob.salary}</span>
                                    <span>{curChat.chatJob.city}</span>
                                </a>
                            </div>
                            {/* 聊天记录 */}
                            <div className="chat-message">
                                <ul>
                                    {
                                        curChat.chatHistory.length>0 && curChat.chatHistory.map(ele => (
                                            <li class={ele.isMyMsg?"item-myself" : "item-friend"}>
                                                <span class="time">{this.StampToTimeOrDate(ele.sendTime)}</span>
                                                <div class="message-text">
                                                    <div class="figure">
                                                        <img draggable="false" src={curChat.chatMan.figure} style={{display: ele.isMyMsg?'none':'block'}}/>
                                                    </div>
                                                    <div class="text">
                                                        <p dangerouslySetInnerHTML={{__html: ele.content}}></p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="chat-im chat-editor">
                                <div class="sentence-popover panel-resume" style={{display: showResumePanel?'block':'none'}}>
                                    <div><p class="title">确定向 Boss 发送简历吗？</p>
                                    <div class="content"><p>Boss确认后，该附件简历将直接发送至对方邮箱</p></div>
                                        <div class="btns">
                                            <span class="btn btn-cancel" onClick={this.sureToSendResume.bind(this,false)}>取消</span>
                                            <span class="btn btn-primary btn-sure" onClick={this.sureToSendResume.bind(this, true)}>确定</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="chat-controls">
                                    {/* <a href="javascript:;" aria-label="表情" class="btn-emotion tooltip tooltip-top"></a> */}
                                    {/* <a href="javascript:;" aria-label="常用语" class="btn-dict tooltip tooltip-top"></a> */}
                                    <a href="javascript:;" title="发送简历" aria-label="发简历" class="btn-resume tooltip tooltip-top" onClick={() => {
                                        this.setState({showResumePanel: true})
                                    }}></a>
                                </div>
                                {/* 消息输入 */}
                                <div contenteditable="true" class="chat-input" onKeyUp={this.changeText}></div>
                                {/* 发送按钮 */}
                                <div class="chat-op"><span class="tip">按Enter键发送，按Shift+Enter键换行</span><button type="send" class={"btn btn-primary btn-send "+ (canSent?'':'disabled')} onClick={() => {
                                    this.sendMsg(this.state.curMsg)
                                }}>发送</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
