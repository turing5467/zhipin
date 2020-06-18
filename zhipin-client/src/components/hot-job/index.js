import React, { useState, useEffect } from 'react'
import {requestHotJob} from '../../common/request'
import LazyLoad from 'react-lazyload';

export default function HotJob() { 

    const [hotJob, setHotJob] = useState([]);
    const [curIndex, setCurIndex] = useState(0);

    useEffect(() => {
        requestHotJob().then(data => {
            setHotJob(data)
        })
    }, [])

    console.log('hot-job 组件 rendering');
    return (
        <div className='common-tab-box merge-city-job'>
            <div className="box-title">热招职位</div>
            <h3>
                {hotJob.map((ele, index) => (<span 
                key={index} 
                className={index===curIndex?'cur':''} 
                onClick={() => {
                    setCurIndex(index)
                }}>
                    {ele.title}
                </span>))}
            </h3>
            <ul>
                { hotJob[curIndex] && hotJob[curIndex].jobList.map( ele => <li>
                    <div className="sub-li">
                                    <a href={"/company/"+ele.companyCode} className="user-info" target="_blank">
                                        <p>
                                            <LazyLoad height={58}>
                                                <img src={ele.logo}/>
                                            </LazyLoad>
                                        </p>
                                    </a>
                                    <a href={"/job_detail/"+ele.jobCode}className="job-info" target="_blank">
                                        <p className="name"><span className="name-text">{ele.jobName}</span></p>
                                        <p className="job-text">{ele.city}<span className="vline"></span>{ele.exprience}<span className="vline"></span>{ele.eduBG}</p>
                                        <p className="salary">{ele.salary}</p>
                                    </a>
                                </div>
                </li> )}
            </ul>
            <p className="common-tab-more"><a className="btn btn-outline" href="/jobs">查看更多</a></p>
        </div>
    )
}