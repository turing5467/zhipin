import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {requestCPNDetail} from '../../common/request'
import { Carousel } from 'antd';


function CPNDetail(props) {
    const [showBusiness, setShowBusiness] = useState(false)
    const [showManager, setShowManager] = useState(false)
    const [showDesc, setShowDesc] = useState(false)
    const [data, setData] = useState({hot_jobs: [],
        managers: [], envirenment: [], products: [], business: {}
    })

    useEffect(() => {
        let code = props.match.params.code;
        
        requestCPNDetail(code).then(data => {
            
            if(data.status === 0) {
                setData(data.data)
            }
            
        })
    }, [])

    console.log('cpn_detail 组件 rendering');
        
    return ( 
        <div id="main" className="company-new">
            <div className="company-banner">
                <div className="inner home-inner">
                    <div>
                        <div className="company-stat">
                                <span><a href={"/company/"+data.code} ka="all-jobs-top"><b>{data.job_count}</b>在招职位</a></span><span><b>{data.boss_count}</b>位BOSS</span>
                        </div>
                        <div className="info-primary">
                            <img src={data.logo}  className="fl" />
                            <div className="info">
                                <h1 className="name">{data.name}<i className="icon-brand"></i></h1>
                                    <p>{data.finance}<em className="dolt"></em>{data.scale}<em className="dolt"></em>{data.industry}</p>
                            </div>
                        </div>
                    </div>
                    <div className="company-tab">
                        <a href={"/company/"+data.code} className="cur">公司简介</a>
                    </div>
                </div>
            </div>
            <div className="company-hotjob ">
                <div className="inner home-inner">
                    <ul>
                        {data.hot_jobs.slice(0,3).map(ele => <li>
                            <a href={"job_detail"+ele.code} target="_blank" >
                                <div className="info-primary">
                                    <div className="name"><span className="salary">{ele.salary}</span><b>{ele.name}</b></div>
                                    <p className="gray">{ele.info.join('·')}</p>
                                </div>
                            </a>
                        </li>)}
                    </ul>
                </div>
            </div>
            <div className="job-box">
                <div className="inner home-inner">
                    <div className="company-sider">
                        <div className="job-sec manager-list">
                            <h3 style={{background: "none"}}>
                                高管介绍
                                <span className="tab-nav"><i className="cur"></i><i></i><i></i></span>
                            </h3>
                            <div className="manager-inner" style={{height: "140.279px"}}>
                                    <Carousel>
                                        {data.managers.map(e => <div className="manager-list">
                                            <div className="info-user">
                                                <img src={e.pic} alt="" />
                                                <p>
                                                    <span className="name">{e.name}</span>
                                                    <span className="job-title">{e.job}</span>
                                                </p>
                                            </div>
                                            <div className="text fold-text" style={showManager?{maxHeight: 'none',overflow: 'visible'}:{}} >{e.desc.slice(0,e.desc.indexOf('<'))}
                                            <a href="javascript:;" className="more-view" style={{display: "inline;"}} onClick={()=>{
                                                setShowManager(flag => !flag)
                                            }}>...{showManager?'收起':'展开'}<i className="fz fz-slidedown"></i></a>
                                            </div>
                                            </div>
                                        )}
                                    </Carousel>
                            </div>
                        </div>
                        <div className="job-sec picture-list">
                            <h3>公司环境</h3>
                            <div className="slider-main" style={{height: "149px;"}}>
                                <Carousel autoplay>
                                {data.envirenment.map(e => <img src={e} alt="" />)}
                                </Carousel>  
                            </div>
                        </div>
                    </div>
                    <div className="job-detail">
                        <div className="detail-content">
                            <div className="job-sec">
                                <h3>{data.name}简介</h3>
                                <label  onClick={() => {
                                        setShowDesc(flag => !flag)
                                    }}><span>{showDesc?'收起':'展开'}</span><i className="fz fz-slidedown"></i></label>
                                <div className={showDesc?'text':'text fold-text'} dangerouslySetInnerHTML={{__html: data.desc && data.desc.slice(0, data.desc.indexOf('<a'))}}>
                                
                                </div>
                            </div>
                            <div className="job-sec company-products" style={{display: data.products.length>0?'block':'none'}}>
                                <h3>产品介绍</h3>
                                <ul>
                                    {data.products.map(e => <li>
                                        <div className="figure">
                                            <img src={e.img} alt="" />
                                        </div>
                                        <div className="text">
                                            <div className="name">
                                                <a href={e.link} target="_blank" ka="production-1" content="nofollow">
                                                    {e.name}<em className="vline"></em>{e.desc}
                                                </a>
                                            </div>
                                            <p className="gray">{e.link}</p>
                                        </div>
                                        </li>)}
                                </ul>
                            </div>
                            <div className="job-sec company-business">
                                <h3>工商信息</h3>
                                <h4><span>来源：企查查</span>{data.name}</h4>
                                <div className={showBusiness?'business-detail show-business-all':'business-detail'} >
                                    <label  onClick={() => {
                                        setShowBusiness(flag => !flag)
                                    }}><span>{showBusiness?'收起':'展开'}</span><i className="fz fz-slidedown"></i></label>
                                    <ul>
                                        <li><span className="t">法人代表：</span>{data.business.LAR}</li>
                                        <li><span className="t">注册资本：</span>{data.business.registered_capital}</li>
                                        <li><span className="t">成立时间：</span>{data.business.regiater_date}</li>
                                        <li className="col-auto"><span className="t">企业类型：</span>{data.business.type}</li>
                                        <li className="col-auto"><span className="t">经营状态：</span>{data.business.status}</li>
                                        <li className="col-auto"><span className="t">注册地址：</span>{data.business.address}</li>
                                        <li className="col-auto"><span className="t">统一信用代码：</span>{data.business.credit_code}</li>
                                        <li className="col-auto"><span className="t">经营范围：</span>{data.business.scope}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="job-sec">
                                <h3>公司地址</h3>
                                <div className="job-location">
                                    <div className="location-item show-map">
                                        <div className="location-address"><a href="javascript:;" className="more-view" ka="job-poi-1"><i className="fz fz-slidedown"></i></a>{data.address}</div>
                                        <div className="map-container js-open-detail" >
                                            <img src={data.addressImg} alt="公司地址" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default withRouter(CPNDetail)