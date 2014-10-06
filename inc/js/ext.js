$(function(){

/// SET Cache 
function set_catch(name,data){
	window.localStorage.setItem(name,data);
	}	


/// GET Cache 
function get_catch(name){
	return window.localStorage.getItem(name);
	}
	
	
function location(links){
	window.location.assign(links);
	}
	
	
	
	
/*set_catch('notification','5');		
var notification = get_catch('notification');
if(notification!==""){
	$('.notification').html('<span>'+notification+'</span><i class="fa fa-bell fa-2x"></i>');
	}*/
//$('body').html(data);	


var lastnotification=window.localStorage.getItem("notification");
if(lastnotification==null){
	window.localStorage.setItem('notification',0);
	}
var notification=setInterval(function(){
		var url = 'http://www.hamyarwp.com/?cat=5455&json=1&rand='+Math.floor((Math.random() * 100) + 1);
		$.getJSON(url, function (json) {
		var count=json.count;
		var now=count-lastnotification;	
		console.log(now);
		if(now!==0){
			$('li.notification i').html('<span>'+now+'</span>');
			}
		});
		
		},3000);







$('li[data-link]').click(function(){
	var links=$(this).attr('data-link');
	location(links);
	});


$('li[data-readmore]').click(function(){
	var links=$(this).attr('data-readmore');
	location(links);
	});


	
});


var online=navigator.onLine;
if(!online){$('#disconect').fadeIn();}














































