import React, {Component} from 'react'

import StyleDropZone from './StyleDropZone'
import { translate } from '../../services/translate'

class ScanPage extends Component{
    
    render() {
        return(
            <div className='ScanPage'>
                <h1 className='PageTitle'>{translate['Virus Scanner']}</h1>
                <div className='FileUpload'>
                    <h5>{translate['Upload File']}</h5>
                    <StyleDropZone class='hey' />

                    {/* <div className='Desc'>
                        <div>* {translate['Limit size']}: 10MB</div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default ScanPage