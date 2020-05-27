import React, { Component } from 'react'
import {showCity} from '../../store/actions'
import {connect} from 'react-redux'
import observer from '../../common/observer'
import {requestCPNList, requestGetFilterCPNList} from '../../common/request'
import {Pagination} from 'antd'

 class Company extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cpn_list: [],
            total: 0,
            selected: [0,0,0,0],
            filter: [{
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
            }],
            city: '全国',
            condition: {}
        }

        observer.addlisten('setCity', (city) => {
            
            this.setState({city}, () => {
                
                let {selected,filter,city:cityy} = this.state;

                if(filter[0].options.indexOf(cityy) === -1) {
                    filter[0].options[0]!=="全国" && filter[0].options.shift()
                    filter[0].options.unshift(cityy)
                    selected[0] = 0;
                }else {
                    filter[0].options[0]!=="全国" && filter[0].options.shift()
                    selected[0] = filter[0].options.indexOf(cityy);
                }
                this.filterCPN({city})
                this.forceUpdate();
            })
        })
        
        
    }

    filterCPN(condition={}) {
        
        let city = condition.city?condition.city : '全国';
        delete condition.city
        requestGetFilterCPNList({address: {$regex: city==='全国'?'':city},...condition}).then( data => {
            this.setState({cpn_list: data.list, total: data.total})
        });
    }

    handlePage = (page) => {
        this.getCPNList(page)
        window.scrollTo(0,0)
    }

    getCPNList(page) {
        requestCPNList(page).then(data => {
            this.setState({cpn_list: data.list,
                total: data.total
            })
        })
    }
    componentWillMount() {
        this.getCPNList();
    }


    render() {
        let {selected,filter, cpn_list, total, condition} = this.state;

        return (
            <div className="filter-box">
                <div class="filter-condition ">
                    {filter.map((ele,index) => <div key={ele.en} class={"filter-row"}>
                        <span class="title">{ele.title}</span>
                        <span class="content">
                            {ele.options.map((e,i)=><a 
                            key={i} href="javascript:;" className={selected[index]===i?"selected":""} onClick={()=>{
                                if(e==="全部城市") {
                                    this.props.showCity(true);
                                }else {
                                    filter[0].options[0]!=="全国" && filter[0].options.shift()
                                    selected[index] = i;
                                    let condition = this.state.condition;
                                    if(e==='全国' || e==='不限') {
                                        delete condition[ele.en]
                                    }else {
                                        condition[ele.en] = e;
                                    }
                                    this.setState({selected: this.state.selected, condition })
                                    this.filterCPN(condition);
                                }
                            }}>{e}</a>)}
                        </span>
                    </div>)}
                </div>
                <div className="company-tab-box company-list">
                    <div className="inner">
                    <ul>
                        {cpn_list.map(ele => <li>
                            <div className="sub-li">
                                <a href={"/company/"+ele.code} target="_blank" className="company-info">
                                    <img src={ele.logo} alt=""/>
                                    <div className="conpany-text">
                                        <h4>{ele.name}</h4>
                                        <p>{ele.finance?ele.finance:''}
                                        {ele.finance?<span class="vline"></span>:''}
                                        {ele.industry}</p>
                                    </div>
                                </a>
                                    <a href={"/job_detail/"+ele.hot_job_code} className="about-info">
                                        <p>热招：<u class="h">{ele.hot_job_name}</u> {ele.hot_job_salary}</p>
                                    </a>
                            </div>
                        </li>)}
                    </ul>
                    </div>
                    
            </div>
            <div className="page">
                <Pagination defaultCurrent={1} total={total} pageSize={28} onChange={this.handlePage} showSizeChanger={false}/>
            </div>
            </div>
        )
    }
}

export default connect(state => ({}),{showCity})(Company)