import React, { Component } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import './ChartStyles.css'

const width = 1200;
const height = 2300;
const margin = { top: 40, right: 20, bottom: 100, left: 240 };
const pink = "#AA4465";
const orange = "#FFA69E";
const aqua = "#93E1D8";
const colors = chroma.scale([aqua, orange, pink]).mode("hsl");

class BarChart extends Component {
  state = {
    bars: [],
    xScale: d3.scaleLinear().range([0, width - 200]),
    yScale: d3.scaleBand().range([0, height - margin.bottom]),
    colorScale: d3.scaleLinear()
  };

  xAxisTop = d3
    .axisTop()
    .scale(this.state.xScale)
    .tickFormat(d => `${d}`);
  xAxisBottom = d3
    .axisTop()
    .scale(this.state.xScale)
    .tickFormat(d => `${d}`);
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat(d => `${d}`);
  gridlinesVertical = d3
    .axisTop()
    .tickFormat("")
    .tickSize(-height + 60)
    .scale(this.state.xScale);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null;
    const { data } = nextProps;
    const { xScale, yScale, colorScale } = prevState;
    const studentsMax = d3.max(data, d => d.total);
    const colorDomain = d3.extent(data, d => d.total);
    xScale.domain([0, studentsMax]);
    yScale.domain(data.map(d => d.name));
    colorScale.domain(colorDomain);

    const bars = data.map((d, index) => {
      var width = xScale(d.total);
      return {
        x: margin.left,
        y: yScale(d.name) + 5,
        width: width,
        height: yScale.bandwidth() - 10,
        fill: colors(colorScale(d.total))
      };
    });
    return { bars };
  }

  componentDidMount() {
    d3.select(this.refs.xAxisTop).call(this.xAxisTop);
    d3.select(this.refs.xAxisBottom).call(this.xAxisBottom);
    d3.select(this.refs.yAxis).call(this.yAxis);
    d3.select(this.refs.gridlinesVertical).call(this.gridlinesVertical);
  }

  render() {
    return (
      <div>
        <div className="chart-description"> Data provided by the ACT Education Directorate <a href="https://www.data.act.gov.au/Education/Census-Data-for-all-ACT-Schools/8mi2-3658" target="_blank">here</a></div>
        <div className="chart-description"> Updated : September 10, 2018</div>
        <h1 className="chart-title">Number of students per school</h1>
        <svg width={width} height={height}>
          <g>
            <g
              ref="gridlinesVertical"
              className="grid-lines"
              transform={`translate(${margin.left}, 20)`}
            />
            <g
              ref="xAxisTop"
              className="x-axis"
              transform={`translate(${margin.left}, ${margin.top - 20})`}
            />
            <g
              ref="xAxisBottom"
              className="x-axis"
              transform={`translate(${margin.left}, ${height - 10})`}
            />
            <g
              ref="yAxis"
              className="y-axis"
              transform={`translate(${margin.left}, ${margin.top})`}
            />
          </g>
          {this.state.bars.map((d, i) => (
            <rect
              key={i}
              x={d.x}
              y={d.y + 40}
              height={d.height}
              width={d.width}
              fill={d.fill}
            />
          ))}
        </svg>
      </div>
    );
  }
}

export default BarChart;
