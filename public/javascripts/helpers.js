var getOverlappingChart = function(position, params, type) {

	svgMargin = params[0];
	svgWidth = params[1];
	svgTop = params[2];
	svgHeight = params[3];

	if (position[0] >= svgMargin && position[0] <= svgMargin + svgWidth) {
		if (position[1] >= svgTop && position[1] <= svgTop + svgHeight) {
			$(document).find("svg").css("background-color","lightsteelblue");
			return chart;
		}
		else {
			$(document).find("svg").css("background-color","white");
			return false;
		}
	}
	else {
		$(document).find("svg").css("background-color","white");
		return false;
	}
}

var getOverlappingColumn = function(position, params, cols, chartMargin) {
	svgMargin = params[0];
	svgWidth = params[1];
	svgTop = params[2];
	svgHeight = params[3];

	if (position[0] >= svgMargin+chartMargin && position[0] <= svgMargin+svgWidth) {
		if (position[1] >= svgTop && position[1] <= svgTop + svgHeight) {
			var ratio = (position[0]-(svgMargin+chartMargin))/(svgWidth-chartMargin);
			return Math.ceil(ratio*cols);
		}
	}
}

// GAUGE

var normalizeRoll = function(roll) {
	result = -1*roll + Math.PI/2;
	result = result*(100/(Math.PI));
	console.log(result);
	if (result > 100) {
		return 100;
	}
	else if (result < 0) {
		return 0;
	}
	else {
		return Math.round(result);
	}
}

// BAR

var getExtendedFingers = function(hand) {
	var fingers = hand.fingers;
	var result = 0;
	for (var i=1; i<5; i++) {
		if (fingers[i].extended) {
			result = result + 1;
		}
	}
	return result;
}

var getMaxValue = function(values) {
	var currentMax = 0;
	for (var i=0; i<values.length; i++) {
		if (values[i].value > currentMax) {
			currentMax = values[i].value;
		}
	}
	return currentMax;
}

var getDataArray = function(set, values) {
	var result = ['data'+set.toString()];
	for (var i=0; i<values.length; i++) {
		result.push(values[i].value);
	}
	return result;
}

var normalizeHeight = function(max, height, top, position) {
	return Math.round(max*(height-(position-top))/height);
}

// PIE

var incrementSlice = function(roll, data, tot) {
	var speed = (data[1]/tot)*(roll-50)/20;
	if (data[1] + speed < 0) {
		data[1] = 0;
	}
	else {
		data[1] = data[1] + speed;
	}
	return data;
}

var getPieData = function(values) {
	result = [];
	for (var i=0; i<values.length; i++) {
		result.push([values[i].id, values[i].values[0].value]);
	}
	return result;
}
