const createDonutChart = (data) => {
    const viewW = 500;
    const viewH = 500;
    const margin = 40;
    const radius = Math.min(viewW, viewH) / 2 - margin;

    const outerSvg = d3.select(".responsive-svg-container-2")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("border", "1px solid #ccc");

    const svg = outerSvg.append("g")
        .attr("transform", `translate(${viewW / 2}, ${viewH / 2})`);

    // Color scale
    const color = screenTechColorScale;

    // Pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.energy_consumpt);

    const arcData = pie(data);

    // Arc generator (for donut)
    const arc = d3.arc()
        .innerRadius(radius * 0.3)  // inner radius for donut hole
        .outerRadius(radius * 0.7); // outer radius

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

    // percentage labels
    const total = d3.sum(data, d => d.energy_consumpt);

    svg.selectAll("text.percent-label")
        .data(arcData)
        .join("text")
        .attr("class", "percent-label")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("fill", "white")
        .style("font-size", "13px")
        .text(d => {
            const percent = (d.data.energy_consumpt / total) * 100;
            return percent >= 5 ? `${percent.toFixed(1)}%` : "";
        });

    createScreenTechLegend(outerSvg, 20, 20);
};
