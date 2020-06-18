import React, { useEffect,useState, useRef } from 'react'
import {Input} from 'antd'
import SelectCity from './selectCity'
import {connect} from 'react-redux'
import {addSearchHistory} from '../../store/actions'
import {withRouter} from 'react-router-dom'
import observer from '../../common/observer'


function SearchBox(props) { 
    const [showSearchHistoryFlag, setShowSearchHistoryFlag] = useState(false)
    const [query, setQuery] = useState('')
    const inputRef = useRef();

    function handleChange(e) {
        setQuery(e.target.value);
    }

    //点击搜索按钮
    function handleSearch() {
        props.history.push('/jobs?query='+query);
        props.addSearchHistory(query)
        observer.trigger('setSearch', query)
    }

    //点击搜索历史中的项目
    function handleSetSearch(query) {
        
        //修改输入框的值
        setQuery(query)
        //跳转页面
        props.history.push('/jobs?query='+query);
        observer.trigger('setSearch', query)
    }

    function showSearchHistory(e) {
        
        let flag = inputRef.current && inputRef.current.contains(e.target);
        if(flag === true) {
            if(!showSearchHistoryFlag) {
                setShowSearchHistoryFlag(true)
            }else {
                return
            }

        }else {
            if(showSearchHistory){
                setShowSearchHistoryFlag(false)
            }else {
                return
            }
        }

        
    }

    useEffect(() => {
        document.addEventListener('click', showSearchHistory)
        return () => {
            document.removeEventListener('click', showSearchHistory)
        }
    }, [])

    console.log('search-box 组件 rendering');
        return (
            <div ref={inputRef} className='search-box'>
                <Input value={query} onChange={handleChange} width="884px" prefix={<SelectCity />} 
                placeholder="搜索职位" />
                <button className="btn btn-search" onClick={handleSearch}>搜索</button>
                <div className="suggest-result" style={{display: showSearchHistoryFlag?'block':'none'}}>
                    <ul>{
                        props.searchHistory.map(ele => <li onClick={handleSetSearch.bind(this, ele)} key={ele}>{ele}</li>)
                        }</ul>
                        </div>
            </div>
        )
}

export default withRouter(connect(state => ({
    searchHistory: state.searchHistory
}), {addSearchHistory})(SearchBox))