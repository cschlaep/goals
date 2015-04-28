var Line;
var counter = 0;
var svgMargin = 100;
var svgWidth = 1280;
var svgTop = 119;
var svgBottom = 74;
var svgHeight = 360;
var svgBottom = 74;


var params = [svgMargin,svgWidth,svgTop,svgHeight,svgBottom];

$(document).ready(function() {

	// GENERATE CHART
	var chart = c3.generate({
		bindto: document.getElementById('line'),
		size: {
            width: 1240,
            height: 320,
        },
        transition: {
            duration: 0
        },
		data: {
		    columns: [
		        ['data1', 10, 70, 60, 90, 30, 30],
		        ['data2', 40, 80, 50, 20, 100, 30]
		    ]
		}
	});

	Line = chart;

	var maxVal = getMaxValue(Line.data()[0].values);

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

		var currentChart = getOverlappingChart(cursorPosition, params, "line");
		var numExtended = getExtendedFingers(hand);

		if (currentChart && counter == 0 && numExtended > 0) {
			console.log(currentChart.data());
			var numberOfColumns = currentChart.data()[0].values.length;
			var colNumber = getOverlappingColumn(cursorPosition, params, numberOfColumns, 60)
			if (colNumber) {
				var data = getDataArray(currentChart.data()[0].values);
				var newValue = normalizeHeight(maxVal, svgHeight, svgTop, cursorPosition[1]);

				data[colNumber] = newValue;

				currentChart.load({
			        columns: [data]
			    });
			}
			else {
				currentChart = false;
			}
		}

	}}).use('screenPosition', {scale: 0.6})

});