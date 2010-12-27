var embed=dojo={};embed.config={};embed.global=window;embed.doc=document;embed.body=function(){return document.body;};["indexOf","lastIndexOf","forEach","map","some","every","filter"].forEach(function(_1,_2){dojo[_1]=function(_3,_4,_5){if((_2>1)&&(typeof _4=="string")){_4=new Function("item","index","array",_4);}return Array.prototype[_1].call(_3,_4,_5);};});dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var i,_6;_6=[].concat(ls);for(i in _6){if(!(i in ap)){_6[i].apply(this,arguments);}}return r;};},add:function(_7,_8,_9){_7=_7||dojo.global;var f=_7[_8];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=_7[_8]=d;}return f._listeners.push(_9);},remove:function(_a,_b,_c){var f=(_a||dojo.global)[_b];if(f&&f._listeners&&_c--){delete f._listeners[_c];}}};dojo.connect=dojo.on=function(_d,_e,_f,_10,_11){var a=arguments,_12=[],i=0;_12.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];_12.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){_12.push(a[i]);}return dojo._connect.apply(this,_12);};dojo._connect=function(obj,_13,_14,_15){var l=dojo._listener,h=l.add(obj,_13,dojo.hitch(_14,_15));return [obj,_13,h,l];};dojo.disconnect=function(_16){if(_16&&_16[0]!==undefined){dojo._disconnect.apply(this,_16);delete _16[0];}};dojo._disconnect=function(obj,_17,_18,_19){_19.remove(obj,_17,_18);};(function(){var del=(dojo._event_listener={add:function(_1a,_1b,fp){if(!_1a){return;}_1b=del._normalizeEventName(_1b);_1a.addEventListener(_1b,fp,false);return fp;},remove:function(_1c,_1d,_1e){if(_1c){_1d=del._normalizeEventName(_1d);_1c.removeEventListener(_1d,_1e,false);}},_normalizeEventName:function(_1f){return _1f.slice(0,2)=="on"?_1f.slice(2):_1f;}});dojo.fixEvent=function(evt,_20){return del._fixEvent(evt,_20);};dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};dojo._connect=function(obj,_21,_22,_23,_24){var _25=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=_25?1:0,l=[dojo._listener,del][lid];var h=l.add(obj,_21,dojo.hitch(_22,_23));return [obj,_21,h,lid];};dojo._disconnect=function(obj,_26,_27,_28){([dojo._listener,del][_28]).remove(obj,_26,_27);};})();dojo._topics={};dojo.subscribe=function(_29,_2a,_2b){return [_29,dojo._listener.add(dojo._topics,_29,dojo.hitch(_2a,_2b))];};dojo.unsubscribe=function(_2c){if(_2c){dojo._listener.remove(dojo._topics,_2c[0],_2c[1]);}};dojo.publish=function(_2d,_2e){var f=dojo._topics[_2d];if(f){f.apply(this,_2e||[]);}};dojo.connectPublisher=function(_2f,obj,_30){var pf=function(){dojo.publish(_2f,arguments);};return _30?dojo.connect(obj,_30,pf):dojo.connect(obj,pf);};dojo.isString=function(it){return (typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};dojo.isFunction=(function(){var _31=function(it){var t=typeof it;return it&&(t=="function"||it instanceof Function)&&!it.nodeType;};return dojo.isSafari?function(it){if(typeof it=="function"&&it=="[object NodeList]"){return false;}return _31(it);}:_31;})();dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));};dojo.isArrayLike=function(it){var d=dojo;return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};dojo.isAlien=function(it){return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo.isNumeric=function(n){return n==parseFloat(n);};dojo.isNumber=function(n){return typeof n=="number"||n instanceof Number;};dojo._hitchArgs=function(_32,_33){var pre=dojo.toArray(arguments,2);var _34=dojo.isString(_33);return function(){var _35=dojo.toArray(arguments);var f=_34?(_32||dojo.global)[_33]:_33;return f&&f.apply(_32||this,pre.concat(_35));};};dojo.hitch=function(_36,_37){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments);}if(!_37){_37=_36;_36=null;}if(dojo.isString(_37)){_36=_36||dojo.global;if(!_36[_37]){throw (["dojo.hitch: scope[\"",_37,"\"] is null (scope=\"",_36,"\")"].join(""));}return function(){return _36[_37].apply(_36,arguments||[]);};}return !_36?_37:function(){return _37.apply(_36,arguments||[]);};};(function(d){(function(){dojo.__mutator=function(){};var _38=Object.freeze||function(){};dojo.Promise=function(_39){var _3a,_3b,_3c,_3d,_3e;var _3f=this.promise={};function _40(_41){if(_3b){throw new Error("This deferred has already been resolved");}_3a=_41;_3b=true;_42();};function _42(){var _43;while(!_43&&_3e){var _44=_3e;_3e=_3e.next;if(_43=(_44.progress==dojo.__mutator)){_3b=false;}var _45=(_3c?_44.error:_44.resolved);if(_45){try{var _46=_45(_3a);if(_46&&typeof _46.then==="function"){_46.then(dojo.hitch(_44.deferred,"resolve"),dojo.hitch(_44.deferred,"reject"));continue;}var _47=_43&&_46===undefined;_44.deferred[_47&&_3c?"reject":"resolve"](_47?_3a:_46);}catch(e){_44.deferred.reject(e);}}else{if(_3c){_44.deferred.reject(_3a);}else{_44.deferred.resolve(_3a);}}}};this.resolve=function(_48){this.fired=0;this.results=[_48,null];_40(_48);};this.reject=function(_49){_3c=true;this.fired=1;_40(_49);this.results=[null,_49];if(!_49||_49.log!==false){(dojo.config.deferredOnError||function(x){})(_49);}};this.progress=function(_4a){var _4b=_3e;while(_4b){var _4c=_4b.progress;_4c&&_4c(_4a);_4b=_4b.next;}};this.then=_3f.then=function(_4d,_4e,_4f){var _50=_4f==dojo.__mutator?this:new dojo.Promise(_3f.cancel);var _51={resolved:_4d,error:_4e,progress:_4f,deferred:_50};if(_3e){_3d=_3d.next=_51;}else{_3e=_3d=_51;}if(_3b){_42();}return _50.promise;};var _52=this;this.cancel=_3f.cancel=function(){if(!_3b){var _53=_39&&_39(_52);if(!_3b){if(!(_53 instanceof Error)){_53=new Error(_53);}_53.log=false;_52.reject(_53);}}};_38(_3f);};})();})(dojo);dojo.when=function(_54,_55,_56,_57){if(_54&&typeof _54.then==="function"){return _54.then(_55,_56,_57);}return _55(_54);};(function(d){var _58={},_59;for(var i in {toString:1}){_59=[];break;}dojo._extraNames=_59=_59||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString"];d._mixin=function(_5a,_5b){var _5c,s,i=0,l=_59.length;for(_5c in _5b){s=_5b[_5c];if(s!==_58[_5c]&&s!==_5a[_5c]){_5a[_5c]=s;}}if(l&&_5b){for(;i<l;++i){_5c=_59[i];s=_5b[_5c];if(s!==_58[_5c]&&s!==_5a[_5c]){_5a[_5c]=s;}}}return _5a;};dojo.mixin=function(obj,_5d){if(!obj){obj={};}for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}return obj;};dojo.safeMixin=function(_5e,_5f){var _60,t,i=0,l=d._extraNames.length;var op=Object.prototype,_61=op.toString,_62="constructor";for(_60 in _5f){t=_5f[_60];if((t!==op[_60]||!(_60 in op))&&_60!=_62){if(_61.call(t)=="[object Function]"){t.nom=_60;}_5e[_60]=t;}}for(;i<l;++i){_60=d._extraNames[i];t=_5f[_60];if((t!==op[_60]||!(_60 in op))&&_60!=_62){if(_61.call(t)=="[object Function]"){t.nom=_60;}_5e[_60]=t;}}return _5e;};}(dojo));dojo.extend=function(_63,_64){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(_63.prototype,arguments[i]);}return _63;};dojo.Deferred=dojo.Promise;dojo.extend(dojo.Deferred,{callback:function(_65){this.resolve(_65);},errback:function(_66){this.reject(_66);},addCallbacks:function(_67,_68){this.then(_67,_68,dojo.__mutator);return this;},addCallback:function(_69){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(_6a){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addBoth:function(_6b){var _6c=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(_6c,_6c);},fired:-1});dojo.byId=function(id,doc){return (typeof id=="string")?(doc||document).getElementById(id):id;};(function(d){var _6d=null,_6e;d.destroy=function(_6f){_6f=dojo.byId(_6f);try{var doc=_6f.ownerDocument;if(!_6d||_6e!=doc){_6d=doc.createElement("div");_6e=doc;}_6d.appendChild(_6f.parentNode?_6f.parentNode.removeChild(_6f):_6f);_6d.innerHTML="";}catch(e){}};})(dojo);(function(d){d._getComputedStyle=function(_70){return _70.nodeType==1?_70.ownerDocument.defaultView.getComputedStyle(_70,null):{};};var _71="cssFloat",_72={"cssFloat":_71,"styleFloat":_71,"float":_71};d._style=function(_73,_74,_75){var n=dojo.byId(_73),l=arguments.length;_74=_72[_74]||_74;if(l==3){return n.style[_74]=_75;}var s=d._getComputedStyle(n);if(l==2&&typeof _74!="string"){for(var x in _74){d._style(_73,x,_74[x]);}return s;}return (l==1)?s:parseFloat(s[_74]||n.style[_74])||s[_74];};})(dojo);dojo.getComputedStyle=dojo._getComputedStyle;dojo.style=dojo._style;(function(d){var _76={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_77={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_78={innerHTML:1,className:1,htmlFor:false,value:1};var _79=function(_7a){return _77[_7a.toLowerCase()]||_7a;};var _7b=function(_7c,_7d){var _7e=_7c.getAttributeNode&&_7c.getAttributeNode(_7d);return _7e&&_7e.specified;};dojo.hasAttr=function(_7f,_80){var lc=_80.toLowerCase();return _78[_76[lc]||_80]||_7b(d.byId(_7f),_77[lc]||_80);};var _81={},_82=0,_83="_attrid",_84={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(_85,_86,_87){_85=d.byId(_85);var _88=arguments.length,_89;if(_88==2&&typeof _86!="string"){for(var x in _86){d.attr(_85,x,_86[x]);}return _85;}var lc=_86.toLowerCase(),_8a=_76[lc]||_86,_8b=_78[_8a],_8c=_77[lc]||_86;if(_88==3){do{if(_8a=="style"&&typeof _87!="string"){d.style(_85,_87);break;}if(_8a=="innerHTML"){_85[_8a]=_87;break;}if(d.isFunction(_87)){var _8d=d.attr(_85,_83);if(!_8d){_8d=_82++;d.attr(_85,_83,_8d);}if(!_81[_8d]){_81[_8d]={};}var h=_81[_8d][_8a];if(h){d.disconnect(h);}else{try{delete _85[_8a];}catch(e){}}_81[_8d][_8a]=d.connect(_85,_8a,_87);break;}if(_8b||typeof _87=="boolean"){_85[_8a]=_87;break;}_85.setAttribute(_8c,_87);}while(false);return _85;}_87=_85[_8a];if(_8b&&typeof _87!="undefined"){return _87;}if(_8a!="href"&&(typeof _87=="boolean"||d.isFunction(_87))){return _87;}return _7b(_85,_8c)?_85.getAttribute(_8c):null;};dojo.removeAttr=function(_8e,_8f){d.byId(_8e).removeAttribute(_79(_8f));};})(dojo);(function(d){var _90=d.byId;var _91={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_92=/<\s*([\w\:]+)/,_93={},_94=0,_95="__"+d._scopeName+"ToDomId";for(var _96 in _91){var tw=_91[_96];tw.pre=_96=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}d._toDom=function(_97,doc){doc=doc||d.doc;var _98=doc[_95];if(!_98){doc[_95]=_98=++_94+"";_93[_98]=doc.createElement("div");}_97+="";var _99=_97.match(_92),tag=_99?_99[1].toLowerCase():"",_9a=_93[_98],_9b,i,fc,df;if(_99&&_91[tag]){_9b=_91[tag];_9a.innerHTML=_9b.pre+_97+_9b.post;for(i=_9b.length;i;--i){_9a=_9a.firstChild;}}else{_9a.innerHTML=_97;}if(_9a.childNodes.length==1){return _9a.removeChild(_9a.firstChild);}df=doc.createDocumentFragment();while(fc=_9a.firstChild){df.appendChild(fc);}return df;};d._docScroll=function(){var n=d.global;return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:n.scrollLeft,y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));};var _9c=function(_9d,ref){var _9e=ref.parentNode;if(_9e){_9e.insertBefore(_9d,ref);}};var _9f=function(_a0,ref){var _a1=ref.parentNode;if(_a1){if(_a1.lastChild==ref){_a1.appendChild(_a0);}else{_a1.insertBefore(_a0,ref.nextSibling);}}};d.place=function(_a2,_a3,_a4){_a3=_90(_a3);if(typeof _a2=="string"){_a2=_a2.charAt(0)=="<"?d._toDom(_a2,_a3.ownerDocument):_90(_a2);}if(typeof _a4=="number"){var cn=_a3.childNodes;if(!cn.length||cn.length<=_a4){_a3.appendChild(_a2);}else{_9c(_a2,cn[_a4<0?0:_a4]);}}else{switch(_a4){case "before":_9c(_a2,_a3);break;case "after":_9f(_a2,_a3);break;case "replace":_a3.parentNode.replaceChild(_a2,_a3);break;case "only":d.empty(_a3);_a3.appendChild(_a2);break;case "first":if(_a3.firstChild){_9c(_a2,_a3.firstChild);break;}default:_a3.appendChild(_a2);}}return _a2;};d.create=function(tag,_a5,_a6,pos){var doc=d.doc;if(_a6){_a6=_90(_a6);doc=_a6.ownerDocument;}if(typeof tag=="string"){tag=doc.createElement(tag);}if(_a5){for(var _a7 in _a5){switch(_a7){case "class":tag.className=_a5[_a7];break;default:tag[_a7]=_a5[_a7];}}}if(_a6){d.place(tag,_a6,pos);}return tag;};d.empty=function(_a8){_90(_a8).innerHTML="";};})(dojo);dojo._getProp=function(_a9,_aa,_ab){var obj=_ab||dojo.global;for(var i=0,p;obj&&(p=_a9[i]);i++){obj=(p in obj?obj[p]:(_aa?obj[p]={}:undefined));}return obj;};dojo.setObject=function(_ac,_ad,_ae){var _af=_ac.split("."),p=_af.pop(),obj=dojo._getProp(_af,true,_ae);return obj&&p?(obj[p]=_ad):undefined;};dojo.getObject=function(_b0,_b1,_b2){return dojo._getProp(_b0.split("."),_b1,_b2);};dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};var _pattern=/\{([^\}]+)\}/g;dojo.replace=function(_b3,map,_b4){return _b3.replace(_b4||_pattern,dojo.isFunction(map)?map:function(_b5,k){return dojo.getObject(k,false,map);});};dojo.hasClass=function(_b6,_b7){return ((" "+dojo.byId(_b6).className+" ").indexOf(" "+_b7+" ")>=0);};dojo.toggleClass=function(_b8,_b9,_ba){if(_ba===undefined){_ba=!dojo.hasClass(_b8,_b9);}dojo[_ba?"addClass":"removeClass"](_b8,_b9);};(function(){var _bb=/\s+/;var _bc=function(s){if(typeof s=="string"||s instanceof String){if(s.indexOf(" ")<0){return [s];}else{return dojo.trim(s).split(_bb);}}return s;};dojo.addClass=function(_bd,_be){_bd=dojo.byId(_bd);_be=_bc(_be);var cls=" "+_bd.className+" ";for(var i=0,len=_be.length,c;i<len;++i){c=_be[i];if(c&&cls.indexOf(" "+c+" ")<0){cls+=c+" ";}}_bd.className=dojo.trim(cls);};dojo.removeClass=function(_bf,_c0){_bf=dojo.byId(_bf);var cls;if(_c0!==undefined){_c0=_bc(_c0);cls=" "+_bf.className+" ";for(var i=0,len=_c0.length;i<len;++i){cls=cls.replace(" "+_c0[i]+" "," ");}cls=dojo.trim(cls);}else{cls="";}if(_bf.className!=cls){_bf.className=cls;}};})();dojo.hasClass=function(_c1,_c2){return _c1.classList.contains(_c2);};dojo.toggleClass=function(_c3,_c4,_c5){if(_c5===undefined){_c5=!dojo.hasClass(_c3,_c4);}dojo[_c5?"addClass":"removeClass"](_c3,_c4);};(function(){var _c6=/\s+/;var _c7=function(s){if(typeof s=="string"||s instanceof String){if(s.indexOf(" ")<0){return [s];}else{return dojo.trim(s).split(_c6);}}return s;};dojo.addClass=function(_c8,_c9){var _ca=_c7(_c9);for(var i=0,l=_ca.length;i<l;i++){_c8.classList.add(_ca[i]);}};dojo.removeClass=function(_cb,_cc){if(_cc===undefined){_cb.className="";}else{var _cd=_c7(_cc);for(var i=0,l=_cd.length;i<l;i++){_cb.classList.remove(_cd[i]);}}};})();(function(d){d._loaders=[];d._loadNotifying=false;d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else{if(fn){var _ce=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){_ce.call(obj);});}}};dojo.ready=dojo.addOnLoad=function(obj,_cf){d._onto(d._loaders,obj,_cf);if(document.readyState==="complete"||(d._postLoad&&!d._loadNotifying)){d._callLoaded();}};dojo._callLoaded=function(){setTimeout("dojo.loaded();",0);};dojo.loaded=function(){d._loadNotifying=true;d._postLoad=true;var mll=d._loaders;d._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}d._loadNotifying=false;if(d._postLoad&&mll.length){d._callLoaded();}};dojo._initFired=false;dojo._loadInit=function(){if(!dojo._initFired){dojo._initFired=true;document.removeEventListener("DOMContentLoaded",dojo._loadInit,false);dojo._callLoaded();}};document.addEventListener("DOMContentLoaded",dojo._loadInit,false);window.addEventListener("load",dojo._loadInit,false);})(dojo);dojo.toJson=function(_d0){return JSON.stringify(_d0);};dojo.fromJson=function(_d1){return JSON.parse(_d1);};dojo.toArray=function(obj,_d2,_d3){return (_d3||[]).concat(Array.prototype.slice.call(obj,_d2||0));};dojo.clone=function(o){if(!o||typeof o!="object"||dojo.isFunction(o)){return o;}if(o.nodeType&&"cloneNode" in o){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}var r,i,l,s,_d4;if(dojo.isArray(o)){r=[];for(i=0,l=o.length;i<l;++i){if(i in o){r.push(dojo.clone(o[i]));}}}else{r=o.constructor?new o.constructor():{};}var _d5={};for(_d4 in o){s=o[_d4];if(!(_d4 in r)||(r[_d4]!==s&&(!(_d4 in _d5)||_d5[_d4]!==s))){r[_d4]=dojo.clone(s);}}return r;};dojo.objectToQuery=function(map){var enc=encodeURIComponent;var _d6=[];var _d7={};for(var _d8 in map){var _d9=map[_d8];if(_d9!=_d7[_d8]){var _da=enc(_d8)+"=";if(dojo.isArray(_d9)){for(var i=0;i<_d9.length;i++){_d6.push(_da+enc(_d9[i]));}}else{_d6.push(_da+enc(_d9));}}}return _d6.join("&");};(function(_db){var cfg=_db.config;_db._xhrObj=function(){return new XMLHttpRequest();};_db._isDocumentOk=function(_dc){var _dd=_dc.status||0,lp=location.protocol;return (_dd>=200&&_dd<300)||_dd==304||_dd==1223||(!_dd&&(lp=="file:"||lp=="chrome:"||lp=="app:"));};_db._getText=function(uri,_de){var _df=_db._xhrObj();_df.open("GET",uri,false);try{_df.send(null);if(!_db._isDocumentOk(_df)){var err=Error("Unable to load "+uri+" status:"+_df.status);err.status=_df.status;err.responseText=_df.responseText;throw err;}}catch(e){if(_de){return null;}throw e;}return _df.responseText;};dojo._blockAsync=false;var _e0=_db._contentHandlers=dojo.contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _db.fromJson(xhr.responseText||null);}};dojo._ioSetArgs=function(_e1,_e2,_e3,_e4){var _e5={args:_e1,url:_e1.url};var _e6=[{}];if(_e1.content){_e6.push(_e1.content);}if(_e1.preventCache){_e6.push({"dojo.preventCache":new Date().valueOf()});}_e5.query=_db.objectToQuery(_db.mixin.apply(null,_e6));_e5.handleAs=_e1.handleAs||"text";var d=new _db.Deferred(_e2);d.addCallbacks(_e3,function(_e7){return _e4(_e7,d);});var ld=_e1.load;if(ld&&_db.isFunction(ld)){d.addCallback(function(_e8){return ld.call(_e1,_e8,_e5);});}var err=_e1.error;if(err&&_db.isFunction(err)){d.addErrback(function(_e9){return err.call(_e1,_e9,_e5);});}var _ea=_e1.handle;if(_ea&&_db.isFunction(_ea)){d.addBoth(function(_eb){return _ea.call(_e1,_eb,_e5);});}d.ioArgs=_e5;return d;};var _ec=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _ed=typeof xhr.abort;if(_ed=="function"||_ed=="object"||_ed=="unknown"){xhr.abort();}var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}return err;};var _ee=function(dfd){var ret=_e0[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;};var _ef=function(_f0,dfd){if(!dfd.ioArgs.args.failOk){}return _f0;};var _f1=null;var _f2=[];var _f3=0;var _f4=function(dfd){if(_f3<=0){_f3=0;}};var _f5=function(){var now=(new Date()).getTime();if(!_db._blockAsync){for(var i=0,tif;i<_f2.length&&(tif=_f2[i]);i++){var dfd=tif.dfd;var _f6=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_f2.splice(i--,1);_f3-=1;}else{if(tif.ioCheck(dfd)){_f2.splice(i--,1);tif.resHandle(dfd);_f3-=1;}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_f2.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();_f3-=1;}}}}};if(dojo.config.debugAtAllCosts){_f6.call(this);}else{try{_f6.call(this);}catch(e){dfd.errback(e);}}}}_f4(dfd);if(!_f2.length){clearInterval(_f1);_f1=null;return;}};dojo._ioCancelAll=function(){try{_db.forEach(_f2,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}};_db._ioNotifyStart=function(dfd){};_db._ioWatch=function(dfd,_f7,_f8,_f9){var _fa=dfd.ioArgs.args;if(_fa.timeout){dfd.startTime=(new Date()).getTime();}_f2.push({dfd:dfd,validCheck:_f7,ioCheck:_f8,resHandle:_f9});if(!_f1){_f1=setInterval(_f5,50);}if(_fa.sync){_f5();}};var _fb="application/x-www-form-urlencoded";var _fc=function(dfd){return dfd.ioArgs.xhr.readyState;};var _fd=function(dfd){return 4==dfd.ioArgs.xhr.readyState;};var _fe=function(dfd){var xhr=dfd.ioArgs.xhr;if(_db._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}};dojo._ioAddQueryToUrl=function(_ff){if(_ff.query.length){_ff.url+=(_ff.url.indexOf("?")==-1?"?":"&")+_ff.query;_ff.query=null;}};dojo.xhr=function(_100,args,_101){var dfd=_db._ioSetArgs(args,_ec,_ee,_ef);var _102=dfd.ioArgs;var xhr=_102.xhr=_db._xhrObj(_102.args);if(!xhr){dfd.cancel();return dfd;}if("postData" in args){_102.query=args.postData;}else{if("putData" in args){_102.query=args.putData;}else{if("rawBody" in args){_102.query=args.rawBody;}else{if((arguments.length>2&&!_101)||"POST|PUT".indexOf(_100.toUpperCase())==-1){_db._ioAddQueryToUrl(_102);}}}}xhr.open(_100,_102.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{if(args.headers[hdr]){xhr.setRequestHeader(hdr,args.headers[hdr]);}}}}xhr.setRequestHeader("Content-Type",args.contentType||_fb);if(!args.headers||!("X-Requested-With" in args.headers)){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}if(args.overrideMinmeType&&xhr.overrideMimeType){xhr.overrideMimeType(args.overrideMimeType);}_db._ioNotifyStart(dfd);if(dojo.config.debugAtAllCosts){xhr.send(_102.query);}else{try{xhr.send(_102.query);}catch(e){_102.error=e;dfd.cancel();}}_db._ioWatch(dfd,_fc,_fd,_fe);xhr=null;return dfd;};dojo.xhrGet=function(args){return _db.xhr("GET",args);};dojo.rawXhrPost=dojo.xhrPost=function(args){return _db.xhr("POST",args,true);};dojo.rawXhrPut=dojo.xhrPut=function(args){return _db.xhr("PUT",args,true);};dojo.xhrDelete=function(args){return _db.xhr("DELETE",args);};}(dojo));dojo.attachScript=function(_103){var doc=dojo.doc;var _104=doc.createElement("script");_104.type="text/javascript";_104.src=_103.url;_104.charset="utf-8";return doc.getElementsByTagName("head")[0].appendChild(_104);};(function(){var _105=0;var _106={};dojo.jsonp=function(args){if(!args.url){throw new Error("dojo.jsonp: No URL specified.");}if(!args.jsonp){throw new Error("dojo.jsonp: No callback param specified.");}_105++;var _107="jsonp_callback_"+_105;var _108=args.timeout||3000;_106[_105]=setTimeout(function(){dojo.jsonp[_107]=function(){};clearTimeout(_106[_105]);if(args.error){args.error(null,{});}if(args.handle){args.handle(null,{});}},_108);args.url+="?"+args.jsonp+"=dojo.jsonp."+_107;dojo.jsonp[_107]=function(data){clearTimeout(_106[_105]);try{if(args.load){args.load(data,{});}}catch(e){if(args.error){args.error(null,{});}}if(args.handle){args.handle(data,{});}};if(args.content){args.url+="&"+dojo.objectToQuery(args.content);}return dojo.attachScript(args);};})();dojo.declare=function(_109,_10a,_10b){var dd=arguments.callee,_10c;if(dojo.isArray(_10a)){_10c=_10a;_10a=_10c.shift();}if(_10c){dojo.forEach(_10c,function(m,i){if(!m){throw (_109+": mixin #"+i+" is null");}_10a=dd._delegate(_10a,m);});}var ctor=dd._delegate(_10a);_10b=_10b||{};ctor.extend(_10b);dojo.extend(ctor,{declaredClass:_109,_constructor:_10b.constructor});ctor.prototype.constructor=ctor;return dojo.setObject(_109,ctor);};dojo.mixin(dojo.declare,{_delegate:function(base,_10d){var bp=(base||0).prototype,mp=(_10d||0).prototype,dd=dojo.declare;var ctor=dd._makeCtor();dojo.mixin(ctor,{superclass:bp,mixin:mp,extend:dd._extend});if(base){ctor.prototype=dojo._delegate(bp);}dojo.extend(ctor,dd._core,mp||0,{_constructor:null,preamble:null});ctor.prototype.constructor=ctor;ctor.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;return ctor;},_extend:function(_10e){var i,fn;for(i in _10e){if(dojo.isFunction(fn=_10e[i])&&!0[i]){fn.nom=i;fn.ctor=this;}}dojo.extend(this,_10e);},_makeCtor:function(){return function(){this._construct(arguments);};},_core:{_construct:function(args){var c=args.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=args,ii,fn;if(a[0]){if(((fn=a[0].preamble))){a=fn.apply(this,a)||a;}}if((fn=c.prototype.preamble)){a=fn.apply(this,a)||a;}if(ct&&ct.apply){ct.apply(this,a);}if(mct&&mct.apply){mct.apply(this,a);}if((ii=c.prototype._constructor)){ii.apply(this,args);}if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){ct.apply(this,args);}},_findMixin:function(_10f){var c=this.constructor,p,m;while(c){p=c.superclass;m=c.mixin;if(m==_10f||(m instanceof _10f.constructor)){return p;}if(m&&m._findMixin&&(m=m._findMixin(_10f))){return m;}c=p&&p.constructor;}},_findMethod:function(name,_110,_111,has){var p=_111,c,m,f;do{c=p.constructor;m=c.mixin;if(m&&(m=this._findMethod(name,_110,m,has))){return m;}if((f=p[name])&&(has==(f==_110))){return p;}p=c.superclass;}while(p);return !has&&(p=this._findMixin(_111))&&this._findMethod(name,_110,p,has);},inherited:function(name,args,_112){var a=arguments;if(typeof a[0]!="string"){_112=args;args=name;name=args.callee.nom;}a=_112||args;var c=args.callee,p=this.constructor.prototype,fn,mp;if(this[name]!=c||p[name]==c){mp=(c.ctor||0).superclass||this._findMethod(name,c,p,true);if(!mp){throw (this.declaredClass+": inherited method \""+name+"\" mismatch");}p=this._findMethod(name,c,mp,false);}fn=p&&p[name];if(!fn){throw (mp.declaredClass+": inherited method \""+name+"\" not found");}return fn.apply(this,a);}}});dojo.delegate=dojo._delegate=(function(){function TMP(){};return function(obj,_113){TMP.prototype=obj;var tmp=new TMP();TMP.prototype=null;if(_113){dojo._mixin(tmp,_113);}return tmp;};})();dojo.query=function(_114,_115){if(typeof _115=="string"){_115=dojo.byId(_115);if(!_115){return [];}}_115=_115||dojo.doc;if(/[>+~]\s*$/.test(_114)){_114+="*";}var _116=_115;if(_115.nodeType==9){if(/^\s*>/.test(_114)){var _117=_114.replace(/^\s*>/,"").match(/([^\s>+~]+)(.*)/);if(!_117){return [];}var _118=_117[1];_114=_117[2];if(_115.querySelector(_118)!==_115.documentElement){return [];}if(!_114){return [_115.documentElement];}_115=_115.documentElement;}else{if(/^\s*[+~]/.test(_114)){return [];}}}if(_115.nodeType==1){var _119=_115.id;var _11a=_119;if(!_119){_11a=_115.id="d---dojo-query-synthetic-id-"+new Date().getTime();var _11b=true;}_114="#"+_11a+" "+_114;_116=_115.parentNode||_115;}var n=_116.querySelectorAll(_114);if(_11b){_115.id="";}return n||[];};