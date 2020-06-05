import React, { Component } from 'react'
import {requestHotJob} from '../../common/request'
import LazyLoad from 'react-lazyload';

export default class HotJob extends Component {
    state = {
        hotJob: [],
        curIndex: 0
    }
    componentDidMount() {
        this.getHotJob();
    }

    getHotJob() {
        requestHotJob().then(data => {
            this.setState({hotJob: data})
        })
    }

    render() {
        let hotJob = this.state.hotJob;
        let curIndex = this.state.curIndex;
        return (
            <div className='common-tab-box merge-city-job'>
                <div className="box-title">热招职位</div>
                <h3>
                    {hotJob.map((ele, index) => (<span 
                    key={index} 
                    className={index===curIndex?'cur':''} 
                    onClick={() => {
                        this.setState({curIndex:index})
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
}
