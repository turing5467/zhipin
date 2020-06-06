import React, { Component } from 'react'
import {requestHotCPN} from '../../common/request'
import LazyLoad from 'react-lazyload'

export default class HotJob extends Component {
    state = {
        hotCPN: [],
        curIndex: 0
    }
    componentDidMount() {
        this.getHotCPN();
    }

    getHotCPN() {
        requestHotCPN().then(data => {
            this.setState({hotCPN: data})
        })
    }

    render() {
        console.log('hot-cpn 组件 rendering');
        let hotCPN = this.state.hotCPN;
        let curIndex = this.state.curIndex;
        return (
            <div className='common-tab-box merge-city-company'>
                <div className="box-title">热门企业</div>
                <ul>
                    {hotCPN.map(ele => <li>
                        <div className="sub-li">
                                    <a href={"/company/"+ele.companyCode} target="_blank" className="company-info">
                                        <div className="img-box">
                                            <LazyLoad height={58}>
                                                
                                                <img src={ele.logo}  alt={ele.name} />
                                            </LazyLoad>
                                        </div>
                                        <div className="conpany-text">
                                            <h4>{ele.name}</h4>
                                            <p>{ele.finance}<span className="vline"></span>{ele.type}</p>
                                        </div>
                                    </a>
                                    <a href={"/company/"+ele.companyCode} target="_blank" className="about-info">
                                        <p><span className="text-blue">{ele.jobVacancy}</span>个热招职位</p>
                                    </a>
                                </div>
                    </li>)}
                </ul>
                <p className="common-tab-more"><a className="btn btn-outline" href="/company">查看更多</a></p>
            </div>
        )
    }
}
