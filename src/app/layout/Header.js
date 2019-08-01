import React, {Component} from 'react'
import {Input} from 'reactstrap'

class Header extends Component{
    render(){
        return(
            <div className='Header'>
                <div className='LeftHeader'>
                    <Input placeholder='Search file name or hash code'/>
                    <div className='LeftMenu'>
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className='TitleHeader'>mtaAV Antivirus</div>
                </div>
                <div className='RightHeader'>
                    <i className="fas fa-globe"></i>
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-cog"></i>
                </div>

            </div>
        )
    }
}

export default Header