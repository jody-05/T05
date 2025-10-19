const createBarChart = (data) => {
    // Set logical dimensions
    const viewW = 600;
    const viewH = 400;

    // Set chart dimensions and margins
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(".responsive-svg-container-3")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const categories = Array.from(new Set(data.map(d => d.Screen_Tech)));
    const xScale = createBandScaleX(categories, width);
    const yScale = createLinearScaleYFromZero(data, d => d.energy_consumpt, height);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    // Draw bars
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.energy_consumpt))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.energy_consumpt))
        .attr("fill", d => screenTechColorScale(d.Screen_Tech))
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)
                .html(`
                    <strong>${d.Screen_Tech}</strong><br/>
                    ${d.energy_consumpt} kWh/year
                `);
        })
        .on("mousemove", event => {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    // X Axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "middle");

    // Y Axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // X Axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Screen Technology");

    // Y Axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Energy Consumption (kWh/year)");
};
