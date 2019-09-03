import React, {Component} from 'react'
import {getListCapture} from '../../services/apis/CaptureAPI'

class DashboardPage extends Component{

    componentDidMount(){
        this._getCapture()
    }

    _getCapture = async () => {
        try{
            console.log(await getListCapture())
        }
        catch(e){

        }
    }

    render(){
        return(
            <div className='DashboardPage'>
                <div  className='Title'>Overview</div>
            </div>
        )
    }
}

export default DashboardPage