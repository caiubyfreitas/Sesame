
$(document).ready(function() {
	/*
	---------------------------------------------------
	General Settings
	-----------------------------------------------------
	*/
	var _DEBUG_MODE = false;

	$.mask.definitions['~'] = "[+-]";
	$.mask.definitions['x'] = "[A-Za-z0-9 ]";
	$.mask.definitions['d'] = "[0-9.]";
	
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

    $('[data-toggle="tooltip"]').tooltip(); 
	/*
	-----------------------------------------------------
	Load locally stored information
	---------------------------------------------------
	*/
	
	if (typeof(Storage) !== "undefined"){ // Test if html5 local storage is supported
		$("#fldName").val(localStorage.getItem("fldName")); // Retrieve stored values
		$("#fldLandLine").val(localStorage.getItem("fldLandLine")); // Retrieve stored values
		$("#fldMobilePhone").val(localStorage.getItem("fldMobilePhone")); // Retrieve stored values
	}
	else{
		$("#fldName").val(getCookie("fldName")); // If not, use cookies to do it
		$("#fldLandLine").val(getCookie("fldLandLine")); // If not, use cookies to do it
		$("#fldMobilePhone").val(getCookie("fldMobilePhone")); // If not, use cookies to do it
	}
	
	/*
	---------------------------------------------------
	WOW Plugin Initialisation
	-----------------------------------------------------
	*/
	wow = new WOW(
	{
		boxClass:     'wow',      // Class name that reveals the hidden box when user scrolls.
		animateClass: 'animated', // Class name that triggers the CSS animations (’animated’ by default for the animate.css library)
		offset:       0,          // Define the distance between the bottom of browser viewport and the top of hidden box. When the user scrolls and reach this distance the hidden box is revealed.
		mobile:       true,       // Turn on/off WOW.js on mobile devices.
		live:         false       // Constantly check for new WOW elements on the page.
	});
	wow.init();

	/*
	-----------------------------------------------------
	Login form - Fields mask settings
	-----------------------------------------------------
	*/
	$("#fldNIC").mask("99999-9");
	$("#fldPassword").mask("9999x");
	
	/*
	-----------------------------------------------------
	Sign-up form - Mask settings
	-----------------------------------------------------
	*/
	$("#fldName").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldParentName1").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldParentName2").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldParentName3").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldParentName4").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldParentName5").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldProfession").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldCourse").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldMarketSeg").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldObs").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	$("#fldBPlan").mask("A", {
		placeholder: "", 
		autoclear: false,
		translation: {
			'A': {
				pattern: /[A-Za-z ]/,
				recursive: true
			}
		}
	});
	
	
	$("#fldCPF").mask("999.999.999-99", {"autoclear": false});
    $("#fldDoB1").datepicker({
		changeYear: true, 
		yearRange: "1900:1999",
		minDate: new Date(1939, 1-1, 1),
		maxDate: "-18y",
		altFormat: "dd/mm/yy",
		dateFormat: "dd/mm/yy",
		monthNames:	["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		showAnim: "slideDown",
		constrainInput: true,
		onClose: function(){
		}
	});
    $("#fldDoB2").datepicker({
		changeYear: true, 
		yearRange: "1900:1999",
		minDate: new Date(1949, 1-1, 1),
		maxDate: "-18y",
		altFormat: "dd/mm/yy",
		dateFormat: "dd/mm/yy",
		monthNames:	["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		showAnim: "slideDown",
		constrainInput: true,
		onClose: function(){
		}
	}); 
    $("#fldDoB3").datepicker({
		changeYear: true, 
		yearRange: "1900:1999",
		minDate: new Date(1959, 1-1, 1),
		maxDate: "-18y",
		altFormat: "dd/mm/yy",
		dateFormat: "dd/mm/yy",
		monthNames:	["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		showAnim: "slideDown",
		constrainInput: true,
		onClose: function(){
		}
	});  
    $("#fldDoB4").datepicker({
		changeYear: true, 
		yearRange: "1900:1999",
		minDate: new Date(1899, 1-1, 1),
		maxDate: "-18y",
		altFormat: "dd/mm/yy",
		dateFormat: "dd/mm/yy",
		monthNames:	["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		showAnim: "slideDown",
		constrainInput: true,
		onClose: function(){
		}
	});   
    $("#fldDoB5").datepicker({
		changeYear: true, 
		yearRange: "1879:1999",
		minDate: new Date(1879, 1-1, 1),
		maxDate: "-18y",
		altFormat: "dd/mm/yy",
		dateFormat: "dd/mm/yy",
		monthNames:	["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
		showAnim: "slideDown",
		constrainInput: true,
		onClose: function(){
		}
	});    
	$("#fldDoB1").mask("99/99/9999");
	$("#fldDoB2").mask("99/99/9999");
	$("#fldDoB3").mask("99/99/9999");
	$("#fldDoB4").mask("99/99/9999");
	$("#fldDoB5").mask("99/99/9999");
	$("#fldLandLine").mask("t", {
		translation: {
			't': {
				pattern: /[0-9()\+\- ]/,
				recursive: true
			}
		}
	});
	$("#fldMobilePhone").mask("t", {
		translation:{
			't': {
				pattern: /[0-9()\+\- ]/,
				recursive: true
			}
		}
	});
	$("#fldExpWage").mask("#,##0.00", {reverse: true});
	$("#fldExpProf").mask("##");
	$("#fldRetWage").mask("##.##0", {reverse: true});
	$("#fldInvest").mask("#,##0,000.00", {reverse: true});
	
	/*
	---------------------------------------------------
	Sign-up page - Navigation initial settings
	---------------------------------------------------
	*/
	var pages = 0;
	var handle = null;

	//Opens Sign-up form screen
	$("#btn-open-form").click(function(e){
		$("#sign-up-form > fieldset").css({"display": "none"});
		$("#sign-up-modal").modal("show");
		pages = $("#sign-up-form").find("fieldset").length;
		handle = $('#sign-up-form fieldset:first-child');
		handle.first();
		handle.fadeIn('slow');
		/*
		-----------------------------------------------------
		Sign-up form - Initialisation
		-----------------------------------------------------
		*/
		$("#fldGraduation").prop( "disabled", false );
	});
	
	$("#btn-close-dialog").click(function(e){
		$("#sign-up-modal").modal("hide");		
	});

	/*
	---------------------------------------------------
	Sign-up page - Fields validation and navigation
	---------------------------------------------------
	*/
	
	//Validation: bonds must be selected if user checks "Sim"
	$("input:checkbox[name=fldBonds]").prop("disabled", true);			
	$("input[name='fldHasBonds']").click(function(e){
		if ($("input[name='fldHasBonds']:checked").val() == "0"){
			$("input:checkbox[name=fldBonds]").prop("checked", false);
			$("input:checkbox[name=fldBonds]").prop("disabled", true);
		}
		else{
			$("input:checkbox[name=fldBonds]").prop("disabled", false);			
		}
	});
	
	//Validation: if any bonds was checked, then "hasBonds" must be "Sim"
	$("input[name='fldBonds']").click(function(e){
		$("input[name=fldHasBonds][value=1]").prop("checked", true);
	});

	//Validation: Graduation required if user has superior grade
	$("#fldScholarship").change(function(e){
		if ($("#fldScholarship").val() > 2){
			$("#fldGraduation").prop( "disabled", false );
		}
		else{
			$("#fldGraduation").prop( "disabled", true );
			$("#fldGraduation").val("");
		}
	});

	//Navigation: User wants to go back to the first page
	$("#btn-back-page1").click(function(e){
		handle.fadeOut(400, function(){
			handle = $(this).prev();
			handle.fadeIn('slow');
		});		
	});
	
	//Navigation: User wants to go back to the second page
	$("#btn-back-page2").click(function(e){
		handle.fadeOut(400, function(){
			handle = $(this).prev();		
			handle.fadeIn('slow');
		});		
	});
	
	//Navigation: User wants to go back to the third page
	$("#btn-back-page3").click(function(e){
		handle.fadeOut(400, function(){
			if (($("input[name='fldHasBonds']:checked").val() == "0")){ //Não tem parentes portugueses
				handle = $(this).prev().prev();
			}
			else{
				handle = $(this).prev();
			}
			handle.fadeIn('slow');
		});		
	});	
	
	$("#btn-back-page4").click(function(e){
		handle.fadeOut(400, function(){
			handle = $(this).prev();		
			handle.fadeIn('slow');
		});		
	});
	
	//Navigation: User wants to proceed to the second page
	$("#btn-goto-page2").click(function(e){
		var isValid = true;
		if (!_DEBUG_MODE){
			
			//Validation: Full name
			if ($.trim($("#fldName").val()).length == 0){
				$("#fldNameGroup").addClass("has-danger");
				$("#fldNameValidationMsg").show();
				isValid = false;
			}		
			else{
				$("#fldNameGroup").removeClass("has-danger");
				$("#fldNameValidationMsg").hide();
				if (typeof(Storage) !== "undefined"){ // Test if local storage is supported
					localStorage.setItem("fldName", $("#fldName").val()); // Save data locally
				}
				else{
					setCookie("fldName", $("#fldName").val(), 30); // if not, use cookie to do it
				}
			}
			
			//Validation: E-mail
			if($.trim($("#fldEmail").val()).length == 0){
				$("#fldEmailGroup").addClass("has-danger");
				$("#fldEmailValidationMsg").show();
				isValid = false;
			}
			else{
				$("#fldEmailGroup").removeClass("has-danger");
				$("#fldEmailValidationMsg").hide();
			}

			//Validation: Telephones
			if (($.trim($("#fldLandLine").val()).length === 0) && ($.trim($("#fldMobilePhone").val()).length === 0)){
				$("#fldPhoneGroup").addClass("has-danger");
				$("#fldPhoneValidationMsg").show();
				isValid = false;
			}
			else{
				$("#fldPhoneGroup").removeClass("has-danger");
				$("#fldPhoneValidationMsg").hide();
				if (typeof(Storage) !== "undefined"){ // Test if local storage is supported
					localStorage.setItem("fldLandLine", $("#fldLandLine").val()); // Save data locally
					localStorage.setItem("fldMobilePhone", $("#fldMobilePhone").val()); // Save data locally
				}
				else{
					setCookie("fldLandLine", $("#fldLandLine").val(), 30); // if not, use cookie to do it
					setCookie("fldMobilePhone", $("#fldMobilePhone").val(), 30); // if not, use cookie to do it
				}
			}
			
			//Validation: If user agrees with the terms
			if (!$("#fldIAgree").is(":checked")){
				$("#fldIAgreeValidationMsg").show();
				isValid = false;
			}
			else{
				$("#fldIAgreeValidationMsg").hide();
			}
		}
		if (isValid){
			handle.fadeOut(400, function(){
				handle = $(this).next();
				handle.fadeIn('slow');	
			});
		}
	});
	
	//Navigation: User wants to proceed to the third page
	$("#btn-goto-page3").click(function(e){
		var isValid = true;
		if (!_DEBUG_MODE){   
			if (!$("input[name='fldIsPortuguese']:checked").val()){
				$("#fldIsPortugueseGroup").addClass("has-danger");
				$("#fldIsPortugueseValidationMsg").show();
				isValid = false;
			}
			else{
				$("#fldIsPortugueseGroup").removeClass("has-danger");
				$("#fldIsPortugueseValidationMsg").hide();				
			}
			$("#fldHasBondsGroup").removeClass("has-danger");
			$("#fldHasBondsValidationMsg").hide();
			if (!$("input[name='fldHasBonds']:checked").val()){
				$("#fldHasBondsGroup").addClass("has-danger");
				$("#fldHasBondsValidationMsg").show();
				isValid = false;
			}
			if (($("input[name='fldHasBonds'][value=1]:checked").val() && !$("input[name='fldBonds']:checked").val())){
				$("#fldHasBondsGroup").addClass("has-danger");
				$("#fldHasBondsValidationMsg").show();
				isValid = false;
			}		
		}
		
		if (isValid){
			
			//Validation: Test eligibility rules
			if ($("input[name='fldIsPortuguese'][value=1]:checked").val()){ //é português
				$("#submission-msg").html("<img src=\"imgs/icon-congrats.png\"/ class=\"pull-left\" style=\"margin-right: 10px;\" width=\"64\" height=\"64\"/><p class=\"clearfix\">Parabéns!<BR>Você já possui nacionalidade portuguesa.</p><p class=\"pull-left\">Se pretende solicitar nacionalidade para outra pessoa de sua família, preencha o formulário com os dados dessa pessoa e obtenha mais informações.</p><p class=\"pull-left\">Se não encontrou a opção desejada por favor entre em contato conosco.</p>");
				$("#sign-up-form").submit();
			}
			else{
				
				if ($("input[name='fldHasBonds'][value=0]:checked").val()){ //não tem parentes portugueses
					handle.fadeOut(400, function(){
						handle = $(this).next().next();
						handle.fadeIn('slow');	
					});
				}
				else{
					//Navigation: Controls fields visibility
					$(".P3CS1").css({"display":"none"});				
					$(".P3CS2").css({"display":"none"});				
					$(".P3CS3").css({"display":"none"});				
					$(".P3CS4").css({"display":"none"});				
					$(".P3CS5").css({"display":"none"});		
					
					if ($("input[name='fldBonds'][value=1]:checked").val()) { //pais
						$(".P3CS1").css({"display":"block"});
					}  
					if ($("input[name='fldBonds'][value=2]:checked").val()) { //cônjuge
						$(".P3CS2").css({"display":"block"});
					}
					if ($("input[name='fldBonds'][value=4]:checked").val()) { //filhos
						$(".P3CS3").css({"display":"block"});						
					}
					if ($("input[name='fldBonds'][value=8]:checked").val()) { //avós
						$(".P3CS4").css({"display":"block"});
					}
					if ($("input[name='fldBonds'][value=16]:checked").val()) { //bisavós
						$(".P3CS5").css({"display":"block"});
					}
					handle.fadeOut(400, function(){
						handle = $(this).next();
						handle.fadeIn('slow');	
					});
				}
			}
		}
	});	

	
	//Navigation: User wants to proceed to the forth page
	$("#btn-goto-page4").click(function(e){
		var isValid = true;
		if (!_DEBUG_MODE){
			
			//Validate all field with bonds detailed information
			if ($("input[name='fldBonds'][value=1]:checked").val() && (($.trim($("#fldParentName1").val()).length == 0) || ($.trim($("#fldDoB1").val()).length == 0))){
				$("#fldParentName1Group").addClass("has-danger");
				$("#fldParentName1ValidationMsg").show();
				isValid = false;
			}	
			else{
				$("#fldParentName1Group").removeClass("has-danger");
				$("#fldParentName1ValidationMsg").hide();				
			}			
			if ($("input[name='fldBonds'][value=2]:checked").val() && (($.trim($("#fldParentName2").val()).length == 0) || ($.trim($("#fldDoB2").val()).length == 0))){
				$("#fldParentName2Group").addClass("has-danger");
				$("#fldParentName2ValidationMsg").show();
				isValid = false;
			}	
			else{
				$("#fldParentName2Group").removeClass("has-danger");
				$("#fldParentName2ValidationMsg").hide();				
			}		
			if ($("input[name='fldBonds'][value=4]:checked").val() && (($.trim($("#fldParentName3").val()).length == 0) || ($.trim($("#fldDoB3").val()).length == 0))){
				$("#fldParentName3Group").addClass("has-danger");
				$("#fldParentName3ValidationMsg").show();
				isValid = false;
			}	
			else{
				$("#fldParentName3Group").removeClass("has-danger");
				$("#fldParentName3ValidationMsg").hide();				
			}		
			if ($("input[name='fldBonds'][value=8]:checked").val() && (($.trim($("#fldParentName4").val()).length == 0) || ($.trim($("#fldDoB4").val()).length == 0))){
				$("#fldParentName4Group").addClass("has-danger");
				$("#fldParentName4ValidationMsg").show();
				isValid = false;
			}	
			else{
				$("#fldParentName4Group").removeClass("has-danger");
				$("#fldParentName4ValidationMsg").hide();				
			}		
			if ($("input[name='fldBonds'][value=16]:checked").val() && (($.trim($("#fldParentName5").val()).length == 0) || ($.trim($("#fldDoB5").val()).length == 0))){
				$("#fldParentName5Group").addClass("has-danger");
				$("#fldParentName5ValidationMsg").show();
				isValid = false;
			}	
			else{
				$("#fldParentName5Group").removeClass("has-danger");
				$("#fldParentName5ValidationMsg").hide();				
			}		
			if (isValid){
				
				//Notifications: Test eligibility rules
				if (($("input[name='fldBonds'][value=1]:checked").val() || $("input[name='fldBonds'][value=8]:checked").val())){ //pais e avós
					$("#submission-msg").html("<img src=\"imgs/icon-congrats.png\"/ class=\"pull-left\" style=\"margin-right: 10px;\" width=\"64\" height=\"64\"/><p class=\"clearfix\">Parabéns!<BR>Você é elegível por parentesco.</p><p class=\"pull-left\">Nossa equipe entrará em contato em breve para obter informações mais específicas que serão necessárias para os próximos passos.</p><p>Queremos comemorar grandes conquistas juntos!</p>");
				}
				if (($("input[name='fldBonds'][value=2]:checked").val() || $("input[name='fldBonds'][value=4]:checked").val() || $("input[name='fldBonds'][value=16]:checked").val())){ //bisavós, cônjuge, filhos
					$("#submission-msg").html("<img src=\"imgs/icon-congrats.png\"/ class=\"pull-left\" style=\"margin-right: 10px;\" width=\"64\" height=\"64\"/><p class=\"clearfix\">Parabéns!<BR>Você pode ser elegível em razão dos laços que tem com cidadãos portugueses.</p><p class=\"pull-left\">Nossa equipe entrará em contato em breve para obter informações mais específicas que serão necessárias para os próximos passos.</p><p>Queremos comemorar grandes conquistas juntos!</p>");
				}
				$("#sign-up-form").submit();	
			}
		}
	});
					
	//Navigation: User wants to proceed to the fifth page
	$("#btn-goto-page5").click(function(e){
		var isValid = true;
		if (!_DEBUG_MODE){
			
			//Validation: User must select one option
			if (!$("input[name='fldGoal']:checked").val()){
				$("#fldGoalGroup").addClass("has-danger");
				$("#fldGoalValidationMsg").show();				
				isValid = false;
			}
			else{
				$("#fldGoalGroup").removeClass("has-danger");
				$("#fldGoalValidationMsg").hide();				
			}
		}
		if (isValid){
			handle.fadeOut(400, function(){

				//Sets whose fields will be visible regarding to user's goal
				$(".P4AF6").css({"display":"none"});				
				$(".P4AF5").css({"display":"none"});				
				$(".P4AF4").css({"display":"none"});				
				$(".P4AF3").css({"display":"none"});				
				$(".P4AF2").css({"display":"none"});				
				$(".P4AF1").css({"display":"none"});
				switch($("input[name='fldGoal']:checked").val()){
					case "1": //To work
						$(".P4AF1").css({"display":"block"});
						break;
					case "2": //To study
						$(".P4AF2").css({"display":"block"});
						break;
					case "3": //To enterpreneur
						$(".P4AF3").css({"display":"block"});
						break;
					case "4": //To retire
						$(".P4AF4").css({"display":"block"});
						break;
					case "5": //Rick Rich
						$(".P4AF5").css({"display":"block"});
						break;
					case "6": //VIP
						$(".P4AF6").css({"display":"block"});
						break;
				}
				handle = $(this).next();
				handle.fadeIn('slow');
			});
		}
	});
	
	//Navigation: submits all after users reaches the last page
	$("#btn-submit-page2").click(function(e){
		
		//Validation: clean up open text fields
		$("#fldContactText").val($.trim($("#fldContactText").val()).replace( /[^a-zA-zÀ-ÿ0-9:;.,?!$#%&()@\/ ]/gi, ""));
		var isValid = true;
		if (!_DEBUG_MODE){
		}
		$("#sign-up-form").submit();
	});

	//Navigation: submits all after users reaches the last page
	$("#btn-submit-page5").click(function(e){		
		var isValid = true;
		if (!_DEBUG_MODE){
		
			//Validation: Goal = To work or To study
			if ($("input[name='fldGoal']:checked").val() == "1" || $("input[name='fldGoal']:checked").val() == "2"){
				
				//Validation: Scholarship is required
				if (!$("#fldScholarship").val()){
					$("#fldScholarshipGroup").addClass("has-danger");
					$("#fldScholarshipValidationMsg").show();
					isValid = false;
				}
				else{
					$("#fldScholarshipGroup").removeClass("has-danger");
					$("#fldScholarshipValidationMsg").hide();
				}
				
				//Validation: Graduation required if user has superior grade
				if (($("#fldScholarship").val() > 5) && ($.trim($("#fldGraduation").val()).length) == 0){
					$("#fldGraduationGroup").addClass("has-danger");
					$("#fldGraduationValidationMsg").show();
					isValid = false;
				}
				else{
					$("#fldGraduationGroup").removeClass("has-danger");
					$("#fldGraduationValidationMsg").hide();
				}
			}	

			//Validation: Goal = To work 
			if ($("input[name='fldGoal']:checked").val() == "1"){

				//Validation: Profession is required
				if (!$("#fldProfession").val()){
					$("#fldProfessionGroup").addClass("has-danger");
					$("#fldProfessionValidationMsg").show();	
					isValid = false;
					
				}
				else{
					$("#fldProfessionGroup").removeClass("has-danger");
					$("#fldProfessionValidationMsg").hide();				
				}

				//Validation: Experience time is required
				if (!$("#fldExpProf").val()){
					$("#fldExpProfGroup").addClass("has-danger");
					$("#fldExpProfValidationMsg").show();				
					isValid = false;
				}
				else{
					$("#fldExpProfGroup").removeClass("has-danger");
					$("#fldExpProfValidationMsg").hide();				
				}
			}
			
			//Validation: Goal = To study
			if ($("input[name='fldGoal']:checked").val() == "2"){
				
				//Validation: Graduation location is required
				if (!$("#fldGradLocation").val()){
					$("#fldGradLocationGroup").addClass("has-danger");
					$("#fldGradLocationValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldGradLocationGroup").removeClass("has-danger");
					$("#fldGradLocationValidationMsg").hide();				
				}
				
				//Validation: Course intended is required
				if (!$("#fldCourse").val()){
					$("#fldCourseGroup").addClass("has-danger");
					$("#fldCourseValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldCourseGroup").removeClass("has-danger");
					$("#fldCourseValidationMsg").hide();				
				}
			}

			//Validation: optional field
			if ($.trim($("#fldObs").val()).length > 0){
				$("#fldObs").val($.trim($("#fldObs").val()).replace( /[^a-zA-zÀ-ÿ0-9:;.,?!$#%&()@\/ ]/gi, ""));
			}
			
			//Validation: Goal = To enterpreneur
			if($("input[name='fldGoal']:checked").val() == "3"){

				//Validation: Business area is required
				if (!$.trim($("#fldMarketSeg").val()).length > 0){
					$("#fldMarketSegGroup").addClass("has-danger");	
					$("#fldMarketSegValidationMsg").show();
					isValid = false;
				}
				else{
					$("#fldMarketSeg").val($.trim($("#fldMarketSeg").val()).replace( /[^a-zA-zÀ-ÿ0-9:;.,?!$#%&()@\/ ]/gi, ""));
					$("#fldMarketSegGroup").removeClass("has-danger");
					$("#fldMarketSegValidationMsg").hide();
				}
				
				//Validation: Business location is required
				if (!$("#fldLocationToInv").val()){
					$("#fldLocationToInvGroup").addClass("has-danger");
					$("#fldLocationToInvValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldLocationToInvGroup").removeClass("has-danger");
					$("#fldLocationToInvValidationMsg").hide();						
				}

				//Validation: Initial investiment is required
				if ((isNaN($("#fldInvest").val())) || (Number($("#fldInvest").val()) == 0)){
					$("#fldInvest").val("");
					$("#fldInvestGroup").addClass("has-danger");
					$("#fldInvestValidationMsg").show();	
					isValid = false;
				}
				else{
					$("#fldInvestGroup").removeClass("has-danger");
					$("#fldInvestValidationMsg").hide();	
				}
	
				//Validation: Business plan is required
				if (!$.trim($("#fldBPlan").val()).length > 0){
					$("#fldBPlanGroup").addClass("has-danger");
					$("#fldBPlanValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldBPlanGroup").removeClass("has-danger");
					$("#fldBPlanValidationMsg").hide();		
					$("#fldBPlan").val($.trim($("#fldBPlan").val()).replace( /[^a-zA-zÀ-ÿ0-9:;.,?!$#%&()@\/ ]/gi, ""));
				}
			}
			
			//Validation: Goal = To retire
			if($("input[name='fldGoal']:checked").val() == "4"){
				
				//Validation: Retirement status is required
				if (!$("#fldSitRet").val()){
					$("#fldSitRetGroup").addClass("has-danger");
					$("#fldSitRetValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldSitRetGroup").removeClass("has-danger");
					$("#fldSitRetValidationMsg").hide();						
				}
				
				//Validation: Wage per month is required
				if ((isNaN($("#fldRetWage").val())) || (Number($("#fldRetWage").val()) == 0)){
					$("#fldRetWage").val("");
					$("#fldRetWageGroup").addClass("has-danger");
					$("#fldRetWageValidationMsg").show();	
					isValid = false;
				}
				else{
					$("#fldRetWageGroup").removeClass("has-danger");
					$("#fldRetWageValidationMsg").hide();	
				}
				
				//Validation: Location to retire is required
				if (!$("#fldLocationToRet").val()){
					$("#fldLocationToRetGroup").addClass("has-danger");
					$("#fldLocationToRetValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldLocationToRetGroup").removeClass("has-danger");
					$("#fldLocationToRetValidationMsg").hide();						
				}

				//Validation: Will_continue_to_work? is required
				if (!$("#fldKeepWrk").val()){
					$("#fldKeepWrkGroup").addClass("has-danger");
					$("#fldKeepWrkValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldKeepWrkGroup").removeClass("has-danger");
					$("#fldKeepWrkValidationMsg").hide();						
				}
				
				//Validation: Companion is required
				if (!$("#fldRetCompany").val()){
					$("#fldRetCompanyGroup").addClass("has-danger");
					$("#fldRetCompanyValidationMsg").show();		
					isValid = false;
				}
				else{
					$("#fldRetCompanyGroup").removeClass("has-danger");
					$("#fldRetCompanyValidationMsg").hide();						
				}

			}
		}
		$("#sign-up-form").submit();
	});
	
	/*
	---------------------------------------------------
	Sign-up page - Form submission
	---------------------------------------------------
	*/
	
	
	function formFieldsToObject( fields ) {
		  var product = {};

		  for( var i = 0; i < fields.length; i++ ) {
		    var field = fields[ i ];

		    if( ! product.hasOwnProperty( field.name ) ) {
		      product[ field.name ] = field.value;
		    }
		    else {
		      if( ! product[ field.name ] instanceof Array )
		        product[ field.name ] = [ product[ field.name ] ];

		      product[ field.name ].push( field.value );
		    }
		  }
		  return product;
	}

	$("#sign-up-form").submit(function(e){
		
		e.preventDefault();
		$("*").addClass("wait-cursor");

		// IS PORTUGUESE?
		$("input[name=ISPORTUGUESE").val( $("input[name='fldIsPortuguese']:checked").val() );
		
		if ($("input[name=ISPORTUGUESE").val() == "0"){ //Não
			
			// BONDS - Converts multiselection into bitwise value 
			for (i=0, j=1, s=0, max=$("input[name='fldBonds']").length; i<max; i++){
				var field = $("input[name='fldBonds'][value=" + j + "]:checked");
				if (field.val()){
					s += parseInt(field.val());
				}
				j *=2;
			}
			var r = String('00000'+(parseInt(s, 10).toString(2)).toString()).slice(-5);
			$('input[name=BONDS]').val(r);
					
			// Send data for processing
		    var url = window.location.href  +  "admin/es_controller.php";
			var pack = {
					"action" : "add",
					"module" : "Prospect",
					"params" : $("#sign-up-form").find(":input:not(:button)").serializeJSON() // Just the fiels with NAME attribute will be considered
			};
			$.ajax({
				context	: this,
				type	: "POST", 
				url		: url, 
				data	: pack,
				dataType: "json", 
				encode	: false
			})
			.done(function(data){
				if (data["RECORDS"] == 0){
					$("#submission-title").html("Aviso");
					$("#submission-msg").html("<img src=\"imgs/icon-congrats.png\"/ class=\"pull-left\" style=\"margin-right: 10px;\" width=\"64\" height=\"64\"/><p class=\"clearfix\">Seus dados já constam em nosso cadastro.<BR>Se quiser alterá-los ou incluir mais alguma informação importante podemos resolver isso juntos.</p><p class=\"pull-left\">Por favor, envie-nos um email com sua solicitação pelo \"Fale Conosco\" que nossa equipe entrará em contato.</p>");
				}
				else{
					$("#submission-msg").html("<img src=\"imgs/icon-congrats.png\"/ class=\"pull-left\" style=\"margin-right: 10px;\" width=\"64\" height=\"64\"/><p class=\"clearfix\">Parabéns pela iniciativa!<BR>Você pode ser elegível conforme as leis de imigração portuguesas.</p><p class=\"pull-left\">Nossa equipe entrará em contato em breve para obter informações mais específicas que serão necessárias para os próximos passos.</p><p>Queremos comemorar grandes conquistas juntos!</p>");
				}
			})
			.fail(function(data){	
				console.log(data);
			});			
		}
		else{
			
			
		}
		cleanUpFields("sign-up-form");	
		$("#sign-up-modal").modal("toggle");
		$("#submission-dialog").modal("show");
		$("*").removeClass("wait-cursor");	
	});
	
	function propectExists(msg){
		$("#submission-msg").html("<p class=\"clearfix\">" + msg + "</p>");
	}
	
	/*
	---------------------------------------------------
	Contact - Email submission
	---------------------------------------------------
	*/	
	$("#contact-form").submit(function(e){
		e.preventDefault(); //avoid to execute default submit
		$("*").addClass("wait-cursor");	
		var url = "sendmail.php";
		var request = $.ajax({
			type: "POST",
			url: url,
			data: $("#contact-form").serialize(),
			dataType: "json",
			encode: true,
			cache: false
		});
		request.done(function(data){
			console.log(data['message']);
		});
		request.fail(function(data){
			console.log(data["message"]);
		});
		request.always(function(data){
			$("#message-dialog").modal('show');
			$("#sendmail-return").text(data['message']);
			$("*").removeClass("wait-cursor");	
		});
	})

	/*
	 * Clean up and reset all form fields
	 * Parameter: form id 
	 */
	function cleanUpFields(frm){
		
		// Iterate through text fields
		$("#" + frm + " input[type=text]").each(function(){
			$("#fldHasBondsGroup").removeClass("has-danger");
		});
		$("#" + frm + " input[type=email]").each(function(){
			$("#fldHasBondsGroup").removeClass("has-danger");
		});
		
		//Iterate through checkboxes
		$("#" + frm + " input[type=checkbox]").each(function(){
			$("#fldHasBondsGroup").removeClass("has-danger");
		});
		
		//Iterate through radiobuttons
		$("#" + frm + " input[type=radio]:checked").each(function(){
			$("#fldHasBondsGroup").removeClass("has-danger");
		});					

	}
	
	
	/*
	---------------------------------------------------
	Sign-up page - CPF validation
	Source: http://blog.fernandowobeto.com/plugin-jquery-validacao-cpf/
	---------------------------------------------------
	*/	
	jQuery.fn.validacpf = function(){ 
		CPF = $(this).val();
		if(!CPF){ return false;}
		cpfv  = CPF;
		if(cpfv.length == 14 || cpfv.length == 11){
			cpfv = cpfv.replace('.', '');
			cpfv = cpfv.replace('.', '');
			cpfv = cpfv.replace('-', '');
			var nonNumbers = /\D/;
			if(nonNumbers.test(cpfv)){
				return false;
			}
			else
			{
				if (cpfv == "00000000000" ||
					cpfv == "11111111111" ||
					cpfv == "22222222222" ||
					cpfv == "33333333333" ||
					cpfv == "44444444444" ||
					cpfv == "55555555555" ||
					cpfv == "66666666666" ||
					cpfv == "77777777777" ||
					cpfv == "88888888888" ||
					cpfv == "99999999999") {
					return false;
				}
				var a = [];
				var b = new Number;
				var c = 11;

				for(i=0; i<11; i++){
					a[i] = cpfv.charAt(i);
					if (i < 9) b += (a[i] * --c);
				}
				if((x = b % 11) < 2){
					a[9] = 0
				}else{
					a[9] = 11-x
				}
				b = 0;
				c = 11;
				for (y=0; y<10; y++) b += (a[y] * c--);

				if((x = b % 11) < 2){
					a[10] = 0;
				}else{
					a[10] = 11-x;
				}
				if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
					return false;
				}
			}
		}
		else{
			return false;
		}
		return $(this);
	}
	
	/*
	---------------------------------------------------
	Skype integration
	---------------------------------------------------	
	*/
	Skype.ui({
		"name": "call",
		"element": "SkypeButton_Call_live:contato_48959_1",
		"participants": ["live:contato_48959"]
	});	
	
	var elementCounter = 1;
	$("#btn-add-field").click(function() {
		var clone = document.getElementById("section_toClone").cloneNode(true);
		var children = $(clone).find(".dynamic-field");
		if (children){
			children.each(function(key, element){
				$(element).attr("name", function(idx, currValue){
					var newName = (currValue + elementCounter);
					return newName;
				});
			});
			$("#lblNumber" + elementCounter).text="teste"
			elementCounter++;
		}
		$("#dynamic-field-container").append(clone);
		$(clone).removeClass("collapse");
	});

} );
  
	

