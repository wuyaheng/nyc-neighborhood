import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map/index"
import geodata from "./data/nyc.geojson"
import axios from "axios"

class App extends Component {
  state = {
    nta: []
  }

  componentDidMount() {

      this.fetchdata()
    
  }

  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        nta: res.data.features
      });
    } catch (error) {
      console.log(error)
    }
  } 

  render() { 
      return (
        <>
          <Map results = {this.state.nta}/> 
        </>
      );
    } 
}
export default App;
