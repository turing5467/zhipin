import React, { Component } from 'react'
import { Form, Button, message} from 'antd';
import observer from '../../common/observer'
import {requestUpdateDetail} from '../../common/request'
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class FormArrCPN extends Component {

    constructor(props) {
        super(props);
        //arrName： 小写数组名
        //attrName: showXxxForm
        this.state = {
                [props.attrName]:false,
                phone: '',
                index: -1,
                [props.arrName]: []
        }
    }

    formRef = React.createRef();

    componentDidMount() {
        // let {dateFormat} = this.state
        let {arrName, attrName} = this.props;
        let getAttr = 'get' + this.capitalize(arrName);
        observer.addlisten(attrName, () => {
            this.setState({[attrName]: true});
        })

        observer.addlisten(getAttr, (arr, index) => {
            this.setState({index, [arrName]: arr})
            if(index===-1) {
                this.formRef.current && this.formRef.current.resetFields();
                return;
            }
            let item = arr[index]
            this.formRef.current && this.formRef.current.setFieldsValue(this.momentFormat(item));
            this.setState({index, [arrName]: arr})
        })

        observer.addlisten('getPhone', (phone) => {
            this.setState({phone})
        })
    }

    capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1)
    }

    momentFormat = (item) => {
        let arr = ['starttime', 'endtime']
        let dateFormat = 'YYYY-MM';
        arr.forEach(ele => {
            item[ele] = item[ele]?moment(new Date(item[ele]).toLocaleDateString(), dateFormat):undefined
        })
        return item;
    }
    

    onFinish = (values) => {
        let {arrName, attrName} = this.props
        let arr = this.state[arrName];
        let {phone, index} = this.state 
        if(index===-1){
            //添加
            arr.push(values);
        }else {
            //修改
            arr[index] = values;
        }
        
        requestUpdateDetail(phone, {[arrName]: arr}).then(data => {
            message.success(index===-1?'添加成功':'修改成功')
            setTimeout(() => {
                this.setAndTrigger(attrName)
                window.location.reload();
            }, 1000);
        })
    }

    setAndTrigger = (name) =>{
        this.setState({[name]:false})
        let name_ = 'enS'+name.slice(1)
        observer.trigger(name_)
    }

    render() {
        let {attrName, children, title} = this.props
        let {[attrName]: showFlag, index} = this.state
        return (
            <div className="item-form" style={{display:showFlag?'block':'none'}}>
                <h3 className="title">{index===-1?'添加':'编辑'}{title}</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    
                    {children}

                    <Form.Item wrapperCol={{ offset: 17 }}>
                        <Button  onClick={() => {
                            this.setAndTrigger(attrName);
                        }}>取消</Button>
                        <Button type="primary" htmlType="submit">
                        完成
                        </Button>
                    </Form.Item>
                </Form>
                
            </div>
        )
    }
}
