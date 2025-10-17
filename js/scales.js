function createLinearScaleX(data, accessor, width) {
    return d3.scaleLinear()
        .domain(d3.extent(data, accessor))
        .range([0, width]);
}

function createLinearScaleY(data, accessor, height) {
    return d3.scaleLinear()
        .domain(d3.extent(data, accessor))
        .nice()
        .range([height, 0]);
}

function createLinearScaleYFromZero(data, accessor, height) {
    return d3.scaleLinear()
        .domain([0, d3.max(data, accessor)])
        .nice()
        .range([height, 0]);
}

function createBandScaleX(categories, width) {
    return d3.scaleBand()
        .domain(categories)
        .range([0, width])
        .padding(0.3);
}
