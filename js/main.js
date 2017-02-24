$(function(){
	$.urlParam = function(name){
    	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    	if (results==null){
	    	return null;
	    	}
	    else{
		    return results[1] || 0;
		    }
    	}
    if ($.urlParam('email')) {
	    $("#email").val($.urlParam('email').replace('%40','@'));    
		}
	// if ($.urlParam('survey_id')) {
	//     $("#SURVEY_ID").val($.urlParam('survey_id'));    
	// 	}
	$("#petition-submit").on("click",function(e){		
		e.preventDefault();
		var first = $("#first_name").val();
		var last = $("#last_name").val();
		var email = $("#email").val();
		var street1 = $("#street1").val();
		var city = $("#city").val();
		var state = $("#state").val();
		var zip = $("#zip").val();
		// var surveyID = $("#SURVEY_ID").val();
		var errorBlock = $("#error");
		var errorCount = 0;
		$("#first_name").removeClass("error");
		$("#last_name").removeClass("error");
		$("#email").removeClass("error");
		$("#street1").removeClass("error");
		$("#city").removeClass("error");
		$("#state").removeClass("error");
		$("#zip").removeClass("error");
				
		if (first == "" || first == "First Name") {
			$("#first_name").addClass("error");
			errorCount++;
			}
		if (last == "" || last == "Last Name") {
			$("#last_name").addClass("error");
			errorCount++;
			}
		if (email == "" || email == "Email") {
			$("#email").addClass("error");
			errorCount++;
			}
		if ((email != "") && (!isValidEmail(email))) {
			$("#email").addClass("error");
			$("#email-error").html("That email address is not valid!");
			errorCount++;
			}
		if (street1 == "" || street1 == "Street Address") {
			$("#street1").addClass("error");
			errorCount++;
			}
		if (city == "" || city == "City") {
			$("#city").addClass("error");
			errorCount++;
			}
		if (state == "" || state == "State") {
			$("#state").addClass("error");
			errorCount++;
			}
		if (zip == "" || zip == "Zip") {
			$("#zip").addClass("error");
			errorCount++;
			}
		
		if (errorCount != 0) {
			$("#error").html("Please complete the following fields:");
			var offset = $("#error").offset();
			$("html, body").animate({ scrollTop: offset.top }, 250);
			}
		else {
			if (!isValidEmail(email)) {
				errorBlock.html("That email address is not valid!");
				}
			else {
				var url = "https://secure3.convio.net/wcs/site/CRAdvocacyAPI?method=takeAction&api_key=zooapikey&v=1.0&alert_id=833&alert_type=action&first_name="+first+"&last_name="+last+"&email="+email+"&street1="+street1+"&city="+city+"&state="+state+"&zip="+zip;
				$.ajax({
					  type: "POST",
					  url: url
					})
					.always(function(){
					 	$("#PetitionForm").animate({ opacity: 0 }, 150, function(){
						$("#PetitionForm").hide();
						$("#petition-thanks").css({ opacity: 0 }).show().animate({ opacity: 1 }, 150);
					 	});
					});
				}
			}
		});
	$("#state").on("change",function(e){
		if ($(this).val() != "State") {
			$(this).removeClass("init");
			$("option[value='']",this).remove();
		}
		else {
			$(this).addClass("init");
		}
	});
	function isValidEmail(str) {
	   	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	   	if (filter.test(str)) {
	   		return true;
	   		}
	   	else {
	   		return false;
			}
		}
	});
// Culture Stories show/hide
$(document).ready(function(){
$("#MoreIAmNYCCulture").hide(); 
$("#showbutton").click(function(){
$("#MoreIAmNYCCulture").slideToggle(500);
$(this).text($(this).text() == 'More Stories' ? 'Hide Stories' : 'More Stories'); 
return false;
});
});
// Slideshow
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
// council member dropdown
$('.rep-show-hide').hide();
	$('#districtRep').change(function(){
	$(this).find("option").each(function()
	{
	$('#' + this.value).hide();
	});
	    $('#' + this.value).show();
});
