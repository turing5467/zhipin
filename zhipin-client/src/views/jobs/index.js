import React, { Component } from 'react'
import SearchBox from '../../components/search-box'
import SelectBox from '../../components/select-box'

import JobList from '../../components/job-list'

export default class Jobs extends Component {
    render() {
        return (
            <div>
            <div className='filter-box'>
                <div className='inner'>
                    <SearchBox />
                    <SelectBox />
                </div>
            </div>
            <JobList />
            
            </div>
        )
    }
}
