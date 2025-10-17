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