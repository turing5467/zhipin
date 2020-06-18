import React, { Component } from 'react'
// import { Form, Input, InputNumber, Button, Select ,DatePicker} from 'antd';
import {requestUpdateDetail} from '../../common/request'
import observer from '../../common/observer'
import {Form, Button, Input} from 'antd'
import moment from 'moment'

export default class SuperiorityForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            [props.attrName]: false,
            phone: '',
            user: {}
        }
    }

    formRef = React.createRef();

    componentDidMount() {
        let {attrName, attrGetter, getCB} = this.props;
        observer.addlisten(attrName, () => {
            this.setState({[attrName]: true});
        })

        observer.addlisten(attrGetter, this.getCB)
    }

    getCB = (user) => {
        let dateFormat = 'YYYY-MM';
        this.setState({phone: user.phone})

        user.birth = user.birth ? moment(new Date(user.birth).toLocaleDateString(), dateFormat) : undefined;
        this.formRef.current && this.formRef.current.setFieldsValue(user)
    }

    enShowForm = () => {
        let {attrName} = this.props;
        this.setState({[attrName]: false})
        observer.trigger('enS'+attrName.slice(1),false)
    }

    onFinish = (values) => {
        // console.log(values);
        let {phone} = this.state 
        requestUpdateDetail(phone, values).then(data => {
            // console.log(data);
            this.enShowForm();
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        let {attrName} = this.props
        return this.state[attrName] !== nextState[attrName]
    }

    render() {
        // let {attrName} = this.props
        let {title, attrName, children, offset} = this.props
        let attrVal = this.state[attrName]

        console.log('formCPN Rendering' + title);

        return (
            <div className="item-form" style={{display: attrVal?'block':'none'}}>
                <h3 className="title">{title}</h3>
                <Form ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
                    {children}
                    <div className="form-item form-item-required">
                        <Form.Item wrapperCol={{ offset }}>
                            <Button  onClick={this.enShowForm}>取消</Button>
                            <Button type="primary" htmlType="submit">
                            完成
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        )
    }
}