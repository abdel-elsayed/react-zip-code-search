import React, { Component } from 'react'
import "../App.css"

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = {
            zipCode: "10312",
            zipData: [],
            error: false,
        }
    }

    componentDidMount(){
       this.fetchNewData(this.state.zipCode)
    }

    onChange = (event) => {
        this.setState({ isLoading:true, 
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
                isLoading: false,
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
            <main>
                <header id ="main-header">Zip Code Search</header>
                <form>
                    <input type="text" name="zipCode" placeholder="Zip Code" onChange={this.onChange}></input>
                </form>
                {this.state.error===true ? <div className="error">No Results</div> : this.state.zipData.map( (item,index) => (
                    <div key={index} className = "dataContainer">
                        <header className="headerContainer">{item.LocationText}</header>
                        <div className ="innerDataContainer">
                        <p>
                            <li>State: {item.State}</li>
                            <li>Location: ({item.Lat}, {item.Long})</li>
                            <li>Population (estimated): {item.EstimatedPopulation}</li>
                            <li>Total Wages: {item.TotalWages}</li>
                        </p>
                        </div>
                    </div>
                ))}
            </main>
        )
    }
}

export default ZipSearch
