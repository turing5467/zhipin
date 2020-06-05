import React, { Component } from 'react'
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
        {
            "type": "薪资要求",
            "typeEn": "salary",
            "options": ["不限","3K以下","3-5K","5-10K","10-15K","15-20K","20-30K","30-50K","50K以上"]
        }
    ]

    state = {
        condition: []
    }

    handleChange= ()=>{
        //跳转
        console.log('跳转');
    }

    addOrUpdateCondition = (arr, propName, value) => {
        let i = arr.findIndex(ele => ele[propName] !== undefined)
        if(i === -1) {
            //1.还没有这个条件
            arr.push({[propName]: value})
        }else {
            //2.已有这个条件
            arr[i] = {[propName]: value}
        }
    }

    handleSetCondition(e,a,b) {
        // console.log(e,a,b);
        let {condition} = this.state
        let i = condition.findIndex(ele => ele[a] !== undefined)
        if(b==='不限'){
            //删除该条件
            i!== -1 && condition.splice(i,1)
        }else {
            if(a!=='salary') {
                //添加条件
                
                if(i === -1) {
                    condition.push({[a]: b})
                }else {
                    //2.已有这个条件
                    condition[i] = {[a]: b}
                }
                console.log(condition);
                
            }else{
                //工资
                let $or = [];
                switch(b){
                    case '3K以下': $or = this.generateRegArray([1,2,3]);break;
                    case '3-5K': $or = this.generateRegArray([3,4,5]);break;
                    case '5-10K': $or = this.generateRegArray([5,6,7,8,9,10]);break;
                    case '10-15K': $or = this.generateRegArray([10,11,12,13,14,15]);break;
                    case '15-20K': $or = this.generateRegArray([15,16,17,18,19,20]);break;
                    case '20-30K': $or = this.generateRegArray(Array.from(new Array(11), (ele,index) => index + 20));break;
                    case '30-50K': $or = this.generateRegArray(Array.from(new Array(21), (ele,index) => index + 30));break;
                    case '50K以上': $or = this.generateRegArray(Array.from(new Array(51), (ele,index) => index + 50));break;
                }
                i = condition.findIndex(ele => ele.$or !== undefined)
                if(i === -1) {
                    condition.push({$or})
                }else {
                    condition[i] = {$or}
                }
            }
            
        }
        observer.trigger('setCondition', condition)
        this.setState({condition})
    }

    generateRegArray = (arr) => {
        return arr.map(ele => ({salary: {$regex: `(^${ele}-|-${ele}k$)`}}))
    }

    clearCondition = () =>{
        this.setState({condition: []})
        observer.trigger('setCondition', null)
    }

    render() {
        let requirements = this.requirements;

        return (
            <div className="filter-select-box">
                {
                requirements.map(ele => 
                <Dropdown key={ele.typeEn}
                    overlayClassName="dropdown-menu" 
                    overlay={<Menu>{ele.options.map(e => <Menu.Item key={e}>
                        <a target="_self" href="#!" onClick={(event) => {this.handleSetCondition(event, ele.typeEn, e)}}>{e}</a>
                        </Menu.Item>)}</Menu>} >
                    <span className="dropdown-select">{ele.type}
                    <i className="icon-select-arrow"></i></span>
                </Dropdown>)
                }
                <a href="#!" className="empty-filter" onClick={this.clearCondition}>清空筛选条件</a>
            </div>
        )
    }
}
