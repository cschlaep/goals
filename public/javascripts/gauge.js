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
        bindto: document.getElementById('chart'),
        size: {
            width: 1240,
            height: 320,
        },
        transition: {
            duration: 0
        },
        data: {
            columns: [
                ['data', 50.00]
            ],
            type: 'gauge',
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value;
                },
                show: false // to turn off the min/max labels.
            },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            max: 100, // 100 is default
            units: ' %',
            width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
    //            unit: 'value', // percentage is default
    //            max: 200, // 100 is default
                values: [30, 60, 90, 100]
            }
        },
    });

    // CURSOR CONTROL
	var currentRoll = 0;
	var currentDec = 0;
	var counter = 0;

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

		var currentChart = getOverlappingChart(cursorPosition, params, "gauge");

		if (currentChart && counter == 0) {
			if (hand.grabStrength < 0.8) {
				var roll = normalizeRoll(hand.roll());
				if (roll != currentRoll) {
					currentRoll = roll;
					currentChart.load({
				        columns: [['data', roll]]
				    });
				}
			}
			else {
				var dec = normalizeRoll(hand.roll());
				if (dec != currentDec) {
					currentDec = dec;
					var data = currentRoll + (dec/100) - 0.5;
					Gauge.load({
				        columns: [['data', data]]
				    });
				}
			}
		}


	}}).use('screenPosition', {scale: 0.6})

});
