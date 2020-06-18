import React, { useState, useEffect, useMemo } from 'react'
import {requestGetDetail, requestGetUser, socketURL, requestDownloadResume} from '../../common/request'
import {getGapTime} from '../../common/util'
import Cookie from 'js-cookie'
import $ from 'jquery';
import { message } from 'antd';

export default function Chat() { 
    const [chatInfo, setChatInfo] = useState([])
    const [phone, setPhone] = useState('')
    const [selected, setSelected] = useState(0)
    const [curMsg, setCurMsg] = useState('')
    const [resumePath, setResumePath] = useState('')
    const [ws, setWS] = useState(null);
    const [showResumePanel, setShowResumePanel] = useState(false)
    const curChat = useMemo(() => {
        return chatInfo[selected] || {chatMan: {}, chatJob: {}, chatCompany: '', chatHistory: []}
    })

    const scrollToBottom = () => {
        setTimeout(() => {
            $('.chat-message img:last').get(0).scrollIntoView()
        }, 300)
    }

    const StampToTimeOrDate = (stamp) => {
        
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

    const changeText = (e) => {

        let msg =  e.target.innerHTML

        //回车
        // if(e.keyCode === 13) {
        //     this.sendMsg(msg);
        // }
        
        setCurMsg(msg)

    }

    const sendMsg = (msg) => {
        //清空输入框
        if(msg === '') {
            message.warn('输入信息不得为空')
            return;
        }
        $('.chat-input').html('');
        ws.send(msg)
        chat(msg, true);
    }

    const chat = (content, flag) => {
        let sendTime = Date.now();
        chatInfo[selected].chatHistory.push({
            content,
            sendTime,
            isMyMsg: flag
        })
        chatInfo[selected].latestChatTime = sendTime;
        setChatInfo(chatInfo);

        scrollToBottom();
    }

    const sureToSendResume = (flag) => {
        console.log(flag);
        
        setShowResumePanel(false)
        if(flag === true) {
            if(resumePath) {
                let src = 'https://i.bmp.ovh/imgs/2020/05/1cd5119d9ddb74b8.png';
            
                chat(`<div data-phone=${phone} class="download-resume"><img src=${src} class="download-resume-img"/>点击下载简历</div>`, true)
            }
            else {
                message.warn('您还没有上传简历哦，请先上传简历')
                return;
            }
            
        }else {
            return ;
        }
    }

    useEffect(() => {
        //建立ws连接
        let ws = new WebSocket(socketURL);
        
        ws.onmessage = (res) => {
            chat(res.data, false);
            
        }
        setWS(ws)
        return () => {
            ws.close()
        }
    }, [])

    //拿到手机号
    useEffect(() => {
        let userId = Cookie.get('userId');
        requestGetUser(userId).then(data => {
            let phone = data.user.phone;
            setPhone(phone);
            requestGetDetail(phone).then(data => {
                setChatInfo(data.user.chatInfo);
            })
        })
    }, [])

    useEffect(() => {
        $(document).on("click",'.download-resume', 
            function(e){
                window.location.href = resumePath
        }); 
        return () => {
            $(document).off('click', '.download-resume')
        }
    }, [resumePath])

    useEffect(() => {
        requestDownloadResume(phone).then((path) => {
            
            setResumePath(path.indexOf('undefined') !== -1?'':path)
        })
    }, [phone])

    console.log('chat组件 Rendering');
    return (
        <div id="wrap" className="chat">
            <div className="chat-container page-container">
                <div className="chat-wrap">
                    <div>
                        <div className="chat-user">
                            <div className="article">最近联系人</div>
                            <div className="user-list">
                                <ul>
                                    {chatInfo.length>0 && chatInfo.map((ele,i) => (
                                    <li key={ele.chatJob.code} className={selected === i?'selected': ''} onClick={() => {
                                        setSelected(i)
                                    }}>
                                        <div className="figure">
                                            <img src={ele.chatMan.figure} draggable={false} />
                                        </div>
                                        <div className="text">
                                            <div className="title">
                                                <span className="time">{StampToTimeOrDate(ele.latestChatTime)}</span>
                                                <span className="name">{ele.chatMan.name}</span>
                                                <p className="gray">{ele.chatCompany}<i className="vline"></i>{ele.chatMan.post}</p>
                                            </div>
                                        </div>
                                    </li>))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="chat-record">
                        {/* HR信息 */}
                        <div className="article">
                            <p className="fl" >
                                <span>{curChat.chatMan.name}</span>
                                <span>{curChat.chatCompany}</span>
                                <i className="vline"></i><span>{curChat.chatMan.post}</span>
                            </p>
                        </div>
                        {/* 职位信息 */}
                        <div className="chat-position-bar">
                            <a href={'/job_detail/'+ curChat.chatJob.code} target="_blank">
                                <span>沟通职位</span>
                                <span className="bar-position-name">{curChat.chatJob.name}</span>
                                <span>{curChat.chatJob.salary}</span>
                                <span>{curChat.chatJob.city}</span>
                            </a>
                        </div>
                        {/* 聊天记录 */}
                        <div className="chat-message">
                            <ul>
                                {
                                    curChat.chatHistory.length>0 && curChat.chatHistory.map(ele => (
                                        <li key={ele.sendTime} className={ele.isMyMsg?"item-myself" : "item-friend"}>
                                            <span className="time">{StampToTimeOrDate(ele.sendTime)}</span>
                                            <div className="message-text">
                                                <div className="figure">
                                                    <img draggable="false" src={curChat.chatMan.figure} style={{display: ele.isMyMsg?'none':'block'}}/>
                                                </div>
                                                <div className="text">
                                                    <p dangerouslySetInnerHTML={{__html: ele.content}}></p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="chat-im chat-editor">
                            <div className="sentence-popover panel-resume" style={{display: showResumePanel?'block':'none'}}>
                                <div><p className="title">确定向 Boss 发送简历吗？</p>
                                <div className="content"><p>Boss确认后，该附件简历将直接发送至对方邮箱</p></div>
                                    <div className="btns">
                                        <span className="btn btn-cancel" onClick={sureToSendResume.bind(this,false)}>取消</span>
                                        <span className="btn btn-primary btn-sure" onClick={sureToSendResume.bind(this, true)}>确定</span>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-controls">
                                {/* <a href="javascript:;" aria-label="表情" className="btn-emotion tooltip tooltip-top"></a> */}
                                {/* <a href="javascript:;" aria-label="常用语" className="btn-dict tooltip tooltip-top"></a> */}
                                <a href="javascript:;" title="发送简历" aria-label="发简历" className="btn-resume tooltip tooltip-top" onClick={() => {
                                    setShowResumePanel(true)
                                }}></a>
                            </div>
                            {/* 消息输入 */}
                            <div contentEditable="true" className="chat-input" onKeyUp={changeText}></div>
                            {/* 发送按钮 */}
                            <div className="chat-op"><span className="tip">按Enter键发送，按Shift+Enter键换行</span><button type="send" className={"btn btn-primary btn-send "+ (curMsg!==''?'':'disabled')} onClick={() => {
                                sendMsg(curMsg)
                            }}>发送</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

 }