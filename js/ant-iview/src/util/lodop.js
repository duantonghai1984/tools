
var LodopActive = (function(){

	var _embedHtml = '<object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0>'
			+ '<embed id="LODOP_EM" name="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>';
	
	var _lodop = null;
	
	
	var CreatedOKLodop7766=null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop(){
    try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ((verFF[0]>= 42)||(x64!==null)) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=42) return true;
		};
	};
        return false;
    } catch(err) {return true;};
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
	var head = window.document.head || document.getElementsByTagName("head")[0] || window.document.documentElement;
	var oscript = window.document.createElement("script");
	oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=1";
	head.insertBefore( oscript,head.firstChild );

	//引用双端口(8000和18000）避免其中某个被占用：
	oscript = document.createElement("script");
	oscript.src ="http://localhost:18000/CLodopfuncs.js?priority=0";
	head.insertBefore( oscript,head.firstChild );
};

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT,oEMBED){
    var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtmFireFox="<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    var strHtmChrome="<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    var strCLodopInstall="<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
    var strCLodopUpdate="<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    var LODOP;
    try{
        var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
            try{ LODOP=getCLodop();} catch(err) {};
	    if (!LODOP && window.document.readyState!=="complete") {alert("C-Lodop没准备好，请稍后再试！"); return;};
            if (!LODOP) {
		 if (isIE) window.document.write(strCLodopInstall); else
		 window.document.documentElement.innerHTML=strCLodopInstall+window.document.documentElement.innerHTML;
                 return;
            } else {

	         if (CLODOP.CVERSION<"2.1.3.0") { 
			if (isIE) window.document.write(strCLodopUpdate); else
			window.document.documentElement.innerHTML=strCLodopUpdate+window.document.documentElement.innerHTML;
		 };
		 if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
		 if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);	
	    };
        } else {
            var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=window.document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                window.document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
             } else LODOP=CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                 if (navigator.userAgent.indexOf('Chrome')>=0)
                     window.document.documentElement.innerHTML=strHtmChrome+window.document.documentElement.innerHTML;
                 if (navigator.userAgent.indexOf('Firefox')>=0)
                     window.document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
                 if (is64IE) window.document.write(strHtm64_Install); else
                 if (isIE)   window.document.write(strHtmInstall);    else
                     window.document.documentElement.innerHTML=strHtmInstall+window.document.documentElement.innerHTML;
                 return LODOP;
            };
        };
        if (LODOP.VERSION<"6.2.1.8") {
            if (!needCLodop()){
            	if (is64IE) window.document.write(strHtm64_Update); else
            	if (isIE) window.document.write(strHtmUpdate); else
            	window.document.documentElement.innerHTML=strHtmUpdate+window.document.documentElement.innerHTML;
	    };
            return LODOP;
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

        //===========================================================
        return LODOP;
    } catch(err) {alert("getLodop出错:"+err);};
};

	
	
	function _addTextToLodop(top,left,width,height,text,fontSize){
		var lodopT=_getLodopD();
		lodopT.ADD_PRINT_TEXT(top,left,width,height,text);
		lodopT.SET_PRINT_STYLEA(0,"FontSize",fontSize);
		lodopT.SET_PRINT_STYLEA(0,"Bold",1);
	}

	function checkLodopActive() {
		return document.getElementById('LODOP_OB')
				|| document.getElementById('LODOP_EM');
	}

	/**
	 * install the lodop active in current html page
	 */
	  function _install() {
		if (!checkLodopActive()) {
			var newdiv = document.createElement("div");
			newdiv.innerHTML = _embedHtml;
			// var parent=document.head || document.body;
			var parent = document.body;
			parent.appendChild(newdiv);
		}
	};

	/**
	 * Get lodop acitive object handler if not install lodop, will install lodop
	 * to current html page
	 */
	 function _getLodopD() {
		if (!_lodop) {
			_lodop = checkLodopActive();
			if (!_lodop) {
				this.install();
			}
			_lodop = getLodop(document.getElementById('LODOP_OB'), document
					.getElementById('LODOP_EM'));
		}
		return _lodop;
	};
	
	function _GetPrinterIDfromJOBID(strJOBID){
		var intPos=strJOBID.indexOf("_");
		if (intPos<0) {return strJOBID;} else {return strJOBID.substr(0,intPos);}
	}
	
	function _getPrintStatus(jobId){
		return _lodop.GET_VALUE('PRINT_STATUS_OK',jobId);
		
	};
	
	function _isInPrintQueue(jobId){
		return _lodop.GET_VALUE('PRINT_STATUS_EXIST',jobId);
	};
	//unit seconds
	function _getUsedTime(jobId){
		return _lodop.GET_VALUE('PRINT_STATUS_SECONDS',jobId);
	};

	/**
	 * clean the printer's print task
	 */
	function _ControlPrinterPURGE(strJOBID){ 
		var lodopT=_getLodopD();
		strPrinterID=_GetPrinterIDfromJOBID(strJOBID); 
		var strResult=lodopT.SET_PRINT_MODE("CONTROL_PRINTER:"+strPrinterID,"PURGE").toLowerCase();
		console.log("clean printer result:"+strResult);
		if(strResult.indexOf("ok")!=-1){
			return true;
		}else{
			return false;
		}
	};
	
	return {
		install:_install,
		getLodopD:_getLodopD,
		addText:_addTextToLodop,
		cleanPrintJobs:_ControlPrinterPURGE,
		isPrintSus:_getPrintStatus,
		isInPrintQueue:_isInPrintQueue,
		getUsedTime:_getUsedTime
	};
})();



//Print Job,hold printJob info and listen the job status
function Print_PrintJob(jobId,lodop){
	this.jobId=jobId;
	this.lodop=lodop;
	this._timeOut=300; //default 30 seconds
	var minAlertNum=1;
	
	var scheduleTaskTime=5*1000;  //mili seconds
	var timeSpend=0; //seconds
	var startTime=(new Date()).getTime();
	var alertNum=0;
	
	this.getPrintStatus=function(){
		_status=lodop.GET_VALUE('PRINT_STATUS_OK',jobId);
		return _status;
	};
	
	this.isInPrintQueue=function(){
		return lodop.GET_VALUE('PRINT_STATUS_EXIST',jobId);
	};
	//unit seconds
	this.getUsedTime=function(){
		timeSpend=((new Date()).getTime()-startTime)/1000;
		timeSpend=parseInt(timeSpend);
		return timeSpend;
	};
	
	// call back function
	this.addHandler=function (handler_fun){
		//check the printer status task
		var timer=setInterval( handler , scheduleTaskTime);
		 var that=this;
		 startTime=(new Date()).getTime();
		 function createResult(susFlag){
			 var result=new Print_PrintResult(susFlag,that.getPrintStatus(),that.isInPrintQueue(),that.jobId,that.getUsedTime());
			 return result;
		 }
		 
		function handler(){	
			//timeSpend=timeSpend+(scheduleTaskTime/1000);
			//if(that.getPrintStatus()==1 || that.isInPrintQueue()==0){  //pint success
			if( that.isInPrintQueue()==0){	
			    handler_fun(createResult(1));
				clearInterval(timer);
				return ;
			}else{
				if(that.getUsedTime()>that._timeOut && alertNum>minAlertNum){ //timeout
					   clearInterval(timer);
						handler_fun(createResult(0));
						return;
				}else if((that._timeOut-that.getUsedTime())<20){
					  var msg="当前打印任务已耗时"+that.getUsedTime()+"秒,请检查打印机！同时请不要关闭浏览器！";
					  alert(msg);
					  clearInterval(timer);
					  timer=setInterval( handler , 15*1000); //检测间隔变15秒
					  alertNum=alertNum+1;
				}
			}
		};
		
	};
};

/**
 * Held the print job result info
 */
function Print_PrintResult(susFalg,suc,inQue,jobId,usedTime){
	 this.suc=susFalg;
	 this.sucStat=suc;
	 this.inQue=inQue;
	 this.jobId=jobId;
	 this.timeUsed=usedTime;
};

Print_PrintResult.prototype.toString=function(){
	return this.suc+","+this.sucStat+","+this.inQue+","+this.jobId+","+this.timeUsed;
};

var util={};

//merger the value from src to dest
util.enxtend=function(dest,src){
	var last={};
	for(var property in dest){
        if(src[property]){
            last[property]=src[property];
        }else{
           last[property]=dest[property]; 
        }
	}
	return last;
};

util.toString=function(data){
	var info='';
	if(data){
	  for(x in data){
		info=info+' '+x+':'+data[x];
	  }
	}
	return info;
};


     
// model 1 print, 0 preview
export  function PrintPage(options){
	var defaults={ onSus: '', onFail: '', onOver:'',createPage:'', beforeStart:'',onProgress:'',model:'1',initPage:'',lodop:null,confirmStop:'',onStop:''};
	this.setting=util.enxtend(defaults,options);
	
	var printData=new Array();
	var sucData=new Array();
	var failData=new Array();
	var failJobs=new Array();
	var curInex=-1;
	var _stopPrint=0;  //if 1 stop the print
	var _printting=0;  //是否正在打印，1为正在打印，0为没有打印
	
	var lodop=this.setting.lodop;
	
	if(lodop==null){
		console.log("user input lodop is null,set it by program");
		lodop=LodopActive.getLodopD();
	}
	
	var that=this;
	
	function isPrintModle(){
	  return that.setting.model==1;	
	}
	
	function isFunction(fun){
		return typeof fun == 'function';
	}
	
	function printSusHandler(jobData){
		if (!isPrintModle()) {
			return;
		}
		var data = that.getPrintData()[curInex];
		sucData.push(data);
		//console.log("suc data info:"+util.toString(data));
		console.log("printSusHandler sus index:" + curInex);
		if (isFunction(that.setting.onSus)) {
			that.setting.onSus.call(that, data);
		}
	}
	
	function initPage(){
		if (isFunction(that.setting.initPage)) {
			that.setting.initPage.call(that,lodop);
		}
	}
	
	function printFailHandler(jobData) {
		if (!isPrintModle()) {
			return;
		}
		failJobs.push(jobData);
		var data = that.getPrintData()[curInex];
		failData.push(data);
		
		//console.log("fail data info:"+util.toString(data));
		console.log("printFailHandler failIndex:" + curInex);
		if (isFunction(that.setting.onFail)) {
			that.setting.onFail.call(that, data,jobData);
		}
	}
	
	this.regCurrentSusManu=function(){
		console.log("regCurrentSusManu execu");
		var jobData=failJobs.pop();
		failData.pop();
		printSusHandler(jobData);
	};
	
	function printOverHandler(jobData){
		if (!isPrintModle()) {
			return;
		}
		_printting=0;
		if (_stopPrint!=0 && isFunction(that.setting.onStop)){
			that.setting.onStop.call(that);
		}
	
		
		console.log("printOverHandler suc num:" + sucData.length + ",fail num:" + failData.length);
		if (isFunction(that.setting.onOver)) {
			that.setting.onOver.call(that, sucData, failData,printData);
		}
		
		if (failData.length > 0) {
			console.log("clean fail jobs:"+LodopActive.cleanPrintJobs(jobData.jobId));
		}
	}
	
	function createPrintPage(){
		//init page size, print model need set very page, review modle only first time need
		if (isPrintModle()) {
			initPage();
		} else {
			if (curInex == 0) {
				initPage();
			}/*else{
				LODOP.NewPage();
			}*/
		}
		if(isFunction(that.setting.createPage)){
			var data=that.getPrintData()[curInex];
			that.setting.createPage.call(that,data,lodop,curInex);
		}
		if(isPrintModle()){
		  lodop.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
		}
	}
	
	function printJobHandler(data){
		console.log("printJobHandler:"+data);
		if(data.suc==1){
			printSusHandler(data);
		}else{
			printFailHandler(data);
		}

		if(hasNext() && _stopPrint==0){ //print next
			printNextPage();
		}else{ 
			printOverHandler(data); //print over
		}
	}
	
	function printNextPage(){
		if(hasNext()){
			moveNext();	
		}
		createPrintPage();
		if(isPrintModle()){ //print model
			var jobId=lodop.PRINT();
			console.log("jobId:"+jobId+ " curIndex:"+curInex);
			new Print_PrintJob(jobId,lodop).addHandler(printJobHandler);
		}else{ //only preview 
			while(hasNext()){
				moveNext();
				//lodop.NewPage();
				console.log('add new page:'+curInex);
				createPrintPage();
			}
			lodop.PREVIEW();
		}
	}
	
	function printProgress() {
		if (!isPrintModle()) {
			return;
		}
		if (isFunction(that.setting.onProgress)) {
				that.setting.onProgress.call(that, failData.length,sucData.length,printData.length);
				if((failData.length+sucData.length)<printData.length){ //if 100%,stop
				   setTimeout(printProgress, 200);
				}
		}
	}
	
	function initPosition(){
		curInex=-1;
	}
	
	function moveNext(){
		curInex=curInex+1;
	};
	
	function hasNext(){
	  return curInex<printData.length-1;	
	};
	
	this.getCurIndex=function(){
	   return curInex;
	};
	
	this.getPrintData=function(){
	    	return printData;
	};
	
	this.getSusData=function(){
		return sucData;
	};
	
	this.getFailData=function(){
		return failData;
	};
	
	this.setPrintData=function(data){
		//坐标初始化到开始
		initPosition();
		
		if(data instanceof Array){
		  printData=data;
		}else{
			printData.push(data);
		}
	};
	
	/**
	 * return
	 * 0  success
	 * 1  no print data
	 * 2  has printed already
	 */
	this.startPrint=function(){
		
		console.log("stopPrintValue:"+_stopPrint);
		if(_stopPrint==0){ //当前是打印模式不是从停止中恢复
		//can load print data
		  if(isFunction(that.setting.beforeStart)){
			console.log("call function beforeStart");
			that.setting.beforeStart.call(that);
		  }
		}
		_stopPrint=0;
		if(printData.length<1){
		  throw new Error("没有数据可打印，请检查");
			//return 1;
		}
		
		if(!hasNext()){
			throw new Error("你已经打印一遍了，请不要重复打印");
			//return 2
		}
		
		printNextPage();
		printProgress();
		_printting=1;
		//return 0;
	};
	
	this.setOption=function(key,value){
		if(key && value){
			this.setting[key]=value;
		}
	};
	
	this.isStop=function(){
		return _stopPrint==1;
	};

	this.stopPrint=function(){
		if(_printting!=1){
			console.log("现在没有任务在打印，请检查");
			return false;
		}
		
		
		  if(isFunction(that.setting.confirmStop)){
			 var re=that.setting.confirmStop.call(that);
			 console.log("_stopPrint confirmStop re:"+re);
			 if(re){
				 _stopPrint=1; 
			 }else{
				 _stopPrint=0;
			 }
		  }else{
			  _stopPrint=1;
		  }
		  return true;
	};
	
	this.setPageSize=function(top,left,width,height,name){
		lodop.PRINT_INITA(top,left,width,height,name);
	};
};  //end print page




/**
 * use guide
 * print model:
var printPage=new PrintPage({
 beforeStart : function(){
    var data=new Array();
    for(var i=0;i<4;i++){
      data.push("duant"+i);
    }
    this.setPrintData(data);
 },
 createPage: cratePage,
 onSus: function(data){
     console.log('sus:'+data);
  },
 onFail: function(data,jobData){
   console.log('fail'+data);
 },
 
 onProgress:funtion(value){
 
 },
 initPage: function(lodop){
   lodop.PRINT_INITA("0cm","0cm","23.07cm","12.7cm","");
 }
});

printPage.startPrint();

function cratePage(data,lodop,index){
	lodop.ADD_PRINT_TEXT("2.97cm","10.5cm","7.14cm","1.59cm","shanghai pudong");
	lodop.SET_PRINT_STYLEA(0,"FontSize",12);
	lodop.SET_PRINT_STYLEA(0,"Bold",1);
}

preview model:

var printPage=new Print_PrintPage({
 beforeStart : function(){
    var data=new Array();
    for(var i=0;i<4;i++){
      data.push("duant"+i);
    }
    this.setPrintData(data);
 },
 createPage: cratePage,
 initPage: function(lodop){
   lodop.ADD_PRINT_TEXT("2.1cm","10.5cm","3.15cm","0.66cm","duan tonghai");
 }
});

printPage.startPrint();
*/

