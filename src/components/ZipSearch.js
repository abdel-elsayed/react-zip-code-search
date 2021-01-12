import React, { Component } from 'react'

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = {
            zipCode: "10312",
            zipData: [],
            error: false,
            isLoading: true
        }
    }

    componentDidMount(){
       this.fetchNewData(this.state.zipCode)
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.fetchNewData(event.target.value)
    }

    fetchNewData = (zipCode) => {
        const url = "http://ctp-zip-api.herokuapp.com/zip/" + zipCode
        fetch(url).then(response => {
            if(response.ok)
            {
                return response.json()
            }
            else{
                throw new Error("Unable to fetch data!!")
            }
        }).then(data => {
            console.log(data)
            this.setState({
                zipData: data,
                error: false
            })
        }).catch(e => {
            this.setState({
                error: true
            })
        })
    }

    render(){
        console.log("state data: ", this.state.zipData)
        return(
            <>
            <header>Zip Code Search</header>
            <form>
                <input type="text" name="zipCode" placeholder="Zip Code" onChange={this.onChange}></input>
            </form>

            {this.state.error === true ? <div>ERROR</div> : 
            this.state.zipData.map( (item,index) => (
                <div key={index} >{item.City}</div>
            ))}
        
            </>
        )
    }
}

export default ZipSearch
