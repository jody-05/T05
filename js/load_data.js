d3.csv("data/Ex5_TV_energy.csv", d => ({
    energy_consumpt: +d.energy_consumpt,
    star2: +d.star2
})).then(data => {
    console.log(data);
    console.log("rows:", data.length);

    createScatterPlot(data);
});