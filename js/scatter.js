const createScatterPlot = (data) => {
    // Logical (SVG internal space) and Display (screen) sizes
    const viewW = 600;
    const viewH = 400;

    // Dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(".responsive-svg-container-1")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = createLinearScaleX(data, d => d.star2, width);
    const yScale = createLinearScaleY(data, d => d.energy_consumpt, height);

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
        .text("Energy Consumption (kWh)");

    // Points (circles)
    const tooltip = d3.select("#tooltip");

    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7)
        .on("mouseover", (event, d) => {
        tooltip
            .style("opacity", 1)
            .html(`
                Star Rating: ${d.star2}<br/>
                Energy Consumption: ${d.energy_consumpt} kWh
            `);
        })
        .on("mousemove", (event) => {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip
                .style("opacity", 0);
        });
};
