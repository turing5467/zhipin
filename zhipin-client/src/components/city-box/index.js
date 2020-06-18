import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {showCity, changeCity} from '../../store/actions'
import {requestCityTitle, requestCities} from '../../common/request'
import observer from '../../common/observer'

let fn = null;
function CityBox(props) {
    const [cityTitle, setCityTitle] = useState([])
    const [cities, setCities] = useState([{cities:[]}])
    const [curIndex, setCurIndex] = useState(0)

    useEffect(() => {
        requestCityTitle().then(data => {
            setCityTitle(data);
        })

        requestCities().then(data => {
            setCities(data)
        })

    }, [])

    function setCity(city) {
        props.changeCity(city);
        props.showCity(false);
        observer.trigger('setCity', city)
     }
     console.log(fn === setCity);
     fn = setCity;

    console.log('city-box rendering');
    return (
        <div style={{display: props.isCityShow?'block':'none'}} className="dialog-wrap city-dialog city-letter-show">
            <div className="dialog-layer" onClick={(e)=>{
                props.showCity(false);
            }}></div>
            <div className="dialog-container">
                <div className="dialog-title">
                    <h3 className="title"></h3><a href="#!" className="close" ka="dialog_close" onClick={() => {
                        props.showCity(false);
                    }}><i className="icon-close"></i></a>
                </div>
                <div className="dialog-con">
                    <h4>请选择城市</h4>
                    <div className="city-wrapper">
                        <ul className="section-province">
                            {
                                cityTitle.map((ele,index) => <li key={ele} className={curIndex===index?'active':''} onClick={() => {
                                    setCurIndex(index)
                                }}>{ele}</li>)
                            }
                        </ul>
                        <ul className="section-city">
                            {
                                curIndex===0?cities[0].cities.map(ele =><li key={ele} className="hot-city" onClick={()=>setCity(ele)}><span className="city-cur" >{ele}</span></li>):cities.filter((ele) => ele.letter !=undefined && cityTitle[curIndex].indexOf(ele.letter)!==-1).map(ele => <li className="classify-city">
                                    <div className="city-title">{ele.letter}</div>
                                    <ul className="city-main">
                                        {ele.cities.map(e => <li onClick={()=>setCity(e)}>
                                            <span className="city-cur">{e}</span>
                                        </li>)}
                                    </ul>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    isCityShow: state.isCityShow
}), {showCity, changeCity})(CityBox)