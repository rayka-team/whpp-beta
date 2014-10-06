
	












var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	page=2;

function pullDownAction () {
		if(!navigator.onLine){$('#disconect').fadeIn();}
		var url = 'http://www.hamyarwp.com/?json=1';
		$.getJSON(url, function (json) {
		var rayka=json.posts;	
		var dataToStore = JSON.stringify(rayka);
        window.localStorage.setItem('query_cache', dataToStore);
         var query_cache = JSON.parse(window.localStorage.getItem('query_cache'));
		 $('ul.rig').html('');
		query_cache.forEach(function(obj) { 
		  $('ul.rig').append('<li><a href="content.htm?'+obj.id+'"><img src="'+obj.thumbnail_images+'"></a></li>');
		 });
		 myScroll.refresh();
		 page=1;
		});

}

function pullUpAction () {
		if(!navigator.onLine){$('#disconect').fadeIn();}
		var url = 'http://www.hamyarwp.com/?page='+page+'&json=1';
		$.getJSON(url, function (json) {
		var rayka=json.posts;	
		rayka.forEach(function(obj) {
		  $('ul.rig').append('<li><a href="content.htm?'+obj.id+'"><img src="'+obj.thumbnail_images+'"></a></li>');
		 });
		 myScroll.refresh();
         page++;
		});
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'جهت بروز رسانی پایین بکشید...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'جهت بروز رسانی بالا بکشید...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'درحال بروزرسانی...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'جهت بروز رسانی بالا بکشید...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'درحال بروزرسانی...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'جهت بروز رسانی بالا بکشید...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'درحال بروزرسانی...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'درحال بروزرسانی...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);








	// paging Function refresh
   /* var query_cache = JSON.parse(localStorage.getItem('query_cache'));
		query_cache.forEach(function(obj) { 
		  $('#thelist').prepend('<li><a href="content.htm?'+obj.id+'"><img src="'+obj.thumbnail_images+'"></a></li>');
		 });
		myScroll.refresh();*/


