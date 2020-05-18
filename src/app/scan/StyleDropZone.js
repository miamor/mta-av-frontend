import React, {useMemo, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

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

function StyledDropzone(props) {

    let responseContent = 'No file'

    const onDrop = useCallback((acceptedFiles) => {
        responseContent = 'Uploading...'
        acceptedFiles.forEach((file) => {
            let data = new FormData()
            data.append('files[]', file)

            console.log(file)
            console.log(data)

            fetch('http://192.168.126.26:5002/api/v1/capture/check', {
                // content-type header should not be specified!
                method: 'POST',
                body: data,
            }).then(response => response.json())
            .then(success => {
                // Do something with the successful response
                console.log('success')
                console.log(success)
                responseContent = success['message']
            }).catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

            responseContent = 'Checking...'

            // const reader = new FileReader()
        
            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            // // Do whatever you want with the file contents
            //     const binaryStr = reader.result
            //     console.log(binaryStr)
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
    ]);

    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path} style={{padding: '10px'}}>
            Checking {file.path}...
        </li>
    ));
    
    
    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <ul>
                    {acceptedFilesItems}
                </ul>
            </aside>
        </div>
    )
}

export default StyledDropzone