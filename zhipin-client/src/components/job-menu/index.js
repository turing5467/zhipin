import React, { useState, useEffect, useRef } from 'react'
import {requestJobMenu} from '../../common/request'



export default function() {
    const [jobs, setJobs] = useState([]);
    const [showFlag, setShowFlag] = useState(true);
    const data = useRef([]);
    

    //只有第一次渲染才请求数据
    useEffect(() => {
        requestJobMenu().then((res) => {
            data.current = res;
            setShowFlag(false)
        })
    }, [])

    //showFlag改变时才执行该函数
    useEffect(() => {
        
        setJobs(showFlag?data.current:data.current.slice(0,7))
        
    }, [showFlag])

    console.log('job-menu 渲染---');
    
    return (
        <div className='home-sider' onMouseLeave={() => setShowFlag(false)}>
            <div className='job-menu'>
                {jobs.map( (ele,index) => <dl key={index}>
                    <dd>
                    <i className="icon-arrow-right"></i>
                    <b>{ele.title}</b>
                    {ele.pri_menu.map( e => <a key={e.code} href={'/'+ e.code}>{e.text}</a>)}
                    </dd>
                    <div className='menu-sub' style={{marginTop: '-5px'}}>
                        <p className="menu-article">{ele.title}</p>
                        <ul>
                            {ele.sub_menu.map( (e,i) => <li key={i}>
                                <h4>{e.title}</h4>
                                <div className='text'>
                                    {e.menu.map( ee => <a key={ee.code} href={'/'+ ee.code}>{ee.text}</a>)}
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </dl>)}
                
            </div>
            {
                <div className="show-all" style={{opacity: showFlag?0:1}} onMouseEnter={() => setShowFlag(true)}>
                显示全部职位
                </div>
            }
        </div>
    )

}