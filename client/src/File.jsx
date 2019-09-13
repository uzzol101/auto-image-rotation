import React, { Component } from 'react'

export default class File extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: ''
        }
    }

    handleFileChange = (event) => {
        const file = event.target.files[0]
        console.log('file ', file)
        const imageUrl = URL.createObjectURL(file)
        let fileBlob
        window.fetch(imageUrl).then(response => response.blob()).then(result => {
            
            result.name = "sampleFile"
            result.lastModifiedDate = new Date()
            fileBlob = result
            const fd = new FormData();
            fd.set('a', fileBlob, file.name);
            let f =  fd.get('a');
            console.log('f ', f)
            const fomrData = new FormData()
            fomrData.append("sampleFile", f)
            fomrData.append("name", "uzzol")
            this.setState({
                file: imageUrl
            })
            window.fetch('http://localhost:4000/upload', {
                method: "POST",
                body: fomrData
            })
            .then(response => response.json())
            .then(result => console.log('result ', result))
            .catch(error => console.log('error', error))
            })
        
        
    }

    render() {
        return (
            <div>
                <input onChange={this.handleFileChange} type="file" name="sampleFile"/>

                <div className="preview">
                    {
                        this.state.file ? <img src={this.state.file} alt="Sample file" /> : <p>No file choosen</p>
                    }
                </div>
            </div>
        )
    }
}
