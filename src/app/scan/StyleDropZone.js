import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
// import getMAC, { isMAC } from 'getmac'
// import { networkInterfaces } from 'os';
import { translate } from '../../services/translate';
import getHistory from '../../services/helpers/getHistory'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    height: '200px'
}

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function StyleDropzone(props) {

    const [uploadStt, setUploadStt] = useState(0);
    // 0: none | 1: progressing | 2: success | -1: error
    const [respCont, setResp] = useState(1);

    // var macaddress = require('macaddress');
    // const os = require('os');
    const onDrop = useCallback((acceptedFiles) => {
        setResp('Uploading...')
        // uploadStt = 1
        setUploadStt(1)
        acceptedFiles.forEach((file) => {
            let data = new FormData()
            data.append('files[]', file)

            console.log(file)
            console.log(data)

            // var addr = getMAC()
            // console.log('addr', addr)

            // console.log('arch', os)

            // macaddress.one(function (err, mac) {
            //     console.log('err', err)
            //     console.log("Mac address for this host: %s", mac); 
            // });

            fetch('http://192.168.126.25:5002/api/v1/capture/check_upload', {
                // content-type header should not be specified!
                method: 'POST',
                body: data,
            }).then(response => {
                console.log('~~ response', response.json())
                setResp(translate['Added to Queue. You will be notified once the file is analyzed.'])
                setTimeout(function() { //Start the timer
                    getHistory().push({pathname: '/a'}) //After 3 seconds, g back to where he left
                }.bind(this), 3000)
            })
            .then(success => {
                // Do something with the successful response
                console.log('~~ success', success)
                setResp(success['message'])
                setTimeout(function() { //Start the timer
                    getHistory().push({pathname: '/a'}) //After 3 seconds, g back to where he left
                }.bind(this), 3000)
            }).catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

            // const reader = new FileReader()
        
            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            // // Do whatever you want with the file contents
            //     const binaryStr = reader.result
            //     console.log(binaryStr)
            //     console.logbinaryStr['byteLength'])
            // }
            // reader.readAsArrayBuffer(file)
        })
        
    }, [])
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({onDrop})
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ])

    const acceptedFilesItems = acceptedFiles.map(file => (
        <div key={file.path} style={{padding: '10px'}}>
            <div class='center'>{translate['Checking']} {file.path}...</div>
            <div class='center'>{translate['Added to Queue. You will be notified once the file is analyzed.']}</div>
        </div>
    ))
    
    
    // const interfaces = networkInterfaces()
    // console.log('interfaces', interfaces)

    console.log('uploadStt', uploadStt)
    console.log('respCont', respCont)

    return (
        <div className="container">
            {uploadStt === 0 ? (
            <div class="dropzone" {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{translate['Drag & drop some files here, or click to select files']}</p>
                <p>* {translate['Limit size']}: 10MB</p>
            </div>
            ) : uploadStt === 1 ? (
            <div>
                {acceptedFilesItems}
            </div>
            ) : (
            <div>
                {respCont}
            </div>
            ) }
        </div>
    )
}

export default StyleDropzone