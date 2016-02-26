// JavaScript Document
window.onload=function()
{
	comp.app.toBtn();
	comp.app.toTip();
	comp.app.toAd();
	comp.app.toShow();
}

var comp={};
comp.tools={};
comp.tools.getByClass=function(oParent,sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	var re=RegExp('\\b'+sClass+'\\b','i');//多个class情况
	
	for(i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
comp.tools.getStyle=function (obj,attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,false)[attr];
	}
}

comp.ui={};
comp.ui.fadeIn=function(obj){
	var attr=comp.tools.getStyle(obj,'opacity');
	if(attr==100)
	{
		return false;
	}
	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=5;
		if(value==100)
		{
			clearInterval(obj.timer);
		}
		else
		{
			value+=speed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity:'+value+')';
		}
	},30);

}

comp.ui.fadeOut=function(obj){
	var attr=comp.tools.getStyle(obj,'opacity');
	if(attr==0)
	{
		return false;
	}
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=-5;
		if(value==0)
		{
			clearInterval(obj.timer);
		}
		else
		{
			value+=speed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity:'+value+')';
		}
	},30);
}

comp.app={};

//课程下拉列表
comp.app.toBtn=function(){
	var oDiv=document.getElementById('sel_list');
	var oH2=oDiv.getElementsByTagName('h2')[0];
	var oA=oDiv.getElementsByTagName('a')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
		
	oA.onclick=function(ev){
		var oEvent=ev||event;
		oUl.style.display='block';		 
		document.onclick=function(){
			oUl.style.display='none';
		}
		oEvent.cancelBubble=true;
		return false;
	}
	for(var i=0; i<aLi.length;i++){
		aLi[i].onclick=function(ev){
			var oEvent=ev||event;
			oH2.innerHTML=this.innerHTML;
			oEvent.cancelBubble=true;
			this.parentNode.style.display='none';
		}
	}
}
//课程搜索
comp.app.toTip=function(){
	var oDiv=document.getElementById('header');
	var oText=oDiv.getElementsByTagName('input')[0];
	oText.onfocus=function(){
		if(oText.value=='请输入课程名称')
		{
			oText.value='';
		}
	}
	oText.onblur=function(){
		if(oText.value=='')
		{
			oText.value='请输入课程名称';
		}
	}
}
//淡入淡出效果
comp.app.toAd=function(){
	var oDiv=document.getElementById('ad');
	var aDiv=oDiv.getElementsByTagName('div');
	var timer=null;
	var iNow=0
	timer=setInterval(auto,2000);
	function auto(){
		if(iNow==aDiv.length-1)
		{
			iNow=0;
		}
		else
		{
			iNow++;
		}
		for(var i=0;i<aDiv.length;i++)
		{
			comp.ui.fadeOut(aDiv[i]);
		}
		comp.ui.fadeIn(aDiv[iNow]);
	}
	oDiv.onmouseover=function(){
		clearInterval(timer);
	}
	oDiv.onmouseout=function(){
		timer=setInterval(auto,2000);
	}
}
//培训展示
comp.app.toShow=function(){
	var oDiv=document.getElementById('show');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oDiv.getElementsByTagName('li');
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	var iSpeed=-10;
	var timer=null;
	clearInterval(timer);
	timer=setInterval(auto,100);
	function auto(){
		
		if(oUl.offsetLeft<-oUl.offsetWidth/2)
		{
			oUl.style.left=0;
		}
		else
		{
			oUl.style.left=oUl.offsetLeft+iSpeed+'px';
		}
	}
	oDiv.onmouseover=function(){
		clearInterval(timer);	
	}
	oDiv.onmouseout=function(){
		timer=setInterval(auto,100);	
	}
}