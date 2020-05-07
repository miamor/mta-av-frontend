import React, {Component} from 'react'

import StyleDropZone from './StyleDropZone'

class ScanPage extends Component{
    render(){
        return(
            <div className='ScanPage'>
                <div className='Title'>Virus Scanner</div>
                <div className='FileUpload'>
                    <h5>Upload File</h5>
                    <StyleDropZone />
                </div>
                <div className='Desc'>
                    <div>1. You can UPLOAD any files, but there is 20MB limit per file.</div>
                    <div>2. Supports Rar/Zip decompression, but it must be less than 20 files.</div>
                </div>
            </div>
        )
    }
}

export default ScanPage