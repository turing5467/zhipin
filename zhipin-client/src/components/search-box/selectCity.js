import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showCity} from '../../store/actions'

class SelectCity extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('selectCity 组件 rendering');
        return (<div className="city-sel" onClick={() => {
            this.props.showCity(true);
        }}>
        <i className="line"></i>
        <span className="label-text"><b>{this.props.city}</b><i className="icon-arrow-down"></i></span>
    </div>)
    }
}

export default connect(state => ({isCityShow: state.isCityShow, city:state.city}), {showCity})(SelectCity);
