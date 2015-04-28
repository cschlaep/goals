var Bar;
var counter = 0;
var svgMargin = 100;
var svgWidth = 1280;
var svgTop = 119;
var svgHeight = 360;
var svgBottom = 74;

var params = [svgMargin,svgWidth,svgTop,svgHeight,svgBottom];

$(document).ready(function() {

	// GENERATE CHART
	var chart = c3.generate({
		bindto: document.getElementById('bar'),
		size: {
            width: 1240,
            height: 320,
        },
		transition: {
            duration: 0
        },
	    data: {
	        columns: [
	            ['data1', 30, 200, 100, 80, 50, 130],
	        ],
	        type: 'bar'
	    },
	    bar: {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	        // or
	        //width: 100 // this makes bar width 100px
	    }
	});

	Bar = chart;

	var maxVal = getMaxValue(Bar.data()[0].values);

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

		var currentChart = getOverlappingChart(cursorPosition, params, "bar");
		var numExtended = getExtendedFingers(hand);

		if (currentChart && counter == 0 && numExtended > 0) {
			var numberOfColumns = currentChart.data()[0].values.length;
			var colNumber = getOverlappingColumn(cursorPosition, params, numberOfColumns, 60)
			if (colNumber) {
				console.log(colNumber);
				currentChart.focus('data1', 0);
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