const createDonutChart = (data) => {
    const width = 500;
    const height = 500;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(".responsive-svg-container-2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid #ccc")
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screen_Tech))
        .range(["#f44336", "#2196f3", "#4caf50"])

    // Pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.energy_consumpt);

    const arcData = pie(data);

    // Arc generator (for donut)
    const arc = d3.arc()
        .innerRadius(radius * 0.5)  // inner radius for donut hole
        .outerRadius(radius * 0.9); // outer radius

    // Outer arc for label positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 1.1)
        .outerRadius(radius * 1.1);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    // Draw arcs
    svg.selectAll("path")
        .data(arcData)
        .join("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.Screen_Tech))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)
                .html(`
                    <strong>${d.data.Screen_Tech}</strong><br/>
                    ${d.data.energy_consumpt} kWh/year
                `);
        })
        .on("mousemove", (event) => {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    // Add labels
    svg.selectAll("text")
        .data(arcData)
        .join("text")
        .text(d => d.data.Screen_Tech)
        .attr("transform", d => `translate(${outerArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px");
};
