import React, { Component } from "react";
import "./App.css";

import BarChartData from "./components/BarChartData";
import LineChartData from "./components/LineChartData";


class App extends Component {

  state = {
    currentChart: 'bar'
  }

  handleClick = (event) => {
    event.stopPropagation();
    let name = event.currentTarget.id
    this.setState({
      currentChart: name
    })
  }

  render() {

    let buttonTextClassBar = ""
    let buttonTextClassLine = ""
    if (this.state.currentChart === "bar") {
      buttonTextClassBar = "chart-type-button highlight"
      buttonTextClassLine = "chart-type-button"
    } else {
      buttonTextClassBar = "chart-type-button"
      buttonTextClassLine = "chart-type-button highlight"
    }

    return (
      <div className="">
        <div>
          <div className="header-container">
            <div className="header-title">D3.js visualisations created from the <a href="https://www.data.act.gov.au/" target="_blank">Open Data Portal dataACT</a></div>
            <div className="chart-buttons-container">

              <div id="bar" onClick={this.handleClick} className={buttonTextClassBar}> <i className="material-icons chart-type-button-text">bar_chart</i> <span className="chart-type-button-text">ACT School Census</span> </div>

              <div id="line" onClick={this.handleClick} className={buttonTextClassLine}> <i className="material-icons chart-type-button-text">show_chart</i> <span className="chart-type-button-text">ACT Population Projections</span> </div>

            </div>
          </div>
          {
            this.state.currentChart === "bar" &&
            <BarChartData />
          }
          {
            this.state.currentChart === "line" &&
            <LineChartData />
          }
        </div>
      </div>
    );
  }
}

export default App;
