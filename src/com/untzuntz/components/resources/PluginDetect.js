/* PluginDetect v0.7.5 by Eric Gerds www.pinlady.net/PluginDetect [ onWindowLoaded isMinVersion getVersion onDetectionDone Java(OTF & NOTF) ] */var PluginDetect={version:"0.7.5",name:"PluginDetect",handler:function(c,b,a){return function(){c(b,a)
}
},isDefined:function(b){return typeof b!="undefined"
},isArray:function(b){return(/array/i).test(Object.prototype.toString.call(b))
},isFunc:function(b){return typeof b=="function"
},isString:function(b){return typeof b=="string"
},isNum:function(b){return typeof b=="number"
},isStrNum:function(b){return(typeof b=="string"&&(/\d/).test(b))
},getNumRegx:/[\d][\d\.\_,-]*/,splitNumRegx:/[\.\_,-]/g,getNum:function(b,c){var d=this,a=d.isStrNum(b)?(d.isDefined(c)?new RegExp(c):d.getNumRegx).exec(b):null;
return a?a[0]:null
},compareNums:function(h,f,d){var e=this,c,b,a,g=parseInt;
if(e.isStrNum(h)&&e.isStrNum(f)){if(e.isDefined(d)&&d.compareNums){return d.compareNums(h,f)
}c=h.split(e.splitNumRegx);
b=f.split(e.splitNumRegx);
for(a=0;
a<Math.min(c.length,b.length);
a++){if(g(c[a],10)>g(b[a],10)){return 1
}if(g(c[a],10)<g(b[a],10)){return -1
}}}return 0
},formatNum:function(b,c){var d=this,a,e;
if(!d.isStrNum(b)){return null
}if(!d.isNum(c)){c=4
}c--;
e=b.replace(/\s/g,"").split(d.splitNumRegx).concat(["0","0","0","0"]);
for(a=0;
a<4;
a++){if(/^(0+)(.+)$/.test(e[a])){e[a]=RegExp.$2
}if(a>c||!(/\d/).test(e[a])){e[a]="0"
}}return e.slice(0,4).join(",")
},$$hasMimeType:function(a){return function(d){if(!a.isIE&&d){var c,b,e,f=a.isString(d)?[d]:d;
if(!f||!f.length){return null
}for(e=0;
e<f.length;
e++){if(/[^\s]/.test(f[e])&&(c=navigator.mimeTypes[f[e]])&&(b=c.enabledPlugin)&&(b.name||b.description)){return c
}}}return null
}
},findNavPlugin:function(l,e,c){var j=this,h=new RegExp(l,"i"),d=(!j.isDefined(e)||e)?/\d/:0,k=c?new RegExp(c,"i"):0,a=navigator.plugins,g="",f,b,m;
for(f=0;
f<a.length;
f++){m=a[f].description||g;
b=a[f].name||g;
if((h.test(m)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))||(h.test(b)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))){if(!k||!(k.test(m)||k.test(b))){return a[f]
}}}return null
},getMimeEnabledPlugin:function(a,f){var e=this,b,c=new RegExp(f,"i"),d="";
if((b=e.hasMimeType(a))&&(b=b.enabledPlugin)&&(c.test(b.description||d)||c.test(b.name||d))){return b
}return 0
},AXO:window.ActiveXObject,getAXO:function(b){var f=null,d,c=this,a;
;
try{f=new c.AXO(b);
}catch(d){}return f
},convertFuncs:function(g){var a,h,f,b=/^[\$][\$]/,d={},c=this;
for(a in g){if(b.test(a)){d[a]=1
}}for(a in d){try{h=a.slice(2);
if(h.length>0&&!g[h]){g[h]=g[a](g);
delete g[a]
}}catch(f){}}},initScript:function(){var c=this,a=navigator,e="/",i=a.userAgent||"",g=a.vendor||"",b=a.platform||"",h=a.product||"";
;
;
;
c.OS=100;
if(b){var f,d=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];
for(f=d.length-2;
f>=0;
f=f-2){if(d[f]&&new RegExp(d[f],"i").test(b)){c.OS=d[f+1];
break
}}}c.convertFuncs(c);
;
c.isIE=new Function("return "+e+"*@cc_on!@*"+e+"false")();
c.verIE=c.isIE&&(/MSIE\s*(\d+\.?\d*)/i).test(i)?parseFloat(RegExp.$1,10):null;
c.ActiveXEnabled=false;
;
;
if(c.isIE){var f,j=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","ShockwaveFlash.ShockwaveFlash","TDCCtl.TDCCtl","Shell.UIHelper","Scripting.Dictionary","wmplayer.ocx"];
for(f=0;
f<j.length;
f++){if(c.getAXO(j[f])){c.ActiveXEnabled=true;
break
}}c.head=c.isDefined(document.getElementsByTagName)?document.getElementsByTagName("head")[0]:null
}c.isGecko=(/Gecko/i).test(h)&&(/Gecko\s*\/\s*\d/i).test(i);
c.verGecko=c.isGecko?c.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(i)?RegExp.$1:"0.9"):null;
;
;
c.isSafari=(/Safari\s*\/\s*\d/i).test(i)&&(/Apple/i).test(g);
;
c.isChrome=(/Chrome\s*\/\s*(\d[\d\.]*)/i).test(i);
c.verChrome=c.isChrome?c.formatNum(RegExp.$1):null;
;
;
c.isOpera=(/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(i);
c.verOpera=c.isOpera&&((/Version\s*\/\s*(\d+\.?\d*)/i).test(i)||1)?parseFloat(RegExp.$1,10):null;
;
;
;
;
;
c.addWinEvent("load",c.handler(c.runWLfuncs,c));

},init:function(c){var b=this,a,c;
if(!b.isString(c)){
return -3
}if(c.length==1){b.getVersionDelimiter=c;
return -3
}c=c.toLowerCase().replace(/\s/g,"");
a=b[c];
if(!a||!a.getVersion){
return -3
}b.plugin=a;
if(!b.isDefined(a.installed)){a.installed=a.version=a.version0=a.getVersionDone=null;
a.$=b;
a.pluginName=c
}b.garbage=false;
if(b.isIE&&!b.ActiveXEnabled){if(a!==b.java){return -2
}}return 1
},fPush:function(b,a){var c=this;
if(c.isArray(a)&&(c.isFunc(b)||(c.isArray(b)&&b.length>0&&c.isFunc(b[0])))){a.push(b)
}},callArray:function(b){var c=this,a;
if(c.isArray(b)){for(a=0;
a<b.length;
a++){if(b[a]===null){return
}c.call(b[a]);
b[a]=null
}}},call:function(c){var b=this,a=b.isArray(c)?c.length:-1;
if(a>0&&b.isFunc(c[0])){c[0](b,a>1?c[1]:0,a>2?c[2]:0,a>3?c[3]:0)
}else{if(b.isFunc(c)){c(b)
}}},$$isMinVersion:function(a){return function(h,g,d,c){var e=a.init(h),f,b=-1,j;
;
if(e<0){return e
}f=a.plugin;
g=a.formatNum(a.isNum(g)?g.toString():(a.isStrNum(g)?a.getNum(g):"0"));
;
if(f.getVersionDone!=1){f.getVersion(g,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}a.cleanup();
if(f.installed!==null){b=f.installed<=0.5?f.installed:(f.installed==0.7?1:(f.version===null?0:(a.compareNums(f.version,g,f)>=0?1:-1)))
};
return b
}
},getVersionDelimiter:",",$$getVersion:function(a){return function(g,d,c){var e=a.init(g),f,b,h;
;
if(e<0){return null
};
f=a.plugin;
if(f.getVersionDone!=1){f.getVersion(null,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}a.cleanup();
b=(f.version||f.version0);
b=b?b.replace(a.splitNumRegx,a.getVersionDelimiter):b;
;
return b
}
},cleanup:function(){
var a=this;
if(a.garbage&&a.isDefined(window.CollectGarbage)){window.CollectGarbage()
}
},addWinEvent:function(d,c){var e=this,a=window,b;
if(e.isFunc(c)){if(a.addEventListener){a.addEventListener(d,c,false)
}else{if(a.attachEvent){a.attachEvent("on"+d,c)
}else{b=a["on"+d];
a["on"+d]=e.winHandler(c,b)
}}}},winHandler:function(d,c){return function(){d();
if(typeof c=="function"){c()
}}
},WLfuncs0:[],WLfuncs:[],runWLfuncs:function(a){a.winLoaded=true;
;
;
;
a.callArray(a.WLfuncs0);
a.callArray(a.WLfuncs);
;
if(a.onDoneEmptyDiv){a.onDoneEmptyDiv()
}},winLoaded:false,$$onWindowLoaded:function(a){return function(b){
if(a.winLoaded){
a.call(b);
}else{a.fPush(b,a.WLfuncs)
}}
},$$onDetectionDone:function(a){return function(h,g,c,b){var d=a.init(h),j,e;
if(d==-3){return -1
}e=a.plugin;
;
if(!a.isArray(e.funcs)){e.funcs=[]
}if(e.getVersionDone!=1){j=a.isMinVersion?a.isMinVersion(h,"0",c,b):a.getVersion(h,c,b)
}if(e.installed!=-0.5&&e.installed!=0.5){
;
a.call(g);
;
return 1
}if(e.NOTF){a.fPush(g,e.funcs);
return 0
}return 1
}
},div:null,divWidth:50,pluginSize:1,emptyDiv:function(){var c=this,a,e,b,d=0;
if(c.div&&c.div.childNodes){
for(a=c.div.childNodes.length-1;
a>=0;
a--){b=c.div.childNodes[a];
if(b&&b.childNodes){if(d==0){for(e=b.childNodes.length-1;
e>=0;
e--){b.removeChild(b.childNodes[e])
}c.div.removeChild(b)
}else{}}}};
},DONEfuncs:[],onDoneEmptyDiv:function(){var c=this,a,b;
if(!c.winLoaded){return
}if(c.WLfuncs&&c.WLfuncs.length&&c.WLfuncs[c.WLfuncs.length-1]!==null){return
}for(a in c){b=c[a];
if(b&&b.funcs){if(b.OTF==3){return
}if(b.funcs.length&&b.funcs[b.funcs.length-1]!==null){return
}}}for(a=0;
a<c.DONEfuncs.length;
a++){c.callArray(c.DONEfuncs)
}c.emptyDiv()
},getWidth:function(c){if(c){var a=c.scrollWidth||c.offsetWidth,b=this;
if(b.isNum(a)){return a
}}return -1
},getTagStatus:function(m,g,a,b){var c=this,f,k=m.span,l=c.getWidth(k),h=a.span,j=c.getWidth(h),d=g.span,i=c.getWidth(d);
if(!k||!h||!d||!c.getDOMobj(m)){return -2
}if(j<i||l<0||j<0||i<0||i<=c.pluginSize||c.pluginSize<1){return 0
}if(l>=i){return -1
}try{if(l==c.pluginSize&&(!c.isIE||c.getDOMobj(m).readyState==4)){if(!m.winLoaded&&c.winLoaded){return 1
}if(m.winLoaded&&c.isNum(b)){if(!c.isNum(m.count)){m.count=b
}if(b-m.count>=10){return 1
}}}}catch(f){}return 0
},getDOMobj:function(g,a){var f,d=this,c=g?g.span:0,b=c&&c.firstChild?1:0;
try{if(b&&a){c.firstChild.focus()
}}catch(f){}return b?c.firstChild:null
},setStyle:function(b,g){var f=b.style,a,d,c=this;
if(f&&g){for(a=0;
a<g.length;
a=a+2){try{f[g[a]]=g[a+1]
}catch(d){}}}},insertDivInBody:function(i){var g,d=this,h="pd33993399",c=null,f=document,b="<",a=(f.getElementsByTagName("body")[0]||f.body);
if(!a){try{f.write(b+'div id="'+h+'">o'+b+"/div>");
c=f.getElementById(h)
}catch(g){}}a=(f.getElementsByTagName("body")[0]||f.body);
if(a){if(a.firstChild&&d.isDefined(a.insertBefore)){a.insertBefore(i,a.firstChild)
}else{a.appendChild(i)
}if(c){a.removeChild(c)
}}else{}},insertHTML:function(g,b,h,a,k){var l,m=document,j=this,q,o=m.createElement("span"),n,i,f="<";
var c=["outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"];
if(!j.isDefined(a)){a=""
}if(j.isString(g)&&(/[^\s]/).test(g)){q=f+g+' width="'+j.pluginSize+'" height="'+j.pluginSize+'" ';
for(n=0;
n<b.length;
n=n+2){if(/[^\s]/.test(b[n+1])){q+=b[n]+'="'+b[n+1]+'" '
}}q+=">";
for(n=0;
n<h.length;
n=n+2){if(/[^\s]/.test(h[n+1])){q+=f+'param name="'+h[n]+'" value="'+h[n+1]+'" />'
}}q+=a+f+"/"+g+">"
}else{q=a
}if(!j.div){j.div=m.createElement("div");
i=m.getElementById("plugindetect");
if(i){j.div=i
}else{j.div.id="plugindetect";
j.insertDivInBody(j.div)
}j.setStyle(j.div,c.concat(["width",j.divWidth+"px","height",(j.pluginSize+3)+"px","fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","block"]));
if(!i){j.setStyle(j.div,["position","absolute","right","0px","top","0px"])
}}if(j.div&&j.div.parentNode){
;
j.div.appendChild(o);
j.setStyle(o,c.concat(["fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","inline"]));
try{if(o&&o.parentNode){o.focus()
}}catch(l){}try{o.innerHTML=q
}catch(l){}if(o.childNodes.length==1&&!(j.isGecko&&j.compareNums(j.verGecko,"1,5,0,0")<0)){j.setStyle(o.firstChild,c.concat(["display","inline"]))
}return{span:o,winLoaded:j.winLoaded,tagName:(j.isString(g)?g:"")}
}return{span:null,winLoaded:j.winLoaded,tagName:""}
},java:{mimeType:["application/x-java-applet","application/x-java-vm","application/x-java-bean"],mimeTypeJPI:"application/x-java-applet;jpi-version=",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",DTKclassID:"clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA",DTKmimeType:["application/java-deployment-toolkit","application/npruntime-scriptable-plugin;DeploymentToolkit"],forceVerifyTag:[],jar:[],Enabled:navigator.javaEnabled(),VENDORS:["Sun Microsystems Inc.","Apple Computer, Inc."],OTF:null,All_versions:[],mimeTypeJPIresult:"",JavaPlugin_versions:[],JavaVersions:[[1,9,2,30],[1,8,2,30],[1,7,2,30],[1,6,1,30],[1,5,1,30],[1,4,2,30],[1,3,1,30]],searchJavaPluginAXO:function(){var h=null,a=this,c=a.$,g=[],j=[1,5,0,14],i=[1,6,0,2],f=[1,3,1,0],e=[1,4,2,0],d=[1,5,0,7],b=false;
if(!c.ActiveXEnabled){return null
};
if(c.verIE>=a.minIEver){g=a.searchJavaAXO(i,i,b);
if(g.length>0&&b){g=a.searchJavaAXO(j,j,b)
}}else{
if(g.length==0){g=a.searchJavaAXO(f,e,false)
}}if(g.length>0){h=g[0]
}a.JavaPlugin_versions=[].concat(g);
return h
},searchJavaAXO:function(l,i,m){var n,f,h=this.$,q,k,a,e,g,j,b,r=[];
if(h.compareNums(l.join(","),i.join(","))>0){i=l
}i=h.formatNum(i.join(","));
var o,d="1,4,2,0",c="JavaPlugin."+l[0]+""+l[1]+""+l[2]+""+(l[3]>0?("_"+(l[3]<10?"0":"")+l[3]):"");
for(n=0;
n<this.JavaVersions.length;
n++){f=this.JavaVersions[n];
q="JavaPlugin."+f[0]+""+f[1];
g=f[0]+"."+f[1]+".";
for(a=f[2];
a>=0;
a--){b="JavaWebStart.isInstalled."+g+a+".0";
if(h.compareNums(f[0]+","+f[1]+","+a+",0",i)>=0&&!h.getAXO(b)){continue
}o=h.compareNums(f[0]+","+f[1]+","+a+",0",d)<0?true:false;
for(e=f[3];
e>=0;
e--){k=a+"_"+(e<10?"0"+e:e);
j=q+k;
if(h.getAXO(j)&&(o||h.getAXO(b))){r.push(g+k);
if(!m){return r
}}if(j==c){return r
}}if(h.getAXO(q+a)&&(o||h.getAXO(b))){r.push(g+a);
if(!m){return r
}}if(q+a==c){return r
}}}return r
},minIEver:7,getMimeJPIversion:function(){var h,a=this,d=a.$,c=new RegExp("("+a.mimeTypeJPI+")(\\d.*)","i"),k=new RegExp("Java","i"),e,j,f="",i={},g=0,b;
for(h=0;
h<navigator.mimeTypes.length;
h++){j=navigator.mimeTypes[h];
if(c.test(j.type)&&(e=j.enabledPlugin)&&(j=RegExp.$2)&&(k.test(e.description||f)||k.test(e.name||f))){i["a"+d.formatNum(j)]=j
}}b="0,0,0,0";
for(h in i){g++;
e=h.slice(1);
if(d.compareNums(e,b)>0){b=e
}}a.mimeTypeJPIresult=g>0?a.mimeTypeJPI+i["a"+b]:"";
return g>0?b:null
},getVersion:function(m,d,l){var f,c=this,e=c.$,h=c.NOTF,b=c.applet,j=c.verify,i=vendor=versionEnabled=null;
;
if(c.getVersionDone===null){c.OTF=0;
c.mimeObj=e.hasMimeType(c.mimeType);
c.deployTK.$=e;
c.deployTK.parentNode=c;
b.$=e;
b.parentNode=c;
if(h){h.$=e;
h.parentNode=c
}if(j){j.parentNode=c;
j.$=e;
j.init()
}}var k;
if(e.isArray(l)){for(k=0;
k<b.allowed.length;
k++){if(e.isNum(l[k])){b.allowed[k]=l[k]
}}}for(k=0;
k<c.forceVerifyTag.length;
k++){b.allowed[k]=c.forceVerifyTag[k]
}if(e.isString(d)){c.jar.push(d)
}if(c.getVersionDone==0){if(!c.version||b.canTryAny()){f=b.insertHTMLQueryAll(d);
if(f[0]){c.installed=1;
c.EndGetVersion(f[0],f[1])
}}return
}var g=c.deployTK.query();
if(g.JRE){i=g.JRE;
vendor=c.VENDORS[0]
}if(!e.isIE){var q,n,a,o;
o=(c.mimeObj&&c.Enabled)?true:false;
if(!i&&(f=c.getMimeJPIversion())!==null){i=f
}if(!i&&c.mimeObj){f="Java[^\\d]*Plug-in";
a=e.findNavPlugin(f);
if(a){f=new RegExp(f,"i");
q=f.test(a.description||"")?e.getNum(a.description):null;
n=f.test(a.name||"")?e.getNum(a.name):null;
if(q&&n){i=(e.compareNums(e.formatNum(q),e.formatNum(n))>=0)?q:n
}else{i=q||n
}}}if(!i&&c.mimeObj&&e.isSafari&&e.OS==2){a=e.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",0);
if(a){q=e.getNum(a.description);
if(q){i=q
}}}if(i){c.version0=i;
if(c.Enabled){versionEnabled=i
}}}else{if(!i&&g.status==0){i=c.searchJavaPluginAXO();
if(i){vendor=c.VENDORS[0]
}}if(i){c.version0=i;
if(c.Enabled&&e.ActiveXEnabled){versionEnabled=i
}}}if(!versionEnabled||b.canTryAny()){f=b.insertHTMLQueryAll(d);
if(f[0]){versionEnabled=f[0];
vendor=f[1]
}}if(!versionEnabled&&(f=c.queryWithoutApplets())[0]){c.version0=versionEnabled=f[0];
vendor=f[1];
if(c.installed==-0.5){c.installed=0.5
}}if(e.isSafari&&e.OS==2){if(!versionEnabled&&o){if(c.installed===null){c.installed=0
}else{if(c.installed==-0.5){c.installed=0.5
}}}}if(c.jreDisabled()){versionEnabled=null
};
if(c.installed===null){c.installed=versionEnabled?1:(i?-0.2:-1)
}c.EndGetVersion(versionEnabled,vendor)
},EndGetVersion:function(b,d){var a=this,c=a.$;
if(a.version0){a.version0=c.formatNum(c.getNum(a.version0))
}if(b){a.version=c.formatNum(c.getNum(b));
a.vendor=(c.isString(d)?d:"")
}if(a.getVersionDone!=1){a.getVersionDone=0
}},jreDisabled:function(){var b=this,d=b.$,c=b.deployTK.query().JRE,a;
if(c&&d.OS==1){if((d.isGecko&&d.compareNums(d.verGecko,"1,9,2,0")>=0&&d.compareNums(c,"1,6,0,12")<0)||(d.isChrome&&d.compareNums(c,"1,6,0,12")<0)){return 1
}};
if(d.isOpera&&d.verOpera>=9&&!b.Enabled&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1
}if((d.isGecko||d.isChrome)&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1
}return 0
},deployTK:{status:null,JREall:[],JRE:null,HTML:null,query:function(){var f=this,h=f.$,c=f.parentNode,i,a,b,g=len=null;
if(f.status!==null){return f
}f.status=0;
if((h.isGecko&&h.compareNums(h.verGecko,h.formatNum("1.6"))<=0)||h.isSafari||h.isChrome||(h.isIE&&!h.ActiveXEnabled)){return f
}if(h.isIE&&h.verIE>=6){f.HTML=h.insertHTML("object",[],[]);
g=h.getDOMobj(f.HTML)
}else{if(!h.isIE&&(b=h.hasMimeType(c.DTKmimeType))&&b.type){f.HTML=h.insertHTML("object",["type",b.type],[]);
g=h.getDOMobj(f.HTML)
}}if(g){if(h.isIE&&h.verIE>=6){try{g.classid=c.DTKclassID
}catch(i){}};
try{var d=g.jvms;
if(d){len=d.getLength();
if(h.isNum(len)){f.status=len>0?1:-1;
for(a=0;
a<len;
a++){b=h.getNum(d.get(len-1-a).version);
if(b){f.JREall[a]=b
}}}}}catch(i){}}if(f.JREall.length>0){f.JRE=h.formatNum(f.JREall[0])
}return f
}},queryWithoutApplets00:function(c,a){var b=window.java,d;
try{if(b&&b.lang&&b.lang.System){a.value=[b.lang.System.getProperty("java.version")+" ",b.lang.System.getProperty("java.vendor")+" "]
}}catch(d){}},queryWithoutApplets:function(){var c=this,f=c.$,g,a=c.queryWithoutApplets;
if(!a.value){a.value=[null,null];
if(!f.isIE&&window.java){if(f.OS==2&&f.isOpera&&f.verOpera<9.2&&f.verOpera>=9){}else{if(f.isGecko&&f.compareNums(f.verGecko,"1,9,0,0")<0&&f.compareNums(f.verGecko,"1,8,0,0")>=0){}else{if(f.isGecko){var i,b,h=document;
if(h.createElement&&h.createEvent){try{i=h.createElement("div"),b=h.createEvent("HTMLEvents");
b.initEvent("change",false,false);
i.addEventListener("change",f.handler(c.queryWithoutApplets00,f,a),false);
i.dispatchEvent(b)
}catch(g){}}}else{c.queryWithoutApplets00(f,a)
}}}}}return a.value
},applet:{results:[[null,null],[null,null],[null,null]],HTML:[0,0,0],active:[0,0,0],allowed:[2,2,2],DummyObjTagHTML:0,DummySpanTagHTML:0,getResult:function(){var c=this.results,a,b;
for(a=0;
a<c.length;
a++){b=c[a];
if(b[0]){break
}}return[].concat(b)
},canTry:function(d){var b=this,c=b.$,a=b.parentNode;
if(b.allowed[d]==3){return true
}if(!a.version0||!a.Enabled||(c.isIE&&!c.ActiveXEnabled)){if(b.allowed[d]==2){return true
}if(b.allowed[d]==1&&!b.getResult()[0]){return true
}}return false
},canTryAny:function(){var b=this,a;
for(a=0;
a<b.allowed.length;
a++){if(b.canTry(a)){return true
}}return false
},canUseAppletTag:function(){var b=this,c=b.$,a=b.parentNode;
return(!c.isIE||a.Enabled)
},canUseObjectTag:function(){var a=this,b=a.$;
return(!b.isIE||b.ActiveXEnabled)
},queryThis:function(h){var g,c=this,b=c.parentNode,f=b.$,a=vendor=null,d=f.getDOMobj(c.HTML[h],true);
if(d){try{a=d.getVersion()+" ";
vendor=d.getVendor()+" ";
d.statusbar(f.winLoaded?" ":" ")
}catch(g){}if(f.isStrNum(a)){c.results[h]=[a,vendor]
}try{if(f.isIE&&a&&d.readyState!=4){f.garbage=true;
d.parentNode.removeChild(d)
}}catch(g){}
}},insertHTMLQueryAll:function(e){var g=this,n=g.parentNode,d=n.$,o=g.results,q=g.HTML,h="&nbsp;&nbsp;&nbsp;&nbsp;",u="A.class";
if(!d.isString(e)||!(/\.jar\s*$/).test(e)||(/\\/).test(e)){return[null,null]
}if(n.OTF<1){n.OTF=1
}if(n.jreDisabled()){return[null,null]
}if(n.OTF<2){n.OTF=2
}var c=e,t="",m;
if((/[\/]/).test(e)){m=e.split("/");
c=m[m.length-1];
m[m.length-1]="";
t=m.join("/")
}var j=["archive",c,"code",u],l=["mayscript","true"],r=["scriptable","true"].concat(l),f=!d.isIE&&n.mimeObj&&n.mimeObj.type?n.mimeObj.type:n.mimeType[0];
if(!q[0]&&g.canUseObjectTag()&&g.canTry(0)){q[0]=d.isIE?d.insertHTML("object",["type",f].concat(j),["codebase",t].concat(j).concat(r),h,n):d.insertHTML("object",["type",f,"archive",c,"classid","java:"+u],["codebase",t,"archive",c].concat(r),h,n);
o[0]=[0,0];
g.queryThis(0)
}if(!q[1]&&g.canUseAppletTag()&&g.canTry(1)){q[1]=d.isIE?d.insertHTML("applet",["alt",h].concat(l).concat(j),["codebase",t].concat(l),h,n):d.insertHTML("applet",["codebase",t,"alt",h].concat(l).concat(j),[].concat(l),h,n);
o[1]=[0,0];
g.queryThis(1)
}if(!q[2]&&g.canUseObjectTag()&&g.canTry(2)){q[2]=d.isIE?d.insertHTML("object",["classid",n.classID],["codebase",t].concat(j).concat(r),h,n):d.insertHTML();
o[2]=[0,0];
g.queryThis(2)
}if(!g.DummyObjTagHTML&&g.canUseObjectTag()){g.DummyObjTagHTML=d.insertHTML("object",[],[],h)
}if(!g.DummySpanTagHTML){g.DummySpanTagHTML=d.insertHTML("",[],[],h)
};
if(n.OTF<3&&((q[0]&&!o[0][0])||(q[1]&&!o[1][0])||(d.isIE&&q[2]&&!o[2][0]))){var i=n.NOTF,b=i.isJavaActive();
if(b>=0){n.OTF=3;
n.installed=b==1?0.5:-0.5;
i.onIntervalQuery=d.handler(i.$$onIntervalQuery,i);
if(!d.winLoaded){d.WLfuncs0.push([i.winOnLoadQuery,i])
}setTimeout(i.onIntervalQuery,i.intervalLength);
;
}};
var k,a=0;
for(k=0;
k<o.length;
k++){if(q[k]||g.canTry(k)){a++
}else{break
}}if(a==o.length){n.getVersionDone=n.forceVerifyTag.length>0?0:1
}return g.getResult()
}},NOTF:{count:0,countMax:25,intervalLength:250,isJavaActive:function(){var e=this,c=e.parentNode,a,b,d=-9;
for(a=0;
a<c.applet.HTML.length;
a++){b=e.isAppletActive(a);
c.applet.active[a]=b;
if(b>d){d=b
}}return d
},isAppletActive:function(g){var h=this,d=h.$,c=h.parentNode,b=c.applet,f,a=d.getTagStatus(b.HTML[g],b.DummySpanTagHTML,b.DummyObjTagHTML,h.count);
if(a==-2){return -2
}try{if(d.isIE&&d.verIE>=c.minIEver&&d.getDOMobj(b.HTML[g]).object){return 1
}}catch(f){}if(a==1&&(d.isIE||((c.version0&&c.Enabled&&c.Enabled)||c.queryWithoutApplets()[0]))){return 1
}if(a<0){return -1
}return 0
},winOnLoadQuery:function(c,d){var b=d.parentNode,a;
if(b.OTF==3){a=d.queryAllApplets();
d.queryCompleted(a[1],a[2])
}},$$onIntervalQuery:function(d){var c=d.$,b=d.parentNode,a;
if(b.OTF==3){a=d.queryAllApplets();
if(a[0]||(c.winLoaded&&d.count>d.countMax)){d.queryCompleted(a[1],a[2])
}}d.count++;
if(b.OTF==3){setTimeout(d.onIntervalQuery,d.intervalLength)
}},queryAllApplets:function(){var g=this,f=g.$,e=g.parentNode,d=e.applet,b,a,c;
for(b=0;
b<d.results.length;
b++){d.queryThis(b)
}a=d.getResult();
c=(a[0]||g.isJavaActive()<0)?true:false;
;
return[c,a[0],a[1]]
},queryCompleted:function(c,f){var e=this,d=e.$,b=e.parentNode;
if(b.OTF==4){return
}b.OTF=4;
var a=e.isJavaActive()==1?true:false;
if(c||b.queryWithoutApplets()[0]){b.installed=1
}else{if(a){if(b.version0){b.installed=1;
c=b.version0
}else{b.installed=0
}}else{if(b.installed==0.5){b.installed=0
}else{if(b.version0){b.installed=-0.2
}else{b.installed=-1
}}}}b.EndGetVersion(c,f);
;
if(b.funcs){
;
d.callArray(b.funcs);
}if(d.onDoneEmptyDiv){d.onDoneEmptyDiv()
}}},append:function(e,d){for(var c=0;
c<d.length;
c++){e.push(d[c])
}},JavaFix:function(){}},zz:0};
PluginDetect.initScript();