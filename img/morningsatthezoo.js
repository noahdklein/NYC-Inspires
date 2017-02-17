$(function(){
	var errorBlock = $("#error");
	
	$(".submit").on("click",function(e){
		e.preventDefault();
		$(".submit").hide();
		$(".wait").show();
		var first_name = $("#cons_first_name").val();
		var last_name = $("#cons_last_name").val();
		var email = $("#cons_email").val();
		var address = $("#cons_street1").val();
		var city = $("#cons_city").val();
		var state = $("#cons_state").val();
		var zip = $("#cons_zip_code").val(); 
		var phone = $("#cons_phone").val();
		var level = $("#cons_membership_level").val();
		var number = $("#cons_membership_number").val();
		var adults = $("#adults").val();
		var children = $("#children").val();
		var ages = $("#cons_ages").val();
		var special = $("#cons_needs").val();
		var surveyID = $("#surveyID").val();
		var error = "";
			
		if (first_name == "") {
			error += "First name, ";
			}
		if (last_name == "") {
			error += "Last name, ";
			}
		if (address == "") {
			error += "Street adddress, ";
			}
		if (city == "") {
			error += "City, ";
			}
		if (zip == "") {
			error += "Zip, ";
			}
		if (email == "") {
			error += "Email, ";
			}
		if (number == "") {
			error += "Membership Number, ";
			}
				
		if (error != "") {
			error = "You must fill out the following fields:<br />"+error;
			error = error.substr(0,error.length-2);
			displayError(error);
			}
		else {
			if (!isValidEmail(email)) {
				error = "That email address is not valid!";
				displayError(error);
				}
			else {
				var url = "http://e.wcs.org/site/Survey?cons_info_component=t&cons_email="+email+"&cons_first_name="+first_name+"&cons_last_name="+last_name+"&cons_street1="+address+"&cons_city="+city+"&cons_state="+state+"&cons_zip_code="+zip+"&cons_phone="+phone+"&3255_13368_2_10774="+level+"&3255_13368_3_10775="+number+"&3255_13368_4_10776="+adults+"&3255_13368_5_10777="+children+"&3255_13368_6_10778="+ages+"&SURVEY_ID="+surveyID+"&ACTION_SUBMIT_SURVEY_RESPONSE=Submit";
								
			$.ajax({
				  type: "POST",
				  url: url
				}).always(function(){
				 	$("#form").hide(); 
				 	$("#thanks").show();
			 	});
			}
		}
	});
		
	function isValidEmail(str) {
	   	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	   	if (filter.test(str)) {
	   		return true;
	   		}
	   	else{
	   		return false;
			}
		}
	
	function displayError(error) {
		errorBlock.html(error);
		$('body,html').animate({ scrollTop: errorBlock.offset().top }, 500);
		$(".submit").show();
		$(".wait").hide();
		}		
});