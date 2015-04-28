var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Draggable = famous.modifiers.Draggable;
var GridLayout = famous.views.GridLayout;

var mainContext = Engine.createContext();

var setupCursor = function(cursor) {

	var cursorSurface = new Surface({
	    size : [10, 10],
	    properties : {
	        backgroundColor: '#9EE89F',
	        borderRadius: 10/2 + 'px',
	        pointerEvents : 'none',
	        zIndex: 1
	    }
	});

	var cursorOriginModifier = new StateModifier({origin: [0.5, 0.5]});
	var cursorModifier = new Modifier({
	    transform : function(){
			var cursorPosition = this.get('screenPosition');
			return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
		}.bind(cursor)
	});

	mainContext.add(cursorOriginModifier).add(cursorModifier).add(cursorSurface);
};

var Cursor = Backbone.Model.extend({
	defaults: {
		screenPosition: [0, 0]
	},
	setScreenPosition: function(position) {
		this.set('screenPosition', position.slice(0));
	}
});
var cursor = new Cursor()
setupCursor(cursor);