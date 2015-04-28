var Pie;
var counter = 0;
var svgMargin = 100;
var svgWidth = 1280;
var svgTop = 119;
var svgHeight = 360;

var params = [svgMargin,svgWidth,svgTop,svgHeight];

$(document).ready(function() {

    var chart = c3.generate({
        bindto: document.getElementById('pie'),
        size: {
            width: 1240,
            height: 320,
        },
        transition: {
            duration: 0
        },
        data: {
            columns: [
                ['1', 25],
                ['2', 25],
                ['3', 25],
                ['4', 25],
            ],
            type : 'pie',
            order: null
        }
    });

    Pie = chart;

    Leap.loop({ hand: function(hand) {
        if (counter < 3) {
            counter = counter+1;
        } else {
            counter = 0;
        }

        var cursorPosition = hand.screenPosition();
        cursorPosition[0] = cursorPosition[0] - 100;
        cursorPosition[1] = cursorPosition[1] + 350;
        cursor.setScreenPosition(cursorPosition);

        var currentChart = getOverlappingChart(cursorPosition, params, "pie");

        if (currentChart && counter == 0) {
            var numExtended = getExtendedFingers(hand);
            if (numExtended > 0) {
                var allData = currentChart.data();
                var data = [numExtended.toString(), allData[numExtended-1].values[0].value];
                var roll = normalizeRoll(hand.roll());
                var newData = incrementSlice(roll, data);

                var finalData = getPieData(allData);
                // console.log(newData);
                finalData[numExtended-1] = newData;

                currentChart.load({
                    columns: finalData
                });

            }
            else {
                currentChart = false;
            }
        }

        
    }}).use('screenPosition', {scale: 0.6})

});