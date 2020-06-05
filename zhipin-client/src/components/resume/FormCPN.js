import React, { Component } from 'react'
// import { Form, Input, InputNumber, Button, Select ,DatePicker} from 'antd';
import observer from '../../common/observer'

export default class SuperiorityForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            [props.attrName]: false
        }
    }
    // state = {
    //     showSuperiorityForm:false
    // }
    componentDidMount() {
        observer.addlisten(this.props.attrName, () => {
            this.setState({[this.props.attrName]: true});
        })
    }
    render() {
        let {showSuperiorityForm} = this.state
        let {title} = this.props
        return (
            <div className="item-form" style={{display:showSuperiorityForm?'block':'none'}}>
                <h3 className="title">{title}</h3>
                <Form.Item wrapperCol={{ offset: 17 }}>
                    <Button  onClick={() => {
                        this.setState({showSuperiorityForm: false})
                        observer.trigger('enShowSuperiorityForm',false)
                    }}>取消</Button>
                    <Button type="primary" htmlType="submit">
                    完成
                    </Button>
                </Form.Item>
            </div>
        )
    }
}
