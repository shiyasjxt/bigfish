!(function($){
	// regular js

	function formatDate(pubDate)
	{
		var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var dateObj = pubDate.split('/');
		var mnth = monthList[ parseInt(dateObj[1]) - 1 ];
		var myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
		var myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
		var myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0,4) + "</span> ";
		return myDay + '<br>' + myMonth;
	}

	// jquery
	$(function(){

		var currentPage = window.location.pathname.toLowerCase();
		// adding innerpage class for all the innerpage
		if( currentPage != '/' ){
			$('body').addClass('innerpage');
		}
		//consultant module
		
		$("#teamList").includeFeed({
	baseSettings: {rssURL: ["/consultantsrss.aspx"], limit: 200, addNBSP: false, repeatTag: "consultant"},
	templates: {
		itemTemplate:
				'<div class="col-xs-6 col-sm-4 col-md-4 r21_team-member"><a href="/t/{{FriendlyURL}}"><span class="r21_team-member-photo"><img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}"></span> <strong class="r21_team-member-name">{{FirstName}} {{LastName}}</strong> <strong class="r21_team-member-position">{{PositionTitle}}</strong> </a></div>'
	},
	complete: function () {
		// Callback
	}
});

		// bootstrap classes
		$("#dynamic-container, #content-container, #job-dynamic-container")
			.wrap("<div class='bg-wrap'><div class='container-fluid'></div></div>")
			.addClass("row");

		$("#content-container.newDash").removeClass("container");

		if ( $("#r21_default_sidebar, #side-left, #job-side-column, #dynamic-side-left-container").length ){
			$("#dynamic-side-left-container, #side-left, #job-side-column").addClass("col-md-4");
			$("#side-left, #job-side-column, #r21_left-navigation").addClass("hidden-sm hidden-xs");
			$("#dynamic-content, #content-container #content, #job-dynamic-container #content").addClass("col-md-8");

			$("#dynamic-content, #content-container #content, #job-dynamic-container #content").prepend('<div class="bg-sidewide"></div>');
		}else{
			$("#content-container #content, #job-dynamic-container #content").addClass("col-xs-12");
		}

		if ( $("#r21_default_sidebar").length ){
			$("#r21_default_sidebar").prepend( $('#dynamic-content h1:not(.r21_team-name)'));
			if( $('.r21_team-sidebar').length<1 ){ // do not add the page description if the page is the employee page/team single page
				$(".page-desc").append('<p>'+ $('meta[property="og:description"]').attr('content') +'</p>');
			}else{
				$(".page-desc").remove();
			}

			$('#dynamic-content h1:not(.r21_team-name)').remove();

			//adding intra-page navigation list
			var pnav = $('#dynamic-content').find('div[id^=sec-]');
			var phtml = '';
			if( pnav.length ){
				phtml += '<ul>';
				for( i=0; i<pnav.length; i++ ){
					phtml += '<li><a href="#'+ pnav.eq(i).attr('id') +'">' + pnav.eq(i).find('h2').text() + '</a></li>';
				}
				phtml += '</ul>';
				$('.r21_intrapage-nav').append(phtml);
				$('#r21_default_sidebar').addClass('fix');
			}else{
				$('.r21_intrapage-nav').remove();
				$('#r21_default_sidebar').append( $('.r21_team-sidebar'));
			}
		}
        // home banner
		$("#r21_home-banner-container").cycle({
			slides: "> .r21_banner ", 
			pager: ".cycle-pager", 
		});
        
		// Adding classes and wraping select box with span
		if( $('select').prev()=="" ){
			$('select').parent('div').addClass('custom-select');
			$('select').wrap('<span></span>');
		}else{
			$('select').wrap('<div class="custom-select"><span></span></div>');
		}

		// make header sticky.
		if( $(window).width()>767){
			var headerHeight = $("#r21_header-container").innerHeight();
			$("body").addClass("r21_sticky-header");
			$("body").css("padding-top", headerHeight);
		}

		//adding min-height of the main container
		if( $('#side-left').length ){
			minHt_cnt = $('#side-left').innerHeight();
		}else{
			minHt_cnt = $(window).height() - $('#r21_header-container').innerHeight() - $('#footer').height() - 42;
		}
		$('#content').css('min-height',minHt_cnt);
		//set the min-height to cover the full screen excluding the header and footer
		if( $(window).width() >= 1024 ){
			minHt = $(window).height() - $('#r21_header-container').innerHeight() - $('#footer').height();
		}else{
			minHt = $(window).height() - $('#r21_header-container').innerHeight() - $('#footer').height() - $('#dynamic-side-left-container').height();
		}
		$('#dynamic-content').css('min-height', minHt );

		if( $('.boardy-apply-content, .newDash, #memberProfileLinks').length ){
			$('.bg-wrap').addClass('full-bg');
		}

		// skip link
		$("#skip-link").attr("href", "#" + $("#dynamic-content, #content").attr("id"));

		// remove empty li's and ul's on the system pages.
		$(".links-2 li:empty").remove();
		$(".links-2 ul:empty").remove();

		// add active class to links.
		$("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
		$("li.active li.active").parent().closest("li.active").removeClass("active");

		// add nbsp;
		$("#side-drop-menu > li > ul > li > a").each(function(){
			var linkText = $(this).text();
			linkText = linkText.replace(" (", "&nbsp;(");
			$(this).html(linkText);
		});
		// add class empty in all the site bar dropdown job search list with no content
		$("#side-drop-menu > li").each( function(){
			if( $(this).children().length == 0 ){
				$(this).addClass('empty');
			}
		});

        // map protection
    $(".r27_map-overlay").click(function(){
        $(this).hide();
    });

    $('.jxt-news-container h1').empty();
    $('.jxt-news-container h1').append('News/Blog');

    var currentURL = window.location.href;
    
    if(currentURL.indexOf('createjobalert')>-1){
    	$('.section-heading').first().empty();
    	$('.section-heading').first().append('Classification');
    	// console.log($('.section-heading').first().text());
    }
    if(currentURL.indexOf('?search')>-1){
    	$('.job-holder').each(function(){
    		var num = $(this).find('.jxt-result-salary');
    		var matchesNum = $(this).find('.jxt-result-salary').text();
    		// .match(/\d+/g);
    		console.log(matchesNum);
    		if(matchesNum.indexOf('-')>-1){
    			var splitPartOne = matchesNum.split('-')[1];
				var splitPartTwo = splitPartOne.match(/\S+/g);

    			var splitPartCom = '$'+ ' ' + matchesNum.split('-')[0] + splitPartTwo[1] + ' ' + splitPartTwo[2];
    			num.empty();
    			num.append(splitPartCom);
    			// console.log(splitPartCom);
    		}
    		// $('.jxt-result-salary').length;
    		// if(matchesNum != null){
    		// 	// $('.jxt-result-salary').text().replace(/_/g, ' ');
    		// 	var splitPartOne = $('.jxt-result-salary').text().split('-')[1];
    		// 	var splitPartTwo = splitPartOne.split(' ');
    		// 	var splitPartCom = $('.jxt-result-salary').text().split('-')[0] + splitPartTwo[2] + splitPartTwo[3];
    		// 	$('.jxt-result-salary').empty();
    		// 	$('.jxt-result-salary').append(splitPartCom);
    		// 	console.log(splitPartCom);
    		// }
    	});
    }
		// move news rss feed to bottom of news index.
		$(".newsIndex").append( $(".newsIndex .search-options") );
		// move date on new page.
		$(".news-individual-container").each(function(){
			$(this).children(".news-excerpt").children("h3").after( $(this).children(".news-date") );
		});

		// generate actions button
		$(".job-navbtns").convertButtons({
			buttonTitle: "Actions&hellip;",
			title: "Please choose&hellip;",
			links: ".job-navbtns a"
		});

		// generate filters button
		$(".job-navbtns").convertFilters({
			buttonTitle: "Filters&hellip;",
			filteredTitle: "Applied Filters",
			title: "Please choose&hellip;",
			filtered: ".search-query p",
			list: "ul#side-drop-menu",
			excludeFromList: "#AdvancedSearchFilter_PnlCompany"
		});

		// copy header social media links to footer and contact page.
		var contactSocialMedia = $(".r21_social-media").clone()
		var footerSocialMedia = $(".r21_social-media a").clone();
		$("#r21_contact-us-social-media").prepend( contactSocialMedia );
		$("#r21_footer-social-media").append( footerSocialMedia );


		// mobile menu
		$("#r21_mobile-navigation").click(function(e){
			e.preventDefault();
			$("#r21_navigation > ul").toggleClass("active");
		});


		// Latest Jobs widget
		var dataURL = $('.r21_latest-jobs ul').attr("data-url");
		$(".r21_latest-jobs ul").includeFeed({
			baseSettings: { rssURL: [dataURL || "/job/rss.aspx?search=1&addlocation=1"] },
			//baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1" },
			templates: {
				itemTemplate: "<li class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></li>"
			},
			predicates: {
				pubDate: formatDate
			},
			complete: function(){
				if ($(this).children('li').length > 2){
					$(this).jcarousel({
						auto: 5,
						scroll: 1,
						wrap: "circular",
						vertical: true
					});
				}
			}
		});

		// Latest News widget
        $(".r21_latest-news ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: { rssURL: [dataURL || "/NewsRSS.aspx"] },
                templates: {
                    itemTemplate: "<li><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span><span class='rss-item-link'><a href='{{link}}'>Read more&gt;</a></span></div></li>"
                },
                predicates: {
					pubDate: formatDate
				},
                complete: function() {
                    if ($(this).children().length > 2) {
                        $(this).jcarousel({
                            auto: 5,
                            scroll: 1,
                            wrap: "circular",
                            vertical: true
                        });
                    }
                }
            });
        });


    $(document).ready(function() {
//dynamic navigation
         $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#r21_navigation li.active a"
        });
    });
		// if user logged in, change register links to dashboard.
		if ( $(".user-loggedIn").length )
		{
			$("a[href='/member/register.aspx']").text("My Dashboard");
			$("a[href='/member/register.aspx']").attr("href", "/member/default.aspx");

			$("a[href='/member/login.aspx']").text("Logout");
			$("a[href='/member/login.aspx']").attr("href", "/logout.aspx");
		}

		// expandable tab
		$(".r21_tab-heading a").click(function(e){
			if ( !$(this).attr("href") )
			{
				e.preventDefault();
				$(this).parent().parent().toggleClass("active");
				$(this).parent().parent().next(".r21_tab-content").toggleClass("active");
			}
		});
		// if tab is in hash, click it automatically.
		if ( location.hash.toLowerCase() && $(location.hash.toLowerCase()).length )
		{
			$(location.hash.toLowerCase()).find("a").click();
			scrollToDiv(location.hash.toLowerCase());
		}
		// in case top navigation redirects to a hash.
		$("#r21_navigation a, #r21_left-navigation a").click(function(e){
			var myLink = $(this).attr("href") || "";
			var myHash = myLink.substr( myLink.indexOf("#") );
			var myHeadingLink = $(myHash + ".r21_tab-heading");
			if ( myHeadingLink.length )
			{
				e.preventDefault();
				myHeadingLink.find("a").click();
				scrollToDiv(myHeadingLink);
			}
		});

		// console.log($('.job-date-cus').text());
		var cusDate = $('.job-date-cus').text().split(' ')[0];
		$('.job-date-cus').empty();
		$('.job-date-cus').append(cusDate);
		// add iframe url for a map
		function loadMap(iframeObject)
		{
			// if the iframe has no src or a blank src, and it has a data-src attribute
			if ( !(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src") )
			{
				iframeObject.attr("src", iframeObject.attr("data-src"));
			}
		}
		// scroll to a map
		function scrollToDiv(divID)
		{
			$("html, body").animate({
				scrollTop: $(divID).offset().top - ( $(".r21_sticky-header #r21_header-container").innerHeight() || 0 ) - parseInt($('.dynamic-content-holder').css('padding-top'))
			}, 300);
		}
		// if a location hash is on the url, add active to the div.
		if ( location.hash && $(location.hash + ".r21_map").length )
		{
			$(location.hash + ".r21_map").addClass("active");
		}
		else
		{
			// otherwise, just make the first map active.
			$(".r21_map:first").addClass("active");
		}
		loadMap($(".r21_map.active iframe"));
		// contact page maps on click
		$(".r21_contact-map-link, .footer-location a, .r21_intrapage-nav a").click(function(e){
			var targetMap = $($(this).attr("href"));
			if ( targetMap.length )
			{
				e.preventDefault();
				loadMap(targetMap.children("iframe"));
				scrollToDiv(targetMap);
				$(".r21_map").not(targetMap).removeClass("active");
				targetMap.addClass("active");
			}
		});

	});

})(jQuery);