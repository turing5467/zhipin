import React, { Component } from 'react'
import {requestJobMenu} from '../../common/request'
// console.log(requestJobMenu);


export default class JobMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            isShowAll:false
        }
        this.showAll = this.showAll.bind(this);
    }
    componentWillMount() {
        this.getJobs(false);
    }

    getJobs(flag) {
        requestJobMenu().then((data) => {
            this.setState({jobs: flag?data:data.filter((ele, index) => index<7)})
        })
    }

    showAll(flag) {
        //显示全部职位条改变
        this.setState({isShowAll: flag});
        //jobs数组改变
        this.getJobs(flag)
    }

    render() {
        let jobs = this.state.jobs;
        let isShowAll = this.state.isShowAll;
        
        return (
            <div className='home-sider' onMouseLeave={() => this.showAll(false)}>
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
                    {
                        <div class="show-all" style={{display: isShowAll?'none':'block'}} onMouseEnter={() => this.showAll(true)}>
                        显示全部职位
                        </div>
                    }
                </div>
            </div>
        )
    }
}
