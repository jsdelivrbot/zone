import {setCookie,getCookie} from './cookie.js';
//获取接口域名
export function getOpenUrl(){
    return 'http://openzone.iwsoft.net/';
  //正式域名
//  return 'http://open.zonezte.com/';
  //ios域名
//return 'http://ios.zonezte.com/';
}

export function getToken(){
  //return android?android.getToken():null;
  return getCookie('token');
}

export function getStatus(){
  return StatusBar?StatusBar.styleDefault():null;
}

//插入内容
export function insertHtmlAtCaret(html){
	var sel, range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
}

//评星
export function Star(){
	var T$ = function(id) {
		return document.getElementById(id)
	};
	var T$$ = function(r, t) {
		return (r || document).getElementsByTagName(t)
	};
	var Init = function(cid, rid, hid, config) {
		var lis = T$$(T$(cid), 'li'), curA;
		//设置默认几颗星
		if (config.rate){
			T$(rid).innerHTML = '<em>' + (T$(hid).value = T$$(T$(cid), 'a')[config.rate-1].getAttribute('star:value')) + '分</em> - ' + config.info[config.rate-1];
			curA = T$$(T$(cid), 'a')[config.rate-1];
			curA && (curA.className += config.curcss);
		}
		for (var i = 0, len = lis.length; i < len; i++) {
			lis[i]._val = i;
			lis[i].onclick = function() {
				T$(rid).innerHTML = '<em>' + (T$(hid).value = T$$(this, 'a')[0].getAttribute('star:value')) + '分</em> - ' + config.info[this._val];
				curA = T$$(T$(cid), 'a')[T$(hid).value / config.step - 1];
			};
			lis[i].onmouseout = function() {
				curA && (curA.className += config.curcss);
			};
			lis[i].onmouseover = function() {
				curA && (curA.className = curA.className.replace(config.curcss, ''));
			};
		};
	};
	return {init: Init}
}

//检查字数
export function checkWord(len, evt, wordCheckNumID){
	var len = ('undefined' == typeof(len) ? 0 : len);
	if(len < 1) {
		return true;
	}

	if(evt == null) evt = window.event;
	if(typeof evt == 'string'){
		var src = $('#'+evt).val();
		var src = ('undefined' == typeof(src) ? '' : src);
		var str = $.trim(src);
	}else{
		var src = evt.srcElement ? evt.srcElement : evt.target;
		var str = $.trim(src.value);
	}

	var myLen =0;
	var i=0;
	for(; (i < str.length) && (myLen <= len * 2); i++){
		if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128){
			myLen++;
		}else{
			myLen += 2;
		}
	}

	if(myLen > len * 2){
		src.value = str.substring(0, i-1);
	}else{
		if ($('#'+wordCheckNumID).length > 0){
			//$('#'+wordCheckNumID).html(Math.floor((len * 2 - myLen)));
			//$('#'+wordCheckNumID).html(Math.floor((len * 2 - myLen)));
			$('#'+wordCheckNumID).html(Math.floor((len - myLen / 2)));
			//$('#'+wordCheckNumID).html('已输入'+Math.floor(myLen / 2)+'个字');
		}
	}
}

//输入长度提示
export function strlen_verify(obj, checklen, maxlen) {
	var v = obj.value,
		charlen = 0,
		maxlen = !maxlen ? 200 : maxlen,
		curlen = maxlen,
		len = strlen(v);
	var charset = 'utf-8';
	for (var i = 0; i < v.length; i++) {
		if (v.charCodeAt(i) < 0 || v.charCodeAt(i) > 255) {
			curlen -= charset == 'utf-8' ? 2 : 1;
		}
	}
	if (curlen >= len) {
		$('#' + checklen).html(curlen - len);
	} else {
		obj.value = mb_cutstr(v, maxlen, true);
	}
}

//长度统计
export function strlen(str) {
	return ($.browser.msie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

//截取字符串
export function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : '';

	maxlen = maxlen - dot.length;
	for (var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if (len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}

export default{
	install(Vue){
		// 向Vue对象上添加方法，保存popup值
		Vue.prototype.savePopup = (value) => {
			//如果存在-新增，否则-创建
			if(sessionStorage.getItem('popupArr')){
				let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
				tempArr.push(value)
				sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
			}else{
				let arr = [value]
				sessionStorage.setItem('popupArr',JSON.stringify(arr))
			}
		},
		Vue.prototype.removePopup = () =>{
			if(sessionStorage.getItem('popupArr')){
				let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
				tempArr.pop()
				sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
			}
		}
	}
}
