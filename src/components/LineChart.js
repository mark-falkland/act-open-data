import React, { Component } from "react";
import * as d3 from "d3";
import "./ChartStyles.css";

const width = 1260;
const height = 600;
const margin = { top: 20, right: 5, bottom: 20, left: 60 };
const blue = "#52b6ca";

class LineChart extends Component {
  state = {
    line: null, // svg path command for all the high temps
    xScale: d3.scaleBand().range([0, width]),
    yScale: d3.scaleLinear().range([height, 30]),
    lineGenerator: d3.line()
  };

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .tickFormat(d => `${d}`);

  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat(d => `${d}`);

  gridlinesVertical = d3
    .axisTop()
    .tickFormat("")
    .tickSize(-height + 30)
    .scale(this.state.xScale);

  gridlinesHorizontal = d3
    .axisLeft()
    .tickFormat("")
    .tickSize(-width)
    .scale(this.state.yScale);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const { data } = nextProps;
    const { xScale, yScale, lineGenerator } = prevState;
    const populationMax = d3.max(data, d => d.persons);
    xScale.domain(data.map(d => d.year));
    yScale.domain([300000, populationMax]);

    lineGenerator.x(d => xScale(d.year));
    lineGenerator.y(d => yScale(d.persons));
    const line = lineGenerator(data);
    return { line };
  }

  componentDidMount() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
    d3.select(this.refs.gridlinesVertical).call(this.gridlinesVertical);
    d3.select(this.refs.gridlinesHorizontal).call(this.gridlinesHorizontal);
  }

  render() {
    return (
      <div>
        <div className="chart-description"> Data provided by ACT Government <a href="https://www.data.act.gov.au/Education/Census-Data-for-all-ACT-Schools/8mi2-3658" target="_blank">here</a></div>
        <div className="chart-description"> Updated : July 26, 2017</div>
        <div className="line-chart-container">
          <div className="y-title">Population</div>
          <div className="line-chart">
            <h1 className="chart-title">ACT population projections 2015-2041</h1>
            <svg width={width} height={height}>
              <g>
                <g
                  ref="gridlinesHorizontal"
                  className="grid-lines"
                  transform={`translate(${margin.left},-40)`}
                />
                <g
                  ref="gridlinesVertical"
                  className="grid-lines"
                  transform={`translate(${margin.left}, 0)`}
                />
                <g
                  ref="xAxis"
                  className="x-axis"
                  transform={`translate(${margin.left}, ${height - margin.bottom - 18})`}
                />
                <g ref="yAxis" className="y-axis" transform={`translate(${margin.left}, -40)`} />
              </g>
              <path
                d={this.state.line}
                fill="none"
                className="line"
                stroke={blue}
                strokeWidth="2"
                transform={`translate(${margin.left}, 0)`}
              />
            </svg>
            <div className="x-title">Year</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
