import React, { Component } from 'react'
import {Input, Row} from 'antd'
import SelectCity from './selectCity'
import {connect} from 'react-redux'
import {addSearchHistory} from '../../store/actions'
import {withRouter} from 'react-router-dom'
import observer from '../../common/observer'


class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.InputBox = null;
    }
    state = {
        isSearchHistoryShow:false,
        query: ''
    }
    showSearchHistory(e) {
        let flag = this.InputBox&&this.InputBox.contains(e.target);
        this.setState({isSearchHistoryShow: flag})
    }
    handleChange(e){
        this.setState({query: e.target.value})
    }
    handleSearch() {
        this.props.history.push('/jobs?query='+this.state.query);
        this.props.addSearchHistory(this.state.query)
        observer.trigger('setSearch', this.state.query)
    }
    handleSetSearch(query) {
        
        //修改输入框的值
        this.setState({query: query})
        //跳转页面
        this.props.history.push('/jobs?query='+query);
        observer.trigger('setSearch', query)
        
    }
    componentWillMount() {
        document.addEventListener('click', (e)=>this.showSearchHistory(e))
    }

    render() {
        return (
            <div ref={node => this.InputBox = node} className='search-box'>
                <Input value={this.state.query} onChange={(e) => this.handleChange(e)} width="884px" prefix={<SelectCity />} 
                placeholder="搜索职位" />
                <button className="btn btn-search" onClick={() => {this.handleSearch()}}>搜索</button>
                <div className="suggest-result" style={{display: this.state.isSearchHistoryShow?'block':'none'}}>
                    <ul>{
                        this.props.searchHistory.map(ele => <li onClick={this.handleSetSearch.bind(this,ele)}>{ele}</li>)
                        }</ul>
                        </div>
            </div>
        )
    } 
}

export default withRouter(connect(state => ({
    searchHistory: state.searchHistory
}), {addSearchHistory})(SearchBox))