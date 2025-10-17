// Common screen technologies for donut and bar chart
const SCREEN_TECHS = ["LCD","LED", "OLED"];

// Shared color scale for screen technologies
const screenTechColorScale = d3.scaleOrdinal()
    .domain(SCREEN_TECHS)
    .range(["#f44336", "#2196f3", "#4caf50"]);

// Common regions for line chart
const REGIONS = [
    "Queensland",
    "NewSouthWales",
    "Victoria",
    "SouthAustralia",
    "Tasmania",
    "Snowy",
    "Average"
];

// Shared color scale for regions
const regionColorScale = d3.scaleOrdinal()
    .domain(REGIONS)
    .range([
        "#66c2a5", // Queensland
        "#fc8d62", // NewSouthWales
        "#8da0cb", // Victoria
        "#e78ac3", // SouthAustralia
        "#a6d854", // Tasmania
        "#ffd92f", // Snowy
        "black"    // Average
    ]);
