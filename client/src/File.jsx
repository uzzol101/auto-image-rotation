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
        const imageUrl = URL.createObjectURL(file)
        const fomrData = new FormData()
        fomrData.append("sampleFile", file)
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
