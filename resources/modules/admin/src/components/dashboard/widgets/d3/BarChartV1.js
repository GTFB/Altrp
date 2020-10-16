import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class BarChartV1 extends React.Component {

    scaleColor = d3.scaleSequential(d3.interpolateViridis);
    scaleHeight = d3.scaleLinear();
    scaleWidth = d3.scaleBand().padding(0.1);

    componentDidMount() {
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    updateChart() {
        this.updateScales();
        const { data, width, height, animDuration } = this.props;
        const bars = d3.select(this.viz)
            .selectAll(".bar")
            .data(data, function key(d) { return d.key });

        bars.exit()
            .attr("y", height)
            .attr("height", 0)
            .style("fill-opacity", 0)
            .remove();

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", height)
            .attr("rx", 5).attr("ry", 5)
            .merge(bars)
            .transition().duration(animDuration)
            .attr("y", (d) => (this.scaleHeight(d.key)))
            .attr("height", (d) => (height - this.scaleHeight(d.key)))
            .attr("x", (d) => (this.scaleWidth(d.key)))
            .attr("width", this.scaleWidth.bandwidth())
            .style("fill", (d) => (this.scaleColor(d.key)));
    }

    updateScales() {
        const { data, width, height } = this.props;
        this.scaleColor.domain([0, data.length]);
        this.scaleWidth
            .domain(data.map((d) => (d.key)))
            .range([0, width]);
        this.scaleHeight
            .domain(d3.extent(data, (d) => (d.key)))
            .range([height - 20, 0]);
    }

    render() {
        const { width, height } = this.props;

        return (
            <svg ref={viz => (this.viz = viz)}
            >
            </svg>
        );
    }
}

BarChartV1.defaultProps = {
    animDuration: 600
};

BarChartV1.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    animDuration: PropTypes.number
};

export default BarChartV1;