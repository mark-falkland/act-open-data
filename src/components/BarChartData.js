import React, { Component } from "react";
import axios from "axios";

import BarChart from "./BarChart";

class BarChartData extends Component {
  state = {
    school_data: "",
    school_names: [],
    school_totals: [],
    bar_chart_data: ""
  };

  createBarChartData() {
    let barChartData = [];
    this.state.school_names.map((school, index) => {
      barChartData.push({
        name: school,
        total: this.state.school_totals[index]
      });
    });
    this.setState({
      bar_chart_data: barChartData
    });
  }

  createSchoolTotals = () => {
    // create empty school totals array
    let schoolTotals = [];
    this.state.school_names.forEach(school => {
      schoolTotals.push(0);
    });
    // update school totals
    this.state.school_data.forEach(item => {
      let index = this.state.school_names.indexOf(item.school_name);
      schoolTotals[index] += parseInt(item.students);
    });
    this.setState({
      school_totals: schoolTotals
    });
    this.createBarChartData();
  };

  createSchoolNames = () => {
    let schoolNames = [];
    this.state.school_data.forEach(item => {
      // dodgy formatting hack for scaleBand value lengths
      // will omit two schools with very long names
      if (item.school_name.length < 40) {
        if (schoolNames.includes(item.school_name)) {
        } else {
          schoolNames.push(item.school_name);
        }
      }
    });
    this.setState({
      school_names: schoolNames
    });
    this.createSchoolTotals();
  };

  componentDidMount() {
    axios
      .get("https://www.data.act.gov.au/resource/8mi2-3658.json")
      .then(response => {
        this.setState({
          school_data: response.data
        });
        this.createSchoolNames();
      });
  }

  render() {
    return (
      <div className="">
        {this.state.bar_chart_data && (
          <div>
            <BarChart data={this.state.bar_chart_data} />
          </div>
        )}
      </div>
    );
  }
}

export default BarChartData;