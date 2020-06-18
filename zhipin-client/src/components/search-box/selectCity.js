import React from 'react'
import {connect} from 'react-redux'
import {showCity} from '../../store/actions'

function SelectCity(props) {
    console.log('selectCity 组件 rendering');
    return (<div className="city-sel" onClick={() => {
                props.showCity(true);
            }}>
                <i className="line"></i>
                <span className="label-text"><b>{props.city}</b><i className="icon-arrow-down"></i></span>
            </div>)
}

export default connect(state => ({isCityShow: state.isCityShow, city:state.city}), {showCity})(SelectCity);
