// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
    durations = 500;
var delays2 = 80,
    durations2 = 500;

// ##############################
// // // Daily Sales
// #############################




const lineCharts = {
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    // for animation
    animation: {
        draw: function(data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

// ##############################
// // // Email Subscriptions
// #############################

const positiveChart = {
    options: {
        axisX: {
            showGrid: true,
            offset: 30
        },
        low: 0,
        high: 40000000,
        chartPadding: {
            top: 0,
            right: 3,
            bottom: 0,
            left: 0
        },
        axisY: {
            offset: 100
        },
        plugins: [
            Chartist.plugins.tooltip()
        ]
    },
    responsiveOptions: [
        [
            "screen and (max-width: 640px)",
            {
                seriesBarDistance: 1,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }
        ]
    ],
    animation: {
        draw: function(data) {
            if (data.type === "bar") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};


const vaccineChart = {
    options: {
        axisX: {
            showGrid: true,
            offset: 50
        },
        low: 0,
        high: 500000000,
        chartPadding: {
            top: 0,
            right: 3,
            bottom: 0,
            left: 0
        },
        axisY: {
            offset: 100
        },
        stackBars: true,
        plugins: [
            Chartist.plugins.tooltip()
        ]
    },
    responsiveOptions: [
        [
            "screen and (max-width: 640px)",
            {
                seriesBarDistance: 1,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }
        ]
    ],
    animation: {
        draw: function(data) {
            if (data.type === "bar") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};
// ##############################
// // // Completed Tasks
// #############################

const pointCharts = {
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        axisX: {
            showGrid: true
        },
        low: 0,
        high: 150000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        axisY: {
            offset: 70
        },
        plugins: [
            Chartist.plugins.tooltip()
        ]
    },
    animation: {
        draw: function(data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

module.exports = {
    vaccineChart,
    lineCharts,
    positiveChart,
    pointCharts
};
