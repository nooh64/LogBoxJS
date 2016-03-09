(function() {
  var is_filter_include=false;
  var filter_include=['default'];
  var filter_exclude=[];
  var print_console=true;
  var show_jconsole=false;
  var jconsole=document.createElement('div');
  var jprompt=document.createElement('input');
  var show_time=true;


  this.Log = function() {
		initilizeConsole();
  }
  
  // Private Methods
	function initilizeConsole(){
		jconsole.style.position="fixed";
		jconsole.style.top="27px";
		jconsole.style.left="0px";
		jconsole.style.width="450px";
		jconsole.style.height="200px";
		jconsole.style.background="#444";
		jconsole.style.color="#fff";
		jconsole.style.overflow="scroll";
		jconsole.style.opacity=".9";
		jconsole.style.paddingLeft="3px";
		jconsole.style.zIndex = "9999";
		jconsole.style.fontFamily="monospace";
		jprompt.onkeypress=function(e){
			if (e.keyCode == 13) {
				if(jprompt.value==">>"){
					jconsole.style.right="0px";
					jprompt.style.right="0px"
					jconsole.style.left="auto";
					jprompt.style.left="auto"
				}else if(jprompt.value=="<<"){
					jconsole.style.left="0px";
					jprompt.style.left="0px"
					jconsole.style.right="auto";
					jprompt.style.right="auto"
				}else if(jprompt.value.startsWith("@")){
					handleCommand(jprompt.value)
				}else if(jprompt.value.startsWith("?")){
					inspectElement(jprompt.value)
				}else{
					printLog('default',eval(jprompt.value),'DEBUG',"#fff");
				}
				jprompt.value="";
			}
		};	
		jprompt.style.position="fixed";
		jprompt.style.top="0px";
		jprompt.style.left="0px";
		jprompt.style.width="450px";
		jprompt.style.height="20px";
		jprompt.style.zIndex = "9999";
		jprompt.placeholder=" Your commands here, try >> and <<"
		jprompt.style.background="#444";
		jprompt.style.opacity=".8";
		jprompt.style.color="#fff";
		jprompt.style.border="0";
		jprompt.style.margin="0px";
	}
	function handleCommand(cmd){
		if(cmd=="@!" || cmd=="@clear"){
			jconsole.innerHTML="";
		} else if(cmd=="@v" ||cmd=="@toggle"){
			jconsole.style.display=jconsole.style.display=="none"?"block":"none";
		}
	}
	function inspectElement(cmd){
		var element=document.querySelector(cmd.replace("?",""));
		d( "Width :"+element.offsetWidth+", Height :"+element.offsetHeight);
	}
	function jconsolePrint(message,type,color){
		var date_string="";
		if(show_time){
			var time=new Date();
			var month=time.getMonth()+1;
			var date=time.getDate();
			var hours=time.getHours();
			var minute=time.getMinutes();
			var second=time.getSeconds();
			date_string=month+"-"+date+" "+hours+":"+minute+":"+second;
		}
		jconsole.innerHTML=jconsole.innerHTML+"<p style=\"color:"+color+";text-align:left;margin: 1px;\">"+date_string +"&nbsp;&nbsp;"+type+" : "+message+"</p>";
		jconsole.scrollTop = jconsole.scrollHeight;
	}
	
  // Public Methods
  
  Log.prototype.exclude=function(){
	for(var i = 0; i < arguments.length; i++) {
		filter_exclude.push(arguments[i]);
	}
  }
  
  Log.prototype.include=function(){
	is_filter_include=true;
	for(var i = 0; i < arguments.length; i++) {
		filter_include.push(arguments[i]);
	}
  }
 
  Log.prototype.d = function(tag,value) {
	printLog(tag,value,'DEBUG',"#fff");
  }
  
   Log.prototype.e = function(tag,value) {
	printLog(tag,value,'ERROR',"#F44336");
  }
  
   Log.prototype.i = function(tag,value) {
	printLog(tag,value,'INFO',"#fff");
  }
  
   Log.prototype.w = function(tag,value) {
	printLog(tag,value,'WARN',"#FFC107");
  }
  
  Log.prototype.show = function() {
	 (function() {
      "use strict";
	  
      var observer = new MutationObserver(function() {
        if (document.body) {
          	document.body.appendChild(jconsole);
			document.body.appendChild(jprompt);
			observer.disconnect();
        }
      });
      observer.observe(document.documentElement, {childList: true});
    })();

	show_jconsole=true;

  }
  
  Log.prototype.showTime = function() {
	show_time=true;
  }
  
  Log.prototype.hideTime = function() {
	show_time=false;
  }
  
  function printLog(tag,message,type,color){
  
	if(message==undefined){
		message=tag;
		tag="default";
	}
	
	if((!is_filter_include || (filter_include.indexOf(tag)>-1)) && (filter_exclude.indexOf(tag)==-1)){
		if(print_console){
			if(type=='DEBUG'){
				console.log("%c   DEBUG : "+message,'color:#000');
			}else if(type=='ERROR'){
				console.error("%c ERROR : "+message,'color:#F44336');
			}else if(type=='INFO'){
				console.info("%c   INFO  : "+message,'color:#000');
			}else if(type=='WARN'){
				console.warn("%c   WARN  : "+message,'color:#FFC107');
			}
		}
		if(show_jconsole){
			jconsolePrint(message,type,color);
		}
		
	}
  }
}());

window.log=new Log();

