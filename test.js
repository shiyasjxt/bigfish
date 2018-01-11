$(document).ready(function() {
    var currentURL = window.location.href;
    if(currentURL.indexOf('?search')>-1){
    	$('.job-holder').each(function(){
    		var num = $(this).find('.jxt-result-salary');
    		var matchesNum = $(this).find('.jxt-result-salary').text();
    		// .match(/\d+/g);
    		console.log(matchesNum);
    		if(matchesNum.indexOf('-')>-1){
    			var splitPartOne = matchesNum.split('-')[1];
    			var splitPartTwo = splitPartOne.split(' ');
    			var splitPartCom = '$'+ ' ' + matchesNum.split('-')[0] + splitPartTwo[2] + ' ' + splitPartTwo[3];
    			num.empty();
    			num.append(splitPartCom);
    			// console.log(splitPartCom);
            }
});
    }});

