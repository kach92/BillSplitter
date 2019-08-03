window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var bar = document.getElementById('categoryChart').getContext('2d');
    let labelData = [];
    let dataData = [];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    expenses.test.forEach(x => {
        let time = new Date(x.date)
        let timing = `${time.getDate()} ${month[time.getMonth()]}`
        labelData.push(timing);
        dataData.push(x.sum);
    })



    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelData,
            datasets: [{
                label: "Expense S$  ",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgrounColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: dataData,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            quarter: 'MMM D'
                        },
                        distribution: 'series'
                    }
                }]
            }
        }

    });

    let getRandomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color

    }

    let getRGBAof04 = function(hex){
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.4)';
    }

    let getRGBAof1 = function(hex){
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
    }



    let barLabelData = [];
    let barDataData = [];
    let barColor = [];
    let barColorBorder = [];
    expenses.cat.forEach(x => {
        barLabelData.push(x.category);
        barDataData.push(x.sum)
        let color = getRandomColor();
        barColor.push(getRGBAof04(color));
        barColorBorder.push(getRGBAof1(color));

    })

    var myBarChart = new Chart(bar, {
        type: 'bar',
        data: {
            labels: barLabelData,
            datasets: [{
                label: "Expenses S$  ",
                backgroundColor: barColor,
                borderColor: barColorBorder,
                borderWidth:2,
                data: barDataData,
            }]
        }


    });
}