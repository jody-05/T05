const createBarChart = (data) => {
    // Set chart dimensions and margins
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(".responsive-svg-container-3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, width])
        .padding(0.3);  // spacing between bars

    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt)])
        .nice()
        .range([height, 0]);

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
        .attr("fill", "steelblue")
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
