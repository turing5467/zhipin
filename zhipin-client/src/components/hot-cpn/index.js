import React, { useState, useEffect } from 'react'
import {requestHotCPN} from '../../common/request'
import LazyLoad from 'react-lazyload'

export default function HotCPN() {
    const [hotCPN, setHotCPN] = useState([]);

    useEffect(() => {
        requestHotCPN().then(data => {
            setHotCPN(data)
        })
    }, []);

    console.log('hot-cpn 组件 rendering');
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