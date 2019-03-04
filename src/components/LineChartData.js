import React, { Component } from "react";
import axios from "axios";

import LineChart from "./LineChart";

class LineChartData extends Component {
  state = {
    population_data_raw: "",
    population_data_filtered: ""
  };

  createPopulationData = () => {
    let populationData = [];
    this.state.population_data_raw.map(item => {
      let year = item.year.substring(0, 4);
      populationData.push({
        year: year,
        persons: item.persons
      });
    });
    this.setState({
      population_data_filtered: populationData
    });
  };

  componentDidMount() {
    axios
      .get("https://www.data.act.gov.au/resource/w7dh-fw9m.json")
      .then(response => {
        this.setState({
          population_data_raw: response.data
        });
        this.createPopulationData();
      });
  }

  render() {
    return (
      <div className="">
        {this.state.population_data_filtered && (
          <LineChart data={this.state.population_data_filtered} />
        )}
      </div>
    );
  }
}

export default LineChartData;
