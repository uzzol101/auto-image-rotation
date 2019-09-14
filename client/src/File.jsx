import React, { Component } from 'react'
import LoadImage from 'blueimp-load-image'
export default class FileUpload extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            file: '',
            imageFile: ''
        }
    }
   
    handleUpload = () => {
        let {imageFile} = this.state
        let fd = new FormData()
        fd.append('sampleFile', imageFile)
        window.fetch('http://localhost:4000/upload', {
            method: "POST",
            body: fd
        })
        .then(response => response.json())
        .then(result => {console.log('result is ', result)})
        .catch(error => {console.log('error ', error)})
    }

    handleFileChange = (event) => {
        const file = event.target.files[0]
  
        LoadImage(
            file,
            (img) => {
             img.toBlob(blob => {
                    const imageUrl = URL.createObjectURL(blob)
                    const imgFile = new File([blob], file.name, {type: file.type, lastModified: file.lastModified})
                    this.setState({
                        file: imageUrl,
                        imageFile: imgFile
                    })
                })
            },
            {
                orientation: true,
                maxWidth: 200,
                maxHeight: 200
            }
        )  
    }

    render() {
        return (
            <div>
                <input onChange={this.handleFileChange} type="file" name="sampleFile"/>

                <div className="preview">
                    {
                        this.state.file ? <img src={this.state.file} alt="Sample file" className="previewfile"/> : <p>No file choosen</p>
                    }
                </div>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}
