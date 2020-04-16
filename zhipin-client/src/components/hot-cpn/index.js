import React, { Component } from 'react'
import {requestHotCPN} from '../../common/request'

export default class HotJob extends Component {
    state = {
        hotCPN: [],
        curIndex: 0
    }
    componentWillMount() {
        this.getHotCPN();
    }

    getHotCPN() {
        requestHotCPN().then(data => {
            this.setState({hotCPN: data})
        })
    }

    render() {
        let hotCPN = this.state.hotCPN;
        let curIndex = this.state.curIndex;
        return (
            <div className='common-tab-box merge-city-company'>
                <div class="box-title">热门企业</div>
                <ul>
                    {hotCPN.map(ele => <li>
                        <div className="sub-li">
                                    <a href={"/company/"+ele.companyCode} target="_blank" className="company-info">
                                        <div className="img-box">
                                            <img src={ele.logo}  alt="爱奇艺" />
                                        </div>
                                        <div className="conpany-text">
                                            <h4>{ele.name}</h4>
                                            <p>{ele.finance}<span class="vline"></span>{ele.type}</p>
                                        </div>
                                    </a>
                                    <a href={"/company/"+ele.companyCode} target="_blank" className="about-info">
                                        <p><span class="text-blue">{ele.jobVacancy}</span>个热招职位</p>
                                    </a>
                                </div>
                    </li>)}
                </ul>
                <p className="common-tab-more"><a className="btn btn-outline" href="/company">查看更多</a></p>
            </div>
        )
    }
}
