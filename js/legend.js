function createLegend(svg, colorScale, labels, {
    x = 0,
    y = 0,
    spacing = 20,
    circleSize = 10,
    fontSize = 12,
    strokeWidth = 1.5,
    highlightLabel = null
} = {}) {
    const legendGroup = svg.append("g")
        .attr("transform", `translate(${x}, ${y})`);

    labels.forEach((label, i) => {
        const g = legendGroup.append("g")
            .attr("transform", `translate(0, ${i * spacing})`);

        g.append("line")
            .attr("x1", 0)
            .attr("x2", circleSize)
            .attr("y1", circleSize / 2)
            .attr("y2", circleSize / 2)
            .attr("stroke", colorScale(label))
            .attr("stroke-width", label === highlightLabel ? 2.5 : strokeWidth);

        g.append("text")
            .attr("x", circleSize + 5)
            .attr("y", circleSize)
            .text(label)
            .style("font-size", `${fontSize}px`);
    });
}

function createScreenTechLegend(svg, x = 0, y = 0) {
    const legendGroup = svg.append("g")
        .attr("transform", `translate(${x}, ${y})`);

    SCREEN_TECHS.forEach((tech, i) => {
        const group = legendGroup.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        group.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", screenTechColorScale(tech));

        group.append("text")
            .attr("x", 18)
            .attr("y", 10)
            .text(tech)
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle");
    });
}
