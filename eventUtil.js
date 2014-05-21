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
	getCharCode: function(ev) {
		return typeof ev.charCode == 'number' ? ev.charCode : ev.keyCode;
	},
	getClipboardText: function(ev) {
		var cb = ev.clipboardData || window.clipboardData;
		return cb.getData('text');
	},
	getEvent: function(ev) {
		return ev ? ev : window.event;
	},
	getSelectText: function(el) {
		return typeof el.selectionStart == 'number' ? el.value.substring(el.selectionStart, el.selectionEnd) : document.selection.createRange().text;
	},
	getTarget: function(ev) {
		return ev.target || ev.srcElement;
	},
	getTransferData: function(ev, type) {
		var dataTransfer = ev.dataTransfer;
		if(type == 'url') {
			return dataTransfer.getData('url') || dataTransfer.getData('text/uri-list');
		} else  if(type == 'text') {
			return dataTransfer.getData('Text');//ff5-  don'y support text => text/plain
		}
	},
	getWheelDelta: function(ev) {
		if(ev.wheelDelta) {
			return ev.wheelDelta;
		} else {
			return -ev.detail * 40;
		}
	},
	preventDefault: function(ev) {
		if(ev.preventDefault) {
			ev.preventDefault();
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
	setClipboardText: function(ev, val) {
		return ev.clipboardData ? ev.clipboardData.setData('text/plain' ,val) : (window.clipboardData ? window.clipboardData.setData('text', val) : '');
	},
	setSelectText: function(el, start, end) {
		if(el && el.setSelectionRange) {
			el.setSelectionRange(start, end);
		} else {
			var range = el.createTextRange();
			range.collapse();
			range.moveStart('character', start);
			range.moveEnd('character', end - start);
			range.select();
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
