import React, { Component } from 'react'
import JobMenu from '../../components/job-menu';
import HotJob from '../../components/hot-job'
import HotCPN from '../../components/hot-cpn'


export default function Home() { 
    console.log('Home组件 Rendering');
        
        return (
            <div className='home-box'>
                <div className='inner'>
                    <JobMenu />
                    <HotJob />
                    <HotCPN />
                </div>
            </div>
        )
}