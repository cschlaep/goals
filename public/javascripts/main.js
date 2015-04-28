var counter = 0;
var svgMargin = 100;
var svgWidth = 1280;
var svgTop = 119;
var svgHeight = 360;
var svgBottom = 74;
var params = [svgMargin,svgWidth,svgTop,svgHeight,svgBottom];

var currentType = 'bar';
var currentSet = 1;

$(document).ready(function() {

	var chart = c3.generate({
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
	            ['data2', 40, 150, 90, 100, 50, 30],
	            ['data3', 80, 100, 130, 60, 60, 100],
	        ],
	        type: 'bar',
	        order: null
	    },
	    bar: {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	        // or
	        //width: 100 // this makes bar width 100px
	    }
	});

	// CURSOR CONTROL
	var currentRoll = 0;
	var currentDec = 0;

	Leap.loop({ hand: function(hand) {

		console.log(currentSet);

		var cursorPosition = hand.screenPosition();
		cursorPosition[0] = cursorPosition[0] - 100;
		cursorPosition[1] = cursorPosition[1] + 350;
		cursor.setScreenPosition(cursorPosition);

		if (cursorPosition[0] >= svgMargin && cursorPosition[0] <= svgMargin + svgWidth) {
			if (cursorPosition[1] >= svgTop && cursorPosition[1] <= svgTop + svgHeight) {
				$(document).find("svg").css("background-color","lightsteelblue");
			}
			else {
				$(document).find("svg").css("background-color","white");
			}
		}
		else {
			$(document).find("svg").css("background-color","white");
		}


		// CONTROL FOR GAUGE //
		if (currentType == 'gauge') {
			if (counter < 3) {
				counter = counter+1;
			} else {
				counter = 0;
			}
			if (chart && counter == 0) {
				if (hand.grabStrength < 0.8) {
					var roll = normalizeRoll(hand.roll());
					if (roll != currentRoll) {
						currentRoll = roll;
						chart.load({
					        columns: [['data1', roll]]
					    });
					}
				}
				else {
					var dec = normalizeRoll(hand.roll());
					if (dec != currentDec) {
						currentDec = dec;
						var data = currentRoll + (dec/100) - 0.5;
						chart.load({
					        columns: [['data1', data]]
					    });
					}
				}
			}
		}

		// CONTROL FOR BAR //
		else if (currentType == 'bar' || currentType == 'line') {
			if (counter < 3) {
				counter = counter+1;
			} else {
				counter = 0;
			}
			var maxVal = getMaxValue(chart.data()[0].values);
			var numExtended = getExtendedFingers(hand);

			if (chart && counter == 0 && numExtended > 0) {
				var numberOfColumns = chart.data()[0].values.length;
				var colNumber = getOverlappingColumn(cursorPosition, params, numberOfColumns, 60)
				if (colNumber) {
					var data = getDataArray(currentSet, chart.data()[currentSet].values);
					var newValue = normalizeHeight(maxVal, svgHeight, svgTop, cursorPosition[1]);

					data[colNumber] = newValue;

					chart.load({
				        columns: [data]
				    });
				}
			}
		}

		// CONTROL FOR PIE //
		else if (currentType == 'pie') {
			if (counter < 3) {
				counter = counter+1;
			} else {
				counter = 0;
			}
            var numExtended = getExtendedFingers(hand);

            if (counter == 0 && numExtended > 0) {
                var allData = chart.data();
                var tot = 0
                for (var i = 0; i<allData.length; i++) {
                	tot = tot+allData[i].values[0].value
                }
                var data = ["data"+currentSet.toString(), allData[currentSet-1].values[0].value];
                var roll = normalizeRoll(hand.roll());
                var newData = incrementSlice(roll, data, tot);

                var finalData = getPieData(allData);
                // console.log(newData);
                finalData[currentSet-1] = newData;

                chart.load({
                    columns: finalData,
                    order: null
                });

            }
		}

	}}).use('screenPosition', {scale: 0.6})

	$(".gauge-btn").on("click", function() {
		$('h1').html("Gauge Chart");
		currentType = 'gauge';
		chart.transform('gauge', ['data1']);
	});

	$(".bar-btn").on("click", function() {
		$('h1').html("Bar Chart");
		currentType = 'bar';
		chart.transform('bar', ['data1', 'data2', 'data3']);
	});

	$(".line-btn").on("click", function() {
		$('h1').html("Line Chart");
		currentType = 'line';
		chart.transform('line', ['data1', 'data2', 'data3']);
	});

	$(".pie-btn").on("click", function() {
		$('h1').html("Pie Chart");
		currentType = 'pie';
		chart.transform('pie', ['data1', 'data2', 'data3']);
	});


});