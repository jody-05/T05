const createMultiLineChart = (data) => {
    const viewW = 800;
    const viewH = 450;
    
    const margin = { top: 40, right: 100, bottom: 60, left: 60 };
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    const svg = d3.select(".responsive-svg-container-4")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
        .domain([
            0,
            d3.max(REGIONS, region =>
                d3.max(data, d => {
                    const val = d[region];
                    return (val != null && !isNaN(val)) ? val : -Infinity;
                })
            )
        ])
        .nice()
        .range([height, 0]);

    // Line generator
    const line = d3.line()
        .defined(d => d.value != null && !isNaN(d.value))  // skip invalid points
        .x(d => x(d.Year))
        .y(d => y(d.value))

    // Prepare data per region
    const regionData = REGIONS.map(region => ({
        name: region,
        values: data.map(d => ({
            Year: d.Year,
            value: d[region]
        }))
    }));

    // Draw lines
    svg.selectAll(".line")
        .data(regionData)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", d => regionColorScale(d.name))
        .attr("stroke-width", d => d.name === "Average" ? 2.5 : 1.5)
        .attr("d", d => line(d.values));

    // Draw axes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Axis labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 45)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Price ($/MWh)");

    // Tooltip
    const tooltip = d3.select("#tooltip");

    // Circles for tooltips
    REGIONS.forEach(region => {
        svg.selectAll(`.dot-${region}`)
            .data(data.filter(d => d[region] != null && !isNaN(d[region])))
            .join("circle")
            .attr("cx", d => x(d.Year))
            .attr("cy", d => y(d[region]))
            .attr("r", 3)
            .attr("fill", regionColorScale(region))
            .on("mouseover", (event, d) => {
                tooltip
                    .style("opacity", 1)
                    .html(`<strong>${region}</strong><br/>${d.Year}: $${d[region]} /MWh`);
            })
            .on("mousemove", event => {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => tooltip.style("opacity", 0));
    });

    // Legend
    createLegend(svg, regionColorScale, REGIONS, {
        x: width + 10,
        y: 0,
        highlightLabel: "Average"
    });
};