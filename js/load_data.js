d3.csv("data/Ex5_TV_energy.csv", d => ({
    energy_consumpt: +d.energy_consumpt,
    star2: +d.star2
})).then(data => {
    console.log(data);
    console.log("rows:", data.length);

    createScatterPlot(data);
});

d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => ({
    Screen_Tech: d.Screen_Tech,
    energy_consumpt: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    console.log(data);
    console.log("rows:", data.length);

    createDonutChart(data);
});

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => ({
    Screen_Tech: d.Screen_Tech,
    energy_consumpt: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    console.log(data);
    console.log("rows:", data.length);

    createBarChart(data);
});

d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
    Year: +d.Year,
    Queensland: parseFloatOrNull(d["Queensland ($ per megawatt hour)"]),
    NewSouthWales: parseFloatOrNull(d["New South Wales ($ per megawatt hour)"]),
    Victoria: parseFloatOrNull(d["Victoria ($ per megawatt hour)"]),
    SouthAustralia: parseFloatOrNull(d["South Australia ($ per megawatt hour)"]),
    Tasmania: parseFloatOrNull(d["Tasmania ($ per megawatt hour)"]),
    Snowy: parseFloatOrNull(d["Snowy ($ per megawatt hour)"]),
    Average: parseFloatOrNull(d["Average Price (notTas-Snowy)"])
})).then(data => {
    console.log(data);
    console.log("rows:", data.length);

    createMultiLineChart(data);
});

function parseFloatOrNull(value) {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
}