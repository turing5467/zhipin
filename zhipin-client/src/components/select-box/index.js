import React, { Component } from 'react'
// import {Select} from 'antd'
// const { Option } = Select;
import { Menu, Dropdown, Button } from 'antd';
import observer from '../../common/observer';
export default class SelectBox extends Component {

    requirements = [
        {
            "type": "工作经验",
            "typeEn": "experience",
            "options": ["不限","在校生","应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]
        },
        {
            "type": "学历要求",
            "typeEn": "eduBG",
            "options": ["不限","初中及以下","中专/中技","高中","大专","本科","硕士","博士"]
        },
        // {
        //     "type": "薪资要求",
        //     "typeEn": "salary",
        //     "options": ["不限","3K以下","3-5K","5-10K","10-15K","15-20K","20-30K","30-50K","50K以上"]
        // },
        // {
        //     "type": "融资阶段",
        //     "typeEn": "finance",
        //     "options": ["不限","未融资","天使轮","A轮","B轮","C轮","D轮及以上","已上市", "不需要融资"]
        // },
        // {
        //     "type": "公司规模",
        //     "typeEn": "scale",
        //     "options": ["不限","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000人以上"]
        // }
    ]

    state = {
        condition: {}
    }

    handleChange= ()=>{
        //跳转
        console.log('跳转');
    }

    handleSetCondition(e,a,b) {
        console.log(e,a,b);
        let {condition} = this.state
        if(b==='不限'){
            delete condition[a]
        }else {
            // if(a!=='salary') {
                condition[a] = b
            // }else{
            //     let reg,reg1,reg2;
            //     switch(b){
            //         case '3K以下': reg=/[1,2]?-?[1-3]K/;return;
            //         case '50K以上': reg=/[5-9][0-9]/
            //         case '3-5K': reg1 = /
            //         case '5-10K': reg = /[5-9]/;return
            //         case '10-15K':
            //         case '15-20K':
            //         case '20-30K': 
            //         case '30-50K':
            //     }
            // }
            
        }
        observer.trigger('setCondition', condition)
        this.setState({condition})
    }

    clearCondition = () =>{
        this.setState({condition: {}})
        observer.trigger('setCondition', {})
    }

    render() {
        let requirements = this.requirements;

        return (
            <div className="filter-select-box">
                {
                requirements.map(ele => 
                <Dropdown 
                    overlayClassName="dropdown-menu" 
                    overlay={<Menu>{ele.options.map(e => <Menu.Item>
                        <a target="_self" href="javascript:;" onClick={(event) => {this.handleSetCondition(event, ele.typeEn, e)}}>{e}</a>
                        </Menu.Item>)}</Menu>} >
                    <span className="dropdown-select">{ele.type}
                    <i className="icon-select-arrow"></i></span>
                </Dropdown>)
                }
                <a href="javascript:;" className="empty-filter" onClick={this.clearCondition}>清空筛选条件</a>
            </div>
        )
    }
}
