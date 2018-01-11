$(document).ready(function(){
	// view job, remove empty optional field on job ad template.
	$(".job-ad-option").each(function(){
		if ("" == $.trim($(this).find(".job-ad-optional-text").text()))
		{
			$(this).hide();
		}
	});
	$(".job-ad-bullets").each(function(){
		if ( !$.trim( $(this).text() ).length )
		{
			$(this).hide();
		}
	});
	
	//If Advertiser logo image doesn't exist hide it and show h2 instead
	/*if ($('#job-ad-header img').attr('src') == '/GetFile.aspx?AdvertiserJobTemplateLogoID=' || $('#job-ad-header img').attr('src') == '/GetFile.aspx?AdvertiserJobTemplateLogoID=0'){
		$('#job-ad-header img').hide();
		$('#job-ad-header h2').show();		
	}*/
	
});