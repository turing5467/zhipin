import React, { Component, useState, useEffect } from 'react'
import {showCity} from '../../store/actions'
import {connect} from 'react-redux'
import observer from '../../common/observer'
import {requestGetFilterCPNList} from '../../common/request'
import {Pagination} from 'antd'
import Lazyload from 'react-lazyload'


function Company(props) {
    const [city, setCity] = useState('全国')
    const [condition, setCondition] = useState({})
    const [CPNList, setCPNList] = useState([]);
    const [total, setTotal] = useState(0)
    const [selected, setSelected] = useState([0,0,0,0])
    const [filter] = useState([{
        "title": "公司地点: ",
        "en": "city",
        "options": ["全国", "北京", "上海", "广州", "深圳", "杭州", "天津", "西安", "苏州", "武汉", "厦门", "长沙", "成都", "郑州", "重庆", "全部城市"]
    }, {
        "title": "行业类型: ",
        "en": "industry",
        "options": ["不限", "电子商务", "游戏", "媒体", "广告营销", "数据服务", "医疗健康", "生活服务", "O2O", "旅游", "分类信息", "音乐/视频/阅读", "在线教育", "社交网络", "人力资源服务", "企业服务", "信息安全", "智能硬件", "移动互联网", "互联网", "计算机软件", "通信/网络设备", "广告/公关/会展", "互联网金融", "物流/仓储", "贸易/进出口", "咨询", "工程施工", "汽车生产"]
    }, {
        "title": "融资阶段: ",
        "en": "finance",
        "options": ["不限", "未融资", "天使轮", "A轮", "B轮", "C轮", "D轮及以上", "已上市", "不需要融资"]
    }, {
        "title": "公司规模: ",
        "en": "scale",
        "options": ["不限", "0-20人", "20-99人", "100-499人", "500-999人", "1000-9999人", "10000人以上"]
    }])

    function filterCPN(condition={}) {
        
        let city = condition.city?condition.city : '全国';
        delete condition.city
        requestGetFilterCPNList({address: {$regex: city==='全国'?'':city},...condition}).then( data => {
            setCPNList(data.list)
            setTotal(data.total)
        });
    }

    function handlePage (page) {
        getCPNList(page)
        window.scrollTo(0,0)
    }

    function getCPNList(page=1) {
        requestGetFilterCPNList(condition, page).then(data => {
            setCPNList(data.list)
            setTotal(data.total);
        })
    }

    useEffect(() => {
        getCPNList()
    }, [])

    useEffect(() => {
        function setCityFN(city) {
            setCity(city)
            if(filter[0].options.indexOf(city) === -1) {
                filter[0].options[0]!=="全国" && filter[0].options.shift()
                filter[0].options.unshift(city)
                selected[0] = 0;
            }else {
                filter[0].options[0]!=="全国" && filter[0].options.shift()
                selected[0] = filter[0].options.indexOf(city);
            }
            filterCPN({city})
            
        }
        observer.addlisten('setCity', setCityFN)
        return () => {
            observer.remove('setCity', setCityFN);
        }
    }, [])

    console.log('cpn 组件 rendering');

    return (
        <div className="filter-box">
            <div className="filter-condition ">
                {filter.map((ele,index) => <div key={ele.en} className={"filter-row"}>
                    <span className="title">{ele.title}</span>
                    <span className="content">
                        {ele.options.map((e,i)=><a 
                        key={i} href="javascript:;" className={selected[index]===i?"selected":""} onClick={()=>{
                            if(e==="全部城市") {
                                props.showCity(true);
                            }else {
                                filter[0].options[0]!=="全国" && filter[0].options.shift()
                                selected[index] = i;
                                if(e==='全国' || e==='不限') {
                                    delete condition[ele.en]
                                }else {
                                    condition[ele.en] = e;
                                }
                               
                                setSelected(selected);
                                setCondition(condition)
                                filterCPN(condition);
                            }
                        }}>{e}</a>)}
                    </span>
                </div>)}
            </div>
            <div className="company-tab-box company-list">
                <div className="inner">
                <ul>
                    {CPNList.map(ele => <li>
                        <div className="sub-li">
                            <a href={"/company/"+ele.code} target="_blank" className="company-info">
                                <Lazyload height={55}>
                                    <img src={ele.logo} alt=""/>
                                </Lazyload>
                                <div className="conpany-text">
                                    <h4>{ele.name}</h4>
                                    <p>{ele.finance?ele.finance:''}
                                    {ele.finance?<span className="vline"></span>:''}
                                    {ele.industry}</p>
                                </div>
                            </a>
                                {
                                    ele.hot_jobs[0] && <a href={"/job_detail/"+ele.hot_jobs[0].code} className="about-info">
                                    <p>热招：<u className="h">{ele.hot_jobs[0].name}</u> {ele.hot_jobs[0].salary}</p>
                                </a>
                                }
                        </div>
                    </li>)}
                </ul>
                </div>
                
        </div>
        <div className="page">
            <Pagination defaultCurrent={1} total={total} pageSize={28} onChange={handlePage} showSizeChanger={false}/>
        </div>
        </div>
    )
}

export default connect(state => ({}),{showCity})(Company)