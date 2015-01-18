var shariff = false;
var blogloaded = false;
var twitterloaded = false;
var t=setInterval(restorepost,1000);
function tweets() {
    var twitter = "twitter/";
    $.getJSON( twitter, null)
      .done(function( data ) {
        $.each( data, function( i, item ) {
		  $("#tweets").append('<div class="tweet"><div class="image"><img src="' + item.user.profile_image_url_https + '"></div><div class="desc"><a href="https://twitter.com/y_anniks/status/' + item.id_str + '">' + item.text + '</a></div></div><div style="clear:both"></div>');
        });
		$('body').resize();
		twitterloaded = true;
      });
}
function blog() {
	var blog = "https://yanniks.github.io/feed.json";
	$.getJSON(blog,null)
	 .done(function(data) {
	 	$.each(data, function(i,item) {
			if (typeof item.url != "undefined") {
				$("#blogposts").append('<div class="post"><a href="javascript:loadpost(\'' + item.url + '/\')"><font size="5"><b>' + item.title + '</b></font><br>' + item.subtitle + '</a></div><br>');
			}
	 	})
		$('body').resize();
		blogloaded = true;
	 })
}
function loadpost(link) {
	$.get("https://yanniks.github.io" + link, function(data) {
		$( "#blogpost" ).html(stripScripts(data));
  	    $($('nav').find('a')[5]).show();
	    $('#blogpost').show();
		if (skel.isActive("desktop")) {
			$($('nav').find('a')[5]).click();
		} else {
			document.getElementById("blogpost").scrollIntoView();
		}
		var urltoload = link.substring(10);
		window.location.hash = urltoload.substring(0, urltoload.length - 1);
		if (!shariff) {
			shariff = true;
			$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/shariff.min.css') );
			console.log("Shariff css loaded.");
		}
		$.getScript( "js/shariff.min.js", function( data, textStatus, jqxhr ) {		
			console.log( "Shariff js loaded." );
		});
	});
}
function stripScripts(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  var scripts = div.getElementsByTagName('script');
  var i = scripts.length;
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML;
}
function restorepost() {
	if (window.location.hash && window.location.hash != "#twitter2" && window.location.hash != "#projects" && window.location.hash != "#blog" && window.location.hash != "#imprint" && window.location.hash != "#blog") {
		if (blogloaded && twitterloaded) {
			loadpost('/articles/' + window.location.hash.substring(1) + "/");
			clearInterval(t);
		}
	} else {
		clearInterval(t);
	}
}
function setup() {
	tweets();
	blog();
	if (window.location.hash) {
		if (window.location.hash == "#blogpost") {
			$($('nav').find('a')[2]).click();
			$($('nav').find('a')[5]).hide();
			window.location.hash = "#blog";
		}
	}
}