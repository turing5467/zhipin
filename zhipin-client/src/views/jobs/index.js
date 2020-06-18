import React from 'react'
import SearchBox from '../../components/search-box'
import SelectBox from '../../components/select-box'

import JobList from '../../components/job-list'

export default function Jobs() {
    console.log('job 组件 rendering');
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
