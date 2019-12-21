jQuery(document).ready(function(){
	
	jQuery('.flexslider').flexslider({
	animation: "slide",
	controlNav: true,             
	directionNav: true,
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
  
  jQuery('#headerWrapper .mobilemenubtn').click(function(e){
		e.preventDefault();
		jQuery('.menuArea').slideToggle();
	});

   // Accordion Toggle Items - faq
   var iconOpen = 'glyphicon-minus-sign',
        iconClose = 'glyphicon-plus-sign';
    jQuery(document).on('show.bs.collapse hide.bs.collapse', '.accordion-group', function (e) {
        console.log(e.target);
        var $target = jQuery(e.target)
          $target.siblings('.accordion-heading')
          .find('em').toggleClass(iconOpen + ' ' + iconClose);
    });
});




function showFlashMessage( title, message, message_options )
{	
	
	var sufix = Math.round( new Date().getTime() / 1000 );
	var message_id = "flash_message_" + sufix;
	
	var width = "";
	var height = "";
	var modal = true;
	var show_title = true;
	var show_button = true;
	var auto_hide = 0;
	var type = "info";
	if ( typeof( message_options ) == 'object' )
	{
		if ( typeof( message_options.width ) != "undefined" )
			width = 'width:' + message_options.width + 'px;';
		if ( typeof( message_options.height ) != "undefined" )
			height = 'height:' + message_options.height + 'px;';
		if ( typeof( message_options.modal ) != "undefined" )
			modal = message_options.modal;
		if ( typeof( message_options.show_title ) != "undefined" )
			show_title = message_options.show_title;
		if ( typeof( message_options.show_button ) != "undefined" )
			show_button = message_options.show_button;
		if ( typeof( message_options.auto_hide ) != "undefined" )
			auto_hide = parseInt( message_options.auto_hide );
		if ( typeof( message_options.type ) != "undefined" )
			type = message_options.type;
	}
	
	var html_code = '';
	
	html_code += '<div id="' + message_id + '" class="modal fade" tabindex="-1" role="dialog">'; //style="' + width + height + '"
	html_code += '<div class="modal-dialog" role="document">';
	html_code += '<div class="modal-content">';
		
	if ( show_title )
	{
		html_code += '<div class="modal-header">';
			html_code += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			html_code += '<h3>' + title + '</h3>';
		html_code += '</div>';
	}	
		html_code += '<div class="modal-body">';
			html_code += '<p>' + message + '</p>';
		html_code += '</div>';
	
	if ( show_button )	
	{
		html_code += '<div class="modal-footer">';
			html_code += '<button class="btn btn-success" data-dismiss="modal" aria-hidden="true">Ok</button>';
			html_code += '<button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>';
		html_code += '</div>';
	}
	
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
	
	$( "body" ).append( html_code );
	$( "#" + message_id ).modal({backdrop: modal});
	
	if ( auto_hide > 0 )
	{
		setTimeout( "hideFlashMessage( '" + message_id + "' )", auto_hide );
	}

}

function hideFlashMessage( message_id )
{
	$( "#" + message_id ).modal('hide');
}

/*
function showFlashMessage( title, message, message_options )
{	
	var sufix = Math.round( new Date().getTime() / 1000 );
	var message_id = "flash_message_" + sufix;
	
	var html_code = '<div id="' + message_id + '" title="' + title + '">';
	html_code += '<p>';
	
	if ( typeof( message_options ) == 'object' && message_options.type != '' )
	{
		html_code += '<span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 50px 0;"></span>';
	}
	html_code += message;
	html_code += '</p>';
	html_code += '</div>';
	
	var width = "auto";
	var height = "auto";
	var modal = true;
	var show_title = true;
	var show_button = true;
	var auto_hide = 0;
	if ( typeof( message_options ) == 'object' )
	{
		if ( typeof( message_options.width ) != "undefined" )
			width = parseInt( message_options.width );
		if ( typeof( message_options.height ) != "undefined" )
			height = parseInt( message_options.height );
		if ( typeof( message_options.modal ) != "undefined" )
			modal = message_options.modal;
		if ( typeof( message_options.show_title ) != "undefined" )
			show_title = message_options.show_title;
		if ( typeof( message_options.show_button ) != "undefined" )
			show_button = message_options.show_button;
		if ( typeof( message_options.auto_hide ) != "undefined" )
			auto_hide = parseInt( message_options.auto_hide );
	}
	
	var buttons = {
				"  ok  ": function() {
					$( this ).dialog( 'close' );
				},
				"  cancel  ": function() {
					$( this ).dialog( 'close' );
				}
			};
	if ( !show_button )
		buttons = null;
	$( "body" ).append( html_code );
	$( "#" + message_id ).dialog( 
		{
			bgiframe: true,
			modal: modal,
			width: width,
			height: height,
			buttons: buttons
		}
	);
	
	if ( show_title == false )
		$( "div.ui-dialog-titlebar" ).remove();
	if ( auto_hide > 0 )
	{
		setTimeout( "hideFlashMessage( '" + message_id + "' )", auto_hide );
	}

}
*/

/*function hideFlashMessage( message_id )
{
	$( "#" + message_id ).dialog( 'close' );
}*/

function validate_email(email)
{
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(email)) 
	{
		return true;
	}
	return false;
}

function checkSubscriptionForm( form_name, retailer )
{
	var name        = $( "#" + form_name + "_subscription_name" ).val();
	var email       = $( "#" + form_name + "_subscription_email" ).val();
    var retailer_id = $( "#" + form_name + "_subscription_" + retailer + "").val();
	var errors = Array();
	
	if( name == "" || name.length < 3 )
	{
		errors[errors.length] = "<li>Your Name is empty or too short!</li>";
	}
	
	if( !validate_email( email ) )
	{
		errors[errors.length] = "<li>Your Email address is not valide!</li>";
	}
    
    if( retailer_id == "" || retailer_id.length < 1 )
	{
		errors[errors.length] = "<li>Your " + retailer +" ID is empty!</li>";
	}
	
	if( errors.length > 0 )
	{
		var errors_str = errors.join(" ");
		showFlashMessage( "Attention", "There was a problem with one or more of the form fields!<br><ul>" + errors_str + "</ul>", {"show_title":true,"modal":true,"width":400,"auto_hide":0,"show_button":true} );
		return false;
	}
	else
		return true;
		
}

function submitAffiliateForm(form_name, retailer)
{
    var email       = $( "#" + form_name + "_subscription_email" ).val();
    var retailer_id = $( "#" + form_name + "_subscription_" + retailer + "").val();
    var gdpr        = $('#gdpr').is(":checked");  // false - not checked
    var errors      = Array();
    
    // email validation
    if( !validate_email( email ) ) {
        $('.affGetAccessArea .affGetAccessInnerArea .form .field input#' + form_name + '_subscription_email').css("border", "1px solid red");

        errors[errors.length] = "<li>Your Email address is not valid!</li>";
    }
    else
    {
        $('.affGetAccessArea .affGetAccessInnerArea .form .field input#' + form_name + '_subscription_email').css("border", "");
    }
    
    // check avangate/clickbank id
    if( retailer_id == "" || retailer_id.length < 1 ) {
        $('.affGetAccessArea .affGetAccessInnerArea .form .field input#' + form_name + '_subscription_' + retailer + '').css("border", "1px solid red");

        errors[errors.length] = "<li>Your " + retailer +" ID is empty!</li>";
    }
    else
    {
        $('.affGetAccessArea .affGetAccessInnerArea .form .field input#' + form_name + '_subscription_' + retailer + '').css("border", "");
    }
    
    // check gdpr
    if(!gdpr) {
        $('.affGetAccessArea .affGetAccessInnerArea .form .field .checkbox').css('border', '1px solid red');
        $('.affGetAccessArea .affGetAccessInnerArea .form .field .text').css('color', 'red');
        $('.affGetAccessArea .affGetAccessInnerArea .form .field .text a').css('color', 'red');
        $('.affGetAccessArea .affGetAccessInnerArea .form .field .text a').css('text-decoration', 'underline');

        errors[errors.length] = "<li>To send message, please consent to our <a href=\'/privacy\' target=\'_blank\'>Privacy Policy!</a></li>";
    }
    else
    {
        $('.field .checkbox').css("border", "");
        $('.field .text').css("color", "");
        $('.field .text a').css("color", "");
        $('.field .text a').css("text-decoration", "");
    }

    if( errors.length > 0 )
    {
        var errors_str = errors.join(" ");
        showFlashMessage( "Attention", "There was a problem with one or more of the form fields!<br><ul>" + errors_str + "</ul>", {"show_title":true,"modal":true,"width":400,"auto_hide":0,"show_button":true} );
        return false;
    }
    else
    {
        //if (checkSubscriptionForm( form_name, retailer ))
        document.getElementById( form_name ).submit();
    }
    
    return false;
}

function showChangeLog(license)
{
	$.post('/ajax', {action: "show_changelog", license: license}, function(data) {
		
		var html_code = '<div id="changelog" title="">';
		html_code += '<p>';
		html_code += data;
		html_code += '</p>';
		
		$( "#changelog" ).remove();
		
		$( "body" ).append( html_code );
		$( "#changelog" ).dialog( 
			{
				bgiframe: true,
				modal: true,
				width: 800,
				height: 500,
				buttons: {"  cancel  ": function() {
					$( this ).dialog( 'close' );
				}}
			}
		);
	});
}

function cyberMondayCounter()
{
    var time_left_tmp = time_left_cyber_monday;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    //hours = time_left_tmp % 24; //tova e originalnia nachin
    hours = time_left_tmp; //tova e zashtoto imame counter koyto nqma days a samo hours
    
    var days = 0;
    days = ( time_left_tmp - hours ) / 24;


    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    
	
    time_left_cyber_monday --;
    //$( "div.time_left_days_first_promo" ).html( aDay[0] );
    //$( "div.time_left_days_second_promo" ).html( aDay[1] );
    
    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
    
    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
	
    $( "div.time_left_seconds_first_promo" ).html( aSecond[0] );
    $( "div.time_left_seconds_second_promo" ).html( aSecond[1] );
    
    setTimeout ( "cyberMondayCounter()", 1000 );

}

function blackFridayCounterHome()
{
    var time_left_tmp = time_left_black_friday;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24; //tova e originalnia nachin
    //hours = time_left_tmp; //tova e zashtoto imame counter koyto nqma days a samo hours
    
    var days = 0;
    days = ( time_left_tmp - hours ) / 24;


    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    
	
    time_left_black_friday --;
    $( "div.time_left_days_first_promo" ).html( aDay[0] );
    $( "div.time_left_days_second_promo" ).html( aDay[1] );
    
    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
    
    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
	
    $( "div.time_left_seconds_first_promo" ).html( aSecond[0] );
    $( "div.time_left_seconds_second_promo" ).html( aSecond[1] );
    
    setTimeout ( "blackFridayCounterHome()", 1000 );

}

function xmasCounterHome()
{
	if (zero_counter_xmas)
	{
		$( "div.time_left_days_first_promo" ).html( '0' );
	    $( "div.time_left_days_second_promo" ).html( '0' );
	    
	    $( "div.time_left_hours_first_promo" ).html( '0' );
	    $( "div.time_left_hours_second_promo" ).html( '0' );
	    
	    $( "div.time_left_minutes_first_promo" ).html( '0' );
	    $( "div.time_left_minutes_second_promo" ).html( '0' );
		
	    $( "div.time_left_seconds_first_promo" ).html( '0' );
	    $( "div.time_left_seconds_second_promo" ).html( '0' );
	}
	else
	{
	    var time_left_tmp = time_left_xmas;
	    var seconds = 0;
	    seconds = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - seconds ) / 60;
	
	    var minutes = 0;
	    minutes = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - minutes ) / 60;
	
	    var hours = 0;
	    hours = time_left_tmp % 24; //tova e originalnia nachin
	   // hours = time_left_tmp; //tova e zashtoto imame counter koyto nqma days a samo hours
	    
	    var days = 0;
	    days = ( time_left_tmp - hours ) / 24;
	
	
	    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
	    {
	        window.location.reload();
	        return;
	    }
		
	    if( seconds < 10 )
	        seconds = '0' + seconds;
	    if( minutes < 10 )
	        minutes = '0' + minutes;
	    if( hours < 10 )
	        hours = '0' + hours;
	    if( days < 10 )
	        days = '0' + days;
		
	    var aDay    = days.toString().split('');
	    var aHour   = hours.toString().split('');
	    var aMinute = minutes.toString().split('');
	    var aSecond = seconds.toString().split('');
	    
		
	    time_left_xmas --;
	    $( "div.time_left_days_first_promo" ).html( aDay[0] );
	    $( "div.time_left_days_second_promo" ).html( aDay[1] );
	    
	    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
	    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
	    
	    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
	    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
		
	    $( "div.time_left_seconds_first_promo" ).html( aSecond[0] );
	    $( "div.time_left_seconds_second_promo" ).html( aSecond[1] );
	    
	    setTimeout ( "xmasCounterHome()", 1000 );
	}

}

function winterCounterHome()
{
	if (zero_counter_winter)
	{
		$( "div.time_left_days_first_promo" ).html( '0' );
	    $( "div.time_left_days_second_promo" ).html( '0' );
	    
	    $( "div.time_left_hours_first_promo" ).html( '0' );
	    $( "div.time_left_hours_second_promo" ).html( '0' );
	    
	    $( "div.time_left_minutes_first_promo" ).html( '0' );
	    $( "div.time_left_minutes_second_promo" ).html( '0' );
		
	    $( "div.time_left_seconds_first_promo" ).html( '0' );
	    $( "div.time_left_seconds_second_promo" ).html( '0' );
	}
	else
	{
	    var time_left_tmp = time_left_winter;
	    var seconds = 0;
	    seconds = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - seconds ) / 60;
	
	    var minutes = 0;
	    minutes = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - minutes ) / 60;
	
	    var hours = 0;
	    hours = time_left_tmp % 24; //tova e originalnia nachin
	   // hours = time_left_tmp; //tova e zashtoto imame counter koyto nqma days a samo hours
	    
	    var days = 0;
	    days = ( time_left_tmp - hours ) / 24;
	
	
	    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
	    {
	        window.location.reload();
	        return;
	    }
		
	    if( seconds < 10 )
	        seconds = '0' + seconds;
	    if( minutes < 10 )
	        minutes = '0' + minutes;
	    if( hours < 10 )
	        hours = '0' + hours;
	    if( days < 10 )
	        days = '0' + days;
		
	    var aDay    = days.toString().split('');
	    var aHour   = hours.toString().split('');
	    var aMinute = minutes.toString().split('');
	    var aSecond = seconds.toString().split('');
	    
		
	    time_left_winter --;
	    $( "div.time_left_days_first_promo" ).html( aDay[0] );
	    $( "div.time_left_days_second_promo" ).html( aDay[1] );
	    
	    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
	    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
	    
	    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
	    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
		
	    $( "div.time_left_seconds_first_promo" ).html( aSecond[0] );
	    $( "div.time_left_seconds_second_promo" ).html( aSecond[1] );
	    
	    setTimeout ( "winterCounterHome()", 1000 );
	}

}

function blackFridayCounter()
{
    var time_left_tmp = time_left_black_friday;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;


    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    
	
    time_left_black_friday --;
    $( "div.time_left_days_first_promo" ).html( aDay[0] );
    $( "div.time_left_days_second_promo" ).html( aDay[1] );
    
    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
    
    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
	
    $( "div.time_left_seconds_promo" ).html( seconds );
    setTimeout ( "blackFridayCounter()", 1000 );

}

function xmasCounter()
{
	if (zero_counter_xmas)
	{
		$( "div.time_left_days_first_promo" ).html( '0' );
	    $( "div.time_left_days_second_promo" ).html( '0' );
	    
	    $( "div.time_left_hours_first_promo" ).html( '0' );
	    $( "div.time_left_hours_second_promo" ).html( '0' );
	    
	    $( "div.time_left_minutes_first_promo" ).html( '0' );
	    $( "div.time_left_minutes_second_promo" ).html( '0' );
		
	    $( "div.time_left_seconds_first_promo" ).html( '0' );
	    $( "div.time_left_seconds_second_promo" ).html( '0' );
	    
	    $( "div.time_left_seconds_promo" ).html( '00' );
	}
	else
	{
	    var time_left_tmp = time_left_xmas;
	    var seconds = 0;
	    seconds = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - seconds ) / 60;
	
	    var minutes = 0;
	    minutes = time_left_tmp % 60;
	    time_left_tmp = ( time_left_tmp - minutes ) / 60;
	
	    var hours = 0;
	    hours = time_left_tmp % 24;
	
	    var days = 0;
	    days = ( time_left_tmp - hours ) / 24;
	
	    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
	    {
	        window.location.reload();
	        return;
	    }
		
	    if( seconds < 10 )
	        seconds = '0' + seconds;
	    if( minutes < 10 )
	        minutes = '0' + minutes;
	    if( hours < 10 )
	        hours = '0' + hours;
	    if( days < 10 )
	        days = '0' + days;
		
	    var aDay    = days.toString().split('');
	    var aHour   = hours.toString().split('');
	    var aMinute = minutes.toString().split('');
	    var aSecond = seconds.toString().split('');
		
	    time_left_xmas--;
	    $( "div.time_left_days_first_promo" ).html( aDay[0] );
	    $( "div.time_left_days_second_promo" ).html( aDay[1] );
	    
	    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
	    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
	    
	    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
	    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
		
	    $( "div.time_left_seconds_first_promo" ).html( aSecond[0] );
	    $( "div.time_left_seconds_second_promo" ).html( aSecond[1] );
	    
	    $( "div.time_left_seconds_promo" ).html( seconds );
	    setTimeout ( "xmasCounter()", 1000 );
	}
}

function newYearCounter()
{
    var time_left_tmp = time_left_new_year;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    
	
    time_left_new_year--;
    $( "div.time_left_days_first_promo" ).html( aDay[0] );
    $( "div.time_left_days_second_promo" ).html( aDay[1] );
    
    $( "div.time_left_hours_first_promo" ).html( aHour[0] );
    $( "div.time_left_hours_second_promo" ).html( aHour[1] );
    
    $( "div.time_left_minutes_first_promo" ).html( aMinute[0] );
    $( "div.time_left_minutes_second_promo" ).html( aMinute[1] );
	
    $( "div.time_left_seconds_promo" ).html( seconds );
    setTimeout ( "newYearCounter()", 1000 );
}

function winterSaleCounter()
{
    
    var time_left_tmp = time_left_winter;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_winter--;
    $( "span.time_left_days_first" ).html( aDay[0] );
    $( "span.time_left_days_second" ).html( aDay[1] );
    
    $( "span.time_left_hours_first" ).html( aHour[0] );
    $( "span.time_left_hours_second" ).html( aHour[1] );
    
    $( "span.time_left_minutes_first" ).html( aMinute[0] );
    $( "span.time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.time_left_seconds_first" ).html( aSecond[0] );
    $( "span.time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "winterSaleCounter()", 1000 );
}

function launchSaleCounter()
{
    var time_left_tmp = time_left_launch;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_launch--;
    $( "span.time_left_days_first" ).html( aDay[0] );
    $( "span.time_left_days_second" ).html( aDay[1] );
    
    $( "span.time_left_hours_first" ).html( aHour[0] );
    $( "span.time_left_hours_second" ).html( aHour[1] );
    
    $( "span.time_left_minutes_first" ).html( aMinute[0] );
    $( "span.time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.time_left_seconds_first" ).html( aSecond[0] );
    $( "span.time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "launchSaleCounter()", 1000 );
}

function mainPromoCounter()
{
    var time_left_tmp = time_left_main_promo;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_main_promo--;
    $( "span.time_left_days_first" ).html( aDay[0] );
    $( "span.time_left_days_second" ).html( aDay[1] );
    
    $( "span.time_left_hours_first" ).html( aHour[0] );
    $( "span.time_left_hours_second" ).html( aHour[1] );
    
    $( "span.time_left_minutes_first" ).html( aMinute[0] );
    $( "span.time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.time_left_seconds_first" ).html( aSecond[0] );
    $( "span.time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "mainPromoCounter()", 1000 );
}

function summerPromoCounter()
{
    var time_left_tmp = time_left_summer_promo;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_summer_promo--;
    $( "span.time_left_days_first" ).html( aDay[0] );
    $( "span.time_left_days_second" ).html( aDay[1] );
    
    $( "span.time_left_hours_first" ).html( aHour[0] );
    $( "span.time_left_hours_second" ).html( aHour[1] );
    
    $( "span.time_left_minutes_first" ).html( aMinute[0] );
    $( "span.time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.time_left_seconds_first" ).html( aSecond[0] );
    $( "span.time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "summerPromoCounter()", 1000 );
}

function preLaunchSaleCounter()
{
    var time_left_tmp = time_left_pre_launch;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_pre_launch--;
    $( "span.time_left_days_first" ).html( aDay[0] );
    $( "span.time_left_days_second" ).html( aDay[1] );
    
    $( "span.time_left_hours_first" ).html( aHour[0] );
    $( "span.time_left_hours_second" ).html( aHour[1] );
    
    $( "span.time_left_minutes_first" ).html( aMinute[0] );
    $( "span.time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.time_left_seconds_first" ).html( aSecond[0] );
    $( "span.time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "preLaunchSaleCounter()", 1000 );
}

function promoVFCounter()
{
    var time_left_tmp = time_left_vf_promo;
    var seconds = 0;
    seconds = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - seconds ) / 60;

    var minutes = 0;
    minutes = time_left_tmp % 60;
    time_left_tmp = ( time_left_tmp - minutes ) / 60;

    var hours = 0;
    hours = time_left_tmp % 24;

    var days = 0;
    days = ( time_left_tmp - hours ) / 24;

    if( seconds == 0 && minutes == 0 && hours == 0 && days == 0 )
    {
        window.location.reload();
        return;
    }
	
    if( seconds < 10 )
        seconds = '0' + seconds;
    if( minutes < 10 )
        minutes = '0' + minutes;
    if( hours < 10 )
        hours = '0' + hours;
    if( days < 10 )
        days = '0' + days;
	
    var aDay    = days.toString().split('');
    var aHour   = hours.toString().split('');
    var aMinute = minutes.toString().split('');
    var aSecond = seconds.toString().split('');
    

    time_left_vf_promo--;
    $( "span.vf_time_left_days_first" ).html( aDay[0] );
    $( "span.vf_time_left_days_second" ).html( aDay[1] );
    
    $( "span.vf_time_left_hours_first" ).html( aHour[0] );
    $( "span.vf_time_left_hours_second" ).html( aHour[1] );
    
    $( "span.vf_time_left_minutes_first" ).html( aMinute[0] );
    $( "span.vf_time_left_minutes_second" ).html( aMinute[1] );
    
    $( "span.vf_time_left_seconds_first" ).html( aSecond[0] );
    $( "span.vf_time_left_seconds_second" ).html( aSecond[1] );
//    $( "span.time_left_seconds" ).html( seconds );
    
    setTimeout ( "promoVFCounter()", 1000 );
}

function fix_links()
{
	$("a").each(function() 
	{		
		var link_href = "";
		if (typeof($(this).attr("href")) != 'undefined')
			link_href = $(this).attr("href");
			
		var target = $(this).attr("target");
		var set_onclick = true;

		if (link_href.indexOf("#") > -1)
			set_onclick = false;
				
		if ($(this).prop("id") == 'fancybox-close')
			set_onclick = false;
		
		if ($(this).hasClass("promo_popup"))
			set_onclick = false;
		
		//if ($(this).hasClass("backtest"))
			//set_onclick = false;
		
		//if (link_href.indexOf("clickbank") > 0)
			//set_onclick = false;
		
		//if (link_href.indexOf("mycommerce") > 0)
			//set_onclick = false;
		
		if (link_href.indexOf("javascript:") > 0)
			set_onclick = false;
		
		if (target == "_blank")
			set_onclick = false;

		if ($(this).hasClass("disable-x"))
			set_onclick = true;
		
		if (set_onclick)
		{
			$(this).click(function() {
				show_promo_on_exit = false;
			});
		}
	});
}

function disable_x_event()
{
	show_promo_on_exit = false;
}

function confirmExit()
{
	if (show_promo_on_exit)
	{
		show_promo_on_exit = false;
		//$('div.backgr-close-btn').height($(document).height());
		//$('div#close_block').css("display", "block");
		
		$('div.backgr-close-btn').height($('body').height());
		$('div#close_block').css("visibility", "visible");
		$('div#close_block').css("height", "auto");
		$('html').css("overflow", "hidden");
		$(window).scrollTop(0);

		return '*****************************************************\n\n                  > > > >   W A I T   < < < <\n\n        CLICK  ***STAY ON PAGE***  BUTTON\n\n              to see our SPECIAL OFFER for you!\n\n*****************************************************';

	}
}

function checkForEnterAndSubmit(event, form_id) 
{
    if (event.which == 13 || event.keyCode == 13) 
    {
    	if (form_id != '')
    	{
    		disable_x_event();
    		document.getElementById(form_id).submit();
    	}
    	return true;
    }
    return false;
};

function isNoIframeOrIframeInMyHost(top_host_name) 
{
	//Ð°ÐºÐ¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð° Ð½Ðµ ÑÐµ Ð·Ð°Ñ€ÐµÐ¶Ð´Ð° Ð² irame Ð¸Ð»Ð¸ ÑÐµ Ð·Ð°Ñ€ÐµÐ¶Ð´Ð° Ð² iframe Ð² ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð¸Ñ Ð´Ð¾Ð¼ÐµÐ¹Ð½ Ð²Ñ€ÑŠÑ‰Ð° true Ð²Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²ÐµÐ½ ÑÐ»ÑƒÑ‡Ð°Ð¹ Ð²Ñ€ÑŠÑ‰Ð° false
	
	// Validation: it must be loaded as the top page, or if it is loaded in an iframe 
	// then it must be embedded in my own domain.
	// Info: IF top.location.href is not accessible THEN it is embedded in an iframe 
	// and the domains are different.
	var myresult = true;
	try {
	    var tophref = top.location.href;
	    var tophostname = top.location.hostname.toString(); // alert(tophostname);
	    var myhref = location.href;
	    if (tophref === myhref) {
	        myresult = true;
	    } else if (tophostname !== top_host_name) { //top_host_name = www.yourdomain.com
	        myresult = false;
	    }
	} catch (error) { 
	  // error is a permission error that top.location.href is not accessible 
	  // (which means parent domain <> iframe domain)!
	    myresult = false;
	}
	return myresult;
}

//End Cookie Consent Code
