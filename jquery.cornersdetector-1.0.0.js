/**
 * @author Michele Andreoli <michi.andreoli[at]gmail.com>
 * @website http://jabprogramming.com
 * @name jquery.cornersdetector-1.0.0.js
 * @version 1.0.0 updated 03-10-2011
 * @license http://opensource.org/licenses/gpl-license-php GNU Public License
 * @package CornersDetector
 */
(function($){
    $.fn.extend({
    	_aprox: function(num) {
			return Math.round(num * 100) / 100;;
		},
    	
    	_checkStaticCorners: function(container_pts, elem_pts) {
			var points = new Array();
										
			if (elem_pts.a.x < 0 || elem_pts.a.y < 0 || elem_pts.a.x > container_pts.c.x || elem_pts.a.y > container_pts.c.y) {								
				var offset = $.fn._calculateOffset(elem_pts.a, container_pts);
				points.push({ 'point': elem_pts.a, 'offset': offset });				
			}
			if (elem_pts.b.x < 0 || elem_pts.b.y < 0 || elem_pts.b.x > container_pts.c.x || elem_pts.b.y > container_pts.c.y) {
				var offset = $.fn._calculateOffset(elem_pts.b, container_pts);
				points.push({ 'point': elem_pts.b, 'offset': offset });
			}
			if (elem_pts.c.x < 0 || elem_pts.c.y < 0 || elem_pts.c.x > container_pts.c.x || elem_pts.c.y > container_pts.c.y) {
				var offset = $.fn._calculateOffset(elem_pts.c, container_pts);
				points.push({ 'point': elem_pts.c, 'offset': offset });
			}
			if (elem_pts.d.x < 0 || elem_pts.d.y < 0 || elem_pts.d.x > container_pts.c.x || elem_pts.d.y > container_pts.c.y) {
				var offset = $.fn._calculateOffset(elem_pts.d, container_pts);
				points.push({ 'point': elem_pts.d, 'offset': offset });
			}			
			
			return points;
		},
		
		_checkDynamicCorners: function(container_pts, elem_pt) {
			var epoint = elem_pt;
			if (epoint.x < 0 || epoint.y < 0 || epoint.x > container_pts.c.x || epoint.y > container_pts.c.y) {	
				var offset = $.fn._calculateOffset(epoint, container_pts);
			
				return { 'point': epoint, 'offset': offset };
			}
			else {
				return null;
			}
		},

		_calculateOffset: function(point, container) {
			var x = point.x;
			var y = point.y;
			var offsetx = 0;
			var offsety = 0;
			
			if (point.x < container.a.x) {
				offsetx = $.fn._aprox(container.a.x - point.x);
			}
			if (point.y < container.a.y) {				
				offsety = $.fn._aprox(container.a.y - point.y);
			}
			if (point.x > container.c.x) {
				offsetx = $.fn._aprox(container.c.x - point.x);
			}
			if (point.y > container.c.y) {
				offsety = $.fn._aprox(container.c.y - point.y);
			}

			return { 'x': offsetx, 'y': offsety };
		},
		
		_getCorners: function(container, elem, degs) {
			//container properties	
			//var cborder = (container.outerWidth() - Math.ceil(container.width()));
			var cwidth = container.width(); //+ cborder;
			var cheight = container.height(); //+ cborder;
			var ctop = 0; //container.position().top;
			var cleft = 0;//container.position().left;					
			var c1 = { 'x': cwidth+cleft, 'y': cheight+ctop};
			var c2 = { 'x': cleft, 'y': cheight+ctop};
			var c3 = { 'x': cleft, 'y': ctop};
			var c4 = { 'x': cwidth+cleft, 'y': ctop};
			var ccoords = { 'a': c3, 'b': c4, 'c': c1, 'd': c2 };								
			//element properties
			var edegs = -degs;		
			var eRadDegs = $.fn._aprox(Math.PI * edegs / 180);
			var eborder = (Math.ceil(elem.outerWidth()) - Math.ceil(elem.width()));
			var ewidth = Math.ceil(elem.width()) + eborder;
			var eheight = Math.ceil(elem.height()) + eborder;
			//Fix for IE7,IE8
			var iefix_top = 0;
			var iefix_left = 0;			
			if ( ($.browser.msie) && ((parseInt($.browser.version) < 9) || (document.documentMode < 9))) {
				//TODO: scoprire di quanto incrementare
			}
			//end fix
			var etop = $.fn._aprox(elem[0].offsetTop) + iefix_top;
			var eleft = $.fn._aprox(elem[0].offsetLeft) + iefix_left;
			var offset = { 'x': (eleft + $.fn._aprox(ewidth / 2)), 'y': (etop + $.fn._aprox(eheight / 2))};
			//traslated points
			var e1_t = { 'x': (ewidth+eleft)-offset.x, 'y': $.fn._aprox((-1)*((eheight+etop)-offset.y))};
			var e2_t = { 'x': eleft-offset.x, 'y': $.fn._aprox((-1)*((eheight+etop)-offset.y))};
			var e3_t = { 'x': eleft-offset.x, 'y': $.fn._aprox((-1)*(etop-offset.y))};
			var e4_t = { 'x': (ewidth+eleft)-offset.x, 'y': $.fn._aprox((-1)*(etop-offset.y))};			
			//xb = xa cos(alpha) - ya sin(alpha) 
			//yb = xa sin(alpha) + ya cos(alpha)	
			var e1_xb = $.fn._aprox(($.fn._aprox(e1_t.x * $.fn._aprox(Math.cos(eRadDegs))) - $.fn._aprox(e1_t.y * $.fn._aprox(Math.sin(eRadDegs)))));
			var e1_yb = $.fn._aprox(($.fn._aprox(e1_t.x * $.fn._aprox(Math.sin(eRadDegs))) + $.fn._aprox(e1_t.y * $.fn._aprox(Math.cos(eRadDegs)))));	
			var e1 = { 'x': $.fn._aprox(e1_xb+offset.x), 'y': $.fn._aprox(-e1_yb+offset.y)};
			var e2_xb = $.fn._aprox(($.fn._aprox(e2_t.x * $.fn._aprox(Math.cos(eRadDegs))) - $.fn._aprox(e2_t.y * $.fn._aprox(Math.sin(eRadDegs)))));
			var e2_yb = $.fn._aprox(($.fn._aprox(e2_t.x * $.fn._aprox(Math.sin(eRadDegs))) + $.fn._aprox(e2_t.y * $.fn._aprox(Math.cos(eRadDegs)))));		
			var e2 = { 'x': $.fn._aprox(e2_xb+offset.x), 'y': $.fn._aprox(-e2_yb+offset.y)};
			var e3_xb = $.fn._aprox(($.fn._aprox(e3_t.x * $.fn._aprox(Math.cos(eRadDegs))) - $.fn._aprox(e3_t.y * $.fn._aprox(Math.sin(eRadDegs)))));
			var e3_yb = $.fn._aprox(($.fn._aprox(e3_t.x * $.fn._aprox(Math.sin(eRadDegs))) + $.fn._aprox(e3_t.y * $.fn._aprox(Math.cos(eRadDegs)))));	
			var e3 = { 'x': $.fn._aprox(e3_xb+offset.x), 'y': $.fn._aprox(-e3_yb+offset.y)};
			var e4_xb = $.fn._aprox(($.fn._aprox(e4_t.x * $.fn._aprox(Math.cos(eRadDegs))) - $.fn._aprox(e4_t.y * $.fn._aprox(Math.sin(eRadDegs)))));
			var e4_yb = $.fn._aprox(($.fn._aprox(e4_t.x * $.fn._aprox(Math.sin(eRadDegs))) + $.fn._aprox(e4_t.y * $.fn._aprox(Math.cos(eRadDegs)))));	
			var e4 = { 'x': $.fn._aprox(e4_xb+offset.x), 'y': $.fn._aprox(-e4_yb+offset.y)};
			var ecoords = { 'a': e3, 'b': e4, 'c': e1, 'd': e2 };

			//Fix for IE7,IE8
			if ( ($.browser.msie) && ((parseInt($.browser.version) < 9) || (document.documentMode < 9))) {
				ecoords = $.fn._ie78Fix(ecoords);
			}
			//end fix
			
			return { 'elem_pts': ecoords, 'container_pts': ccoords };		
		},
		
		/**
		 * Move element inside its container if a corner is out
		 * @param degs
		 **/
		moveElement: function(degs) {
			return this.each(function() {
				var elem = $(this);
				if (!degs) { degs = 0; }	
				for (var idx = 0; idx < 4; idx++) {				
					var objects = $.fn._getCorners(elem.parent(), elem, degs);
					var arr = new Array(objects.elem_pts.a, objects.elem_pts.b, objects.elem_pts.c, objects.elem_pts.d);
					var point = $.fn._checkDynamicCorners(objects.container_pts, arr[idx]);
					if (point) {
						var csstop = parseFloat(elem.css('top').split('px')[0], 10);
						var cssleft = parseFloat(elem.css('left').split('px')[0], 10);
						csstop = $.fn._aprox(csstop + point.offset.y);
						cssleft = $.fn._aprox(cssleft + point.offset.x);
						
						elem.css('top', csstop + 'px');
						elem.css('left', cssleft + 'px');
					}
				}
			});
		},
		
		_ie78Fix: function(elem_pts) {
			var minx = elem_pts.a.x;
			var maxx = 0;
			var miny = elem_pts.a.y;
			var maxy = 0;
			
			for (var key in elem_pts) {
				if (elem_pts[key].x >= maxx) {					
					maxx = elem_pts[key].x
				}				
				if (elem_pts[key].x <= minx) {					
					minx = elem_pts[key].x;
				}
				if (elem_pts[key].y >= maxy) {					
					maxy = elem_pts[key].y;
				}
				if (elem_pts[key].y <= miny) {					
					miny = elem_pts[key].y;
				}
			}
			
			return { 'a': { 'x': minx, 'y': miny }, 'b': { 'x': maxx, 'y': miny }, 'c': { 'x': maxx, 'y': maxy }, 'd': { 'x': minx, 'y': maxy } };
		},
		
		/**
		 * Get corners coords of the element and its container
		 * @param degs
		 * @return {elem_pts[], container_pts[]}
		 **/
		getCorners: function(degs) {
			if (!degs) { degs = 0; }
			var elem = $(this);
			var container = $(this).parent();
						
			return $.fn._getCorners(container, elem, degs);
		},
		
		/**
		 * Check if the corners is out of its container
		 * @param degs
		 * @return array{point[], newpoint[]}
		 **/
		checkCorners: function(degs) {
			if (!degs) { degs = 0; }
			var elem = $(this);
			var container = $(this).parent();
			var objects = $.fn._getCorners(container, elem, degs);
			
			return $.fn._checkStaticCorners(objects.container_pts, objects.elem_pts);
		}
    });
})(jQuery)