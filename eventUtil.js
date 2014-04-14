var eventUtil ={
	addHandler: function(el, type, handler) {
		if(window.addEventListener) {
			el.addEventListener(type, handler, false);
		} else if(window.attachEvent) {
			el.attachEvent('on' + type, handler);
		} else {
			el['on' + type] = handler;
		}
	},
	getButton: function(ev) {
		if(typeof document.implementation.hasFeature == 'function' && document.implementation.hasFeature('MouseEvents', '2.0')) {
			return ev.button;
		} else {
			switch(ev.button) {
				case 4:
					return 1;
				case 2:
				case 6:
				   return 2;
				default:
				   return 0;
			}
		}
	},
	getEvent: function(ev) {
		return ev ? ev : window.event;
	},
	getTarget: function(ev) {
		return ev.target || ev.srcElement;
	},
	preventDefault: function(ev) {
		if(ev.preventDefault) {
			ev.prevDefault();
		} else {
			ev.returnValue =  false;
		}
	},
	removeHandler: function(el, type, handler) {
		if(el.removeEventListener) {
			el.removeEventListener(type, handler, false);
		} else if(el.detachEvent) {
			el.detachEvent('on'+type, handler);
		} else {
			el['on' + type] =null;
		}
	},
	stopPropagation: function(ev) {
		if(ev.stopPropagation) {
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true;
		}
	}
}
