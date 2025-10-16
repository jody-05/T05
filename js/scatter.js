const createScatterPlot = (data) => {
    // Dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2)]) // star rating range
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.energy_consumpt)) // energy consumption range
        .nice() // round y-axis nicely
        .range([height, 0]); // inverted for SVG y-axis

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));    // "d" = no decimal place
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)    // render
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Star Rating");

    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Energy Consumption");

    // Points (circles)
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7);
};
