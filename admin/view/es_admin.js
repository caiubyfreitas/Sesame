/*
* ****************************************************************************************************************************
*
* ADMINISTRATOR VIEW IMPLEMENTATION
* jan-2018
* By Caiuby Freitas
*
* Implements a module that holds all the functions related to presentation features.
* This is the VIEW counterpart of the MVC-based abstraction implemented herein.
*
* ****************************************************************************************************************************
*/

var admin = (function(){

	var _ID;
	
	function ValidChanges(){
		
		// read field values
		var fullname = $("#Admin-fldFullName").val();
		var name = $("#Admin-fldName").val();
		var email = $("#Admin-fldEmail").val();
		var password = $("#Admin-fldPassword").val();
		
		// clear previous alerts
		$("#Admin-Alerts").hide();
		$("#Admin-Alerts li").remove();
		
		// check required fields
		if (fullname.length == 0){
			$("#Admin-fldFullName").focus();
			$("#Admin-Alerts").append("<li>Informe seu nome completo. Evite abreviações se possível.</li>"); 
		}			
		if (name.length == 0){
			$("#Admin-fldName").focus();
			$("#Admin-Alerts").append("<li>Informe um nome curto e significativo para acessar o sistema.</li>"); 
		}
		if (email.length == 0){
			$("#Admin-fldEmail").focus();
			$("#Admin-Alerts").append("<li>Indique o e-mail para receber notificações do sistema.</li>"); 
		}
		if (password.length == 0){
			$("#Admin-fldPassword").focus();
			$("#Admin-Alerts").append("<li>Crie uma senha que contenha números e letras para aumentar sua segurança.</li>"); 
		}
		
		// check if any alert was appended to the page to trigger proper action
		if ($("#Admin-Alerts li").length > 0){
			$("#Admin-Alerts").show();
			return false;
		}
		else{
			return true;
		}
	}

	// All the functions bellow are called externally	
	return {

	
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Initialization routine
		* ------------------------------------------------------------------------------------------------------------------
		*/
	

		Init: function(){
			var pageName = global.getPageName();
			var id = global.getParam("id");
			if (pageName[1] === "es_admin" && id){ 
				admin._ID = global.Decrypt(id)
				admin.GetRecord({"id" : admin._ID});
			}
		},
		
		
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Return Id parameter value passed by url
		* ------------------------------------------------------------------------------------------------------------------
		*/

		
		GetID: function(){
			return admin._ID;
		},
		

		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Retrieve record data by ID
		* ------------------------------------------------------------------------------------------------------------------
		*/


		GetRecord: function(id){
			controller.call(
				"findById",
				"Admin", 
				id,
				this.ShowRecordView,
				function(data){
					console.log(data)
				}
			);
		},
		

		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Overwrite record data by ID
		* ------------------------------------------------------------------------------------------------------------------
		*/


		UpdateRecord: function(changes){
			if (ValidChanges()){	
				global.ShowWaitCursor(true);
				controller.call(
					"update",
					"Admin",
					changes,				
					function(data){
						global.ShowWaitCursor(false);
						$("#MESSAGEBOX-text").html("Alteração concluída.");
						$("#MESSAGEBOX").modal("show");
					},
					function(data){
						console.log(data);
					}
				);
			}
		},
	
	
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Presentation functions
		* ------------------------------------------------------------------------------------------------------------------
		*/
			
			
		// Show record view page
		ShowRecordView: function(data){
			$("#Admin-fldFullName").val(data.ROWS[0].NAME);
			$("#Admin-fldName").val(data.ROWS[0].USERNAME);
			$("#Admin-fldEmail").val(data.ROWS[0].EMAIL);
		}
		
	}
})();


/*
* ------------------------------------------------------------------------------------------------------------------
* Event handlers
* ------------------------------------------------------------------------------------------------------------------
*/

$(document).ready(function(){
	
	admin.Init();

	$("#Admin-lnk").on("click", function(e){
		global.goToPage("es_admin.php?id=" + global.Encrypt($(this).data("id").toString()));
		e.preventDefault();
	});

	$("#Admin-cmdClose").on("click", function(e){
		global.goToPage("es_dashboard.php");
		e.preventDefault();		
	});

	$("#Admin-cmdSave").on("click", function(e){
		// check if logged user id is not expired
		var id = admin.GetID();
		if ( !(id) || (id.length == 0) ){
			global.Authenticate();
		}
		else{
			admin.UpdateRecord(
				{
					"id" 		: id,
					"fullname" 	: $("#Admin-fldFullName").val(),
					"name" 		: $("#Admin-fldName").val(),
					"email"		: $("#Admin-fldEmail").val(),
					"password" 	: $("#Admin-fldPassword").val()
				}
			);		
		}
		e.preventDefault();		
	});
	
});