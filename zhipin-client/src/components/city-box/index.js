import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showCity, changeCity} from '../../store/actions'
import {requestCityTitle, requestCities} from '../../common/request'
import observer from '../../common/observer'

 class CityBox extends Component {
     constructor(props) {
        super(props);
     }
     state = {
        cityTitle: [],
        cities: [{cities:[]}],
        curIndex:0
     }
     getCityTitle(){
        requestCityTitle().then(data => {
            this.setState({cityTitle: data})
        })
     }
     getCities(){
        requestCities().then(data => {
            this.setState({cities: data})
        })
     }
     setCity(city) {
        this.props.changeCity(city);
        this.props.showCity(false);
        this.forceUpdate();
        observer.trigger('setCity', city)
     }
     componentDidMount() {
        this.getCityTitle();
        this.getCities();
     }
     
     shouldComponentUpdate(props) {
         return this.props.isCityShow !== props.isCityShow;
     }

    render() {
        console.log('city-box rendering');
        
        let cityTitle = this.state.cityTitle
        let cities = this.state.cities
        let curIndex = this.state.curIndex

        return (
            <div style={{display: this.props.isCityShow?'block':'none'}} className="dialog-wrap city-dialog city-letter-show">
                <div className="dialog-layer" onClick={(e)=>{
                    this.props.showCity(false);
                }}></div>
                <div className="dialog-container">
                    <div className="dialog-title">
                        <h3 className="title"></h3><a href="#!" className="close" ka="dialog_close" onClick={() => {
                            this.props.showCity(false);
                        }}><i className="icon-close"></i></a>
                    </div>
                    <div className="dialog-con">
                        <h4>请选择城市</h4>
                        <div className="city-wrapper">
                            <ul className="section-province">
                                {
                                    cityTitle.map((ele,index) => <li key={ele} className={curIndex===index?'active':''} onClick={() => {
                                        this.setState({curIndex:index})
                                    }}>{ele}</li>)
                                }
                            </ul>
                            <ul className="section-city">
                                {
                                    curIndex===0?cities[0].cities.map(ele =><li key={ele} className="hot-city" onClick={()=>this.setCity(ele)}><span className="city-cur" >{ele}</span></li>):cities.filter((ele) => ele.letter !=undefined && cityTitle[curIndex].indexOf(ele.letter)!==-1).map(ele => <li className="classify-city">
                                        <div className="city-title">{ele.letter}</div>
                                        <ul className="city-main">
                                            {ele.cities.map(e => <li onClick={()=>this.setCity(e)}>
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
}

export default connect(state => ({
    isCityShow: state.isCityShow
}), {showCity, changeCity})(CityBox)