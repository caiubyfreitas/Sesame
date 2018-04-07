/*
* ****************************************************************************************************************************
*
* PROSPECTS VIEW IMPLEMENTATION
* jan-2018
* By Caiuby Freitas
*
* Defines what happens when user clicks on prospects menu options and implements presentation features.
* This is the VIEW counterpart of the MVC-based abstraction implemented herein.
*
* ****************************************************************************************************************************
*/

var prospect = (function(){		
	
	var _ID;
	
	// All the functions bellow are called externally
	return {

		SetID: function(newID){
			_ID = newID;
		},
		
		GetID: function(){
			return _ID;
		},
	
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Initialization routine
		* ------------------------------------------------------------------------------------------------------------------
		*/
	
	
		Init: function(){			
			var pageName = global.getPageName();
			if (pageName[1] === "es_prospect"){ 
				prospect.GetAll();
			}

		},
		
		
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Data manipulation functions
		* ------------------------------------------------------------------------------------------------------------------
		*/
		

		// Retrieve all records related to a specific page. If none provided, first page is assumed by default.
		GetAll: function(page = 1){
			controller.call(
				"getAllRecords", 
				"Prospect", 
				page, 
				this.ShowGridView, 
				function(data){ 
					console.log(data); 
				}
			);
		},
		
		// Retrieve all fields related to the record id number.
		GetRecord: function(id){
			controller.call(
				"findById",
				"Prospect", 
				id,
				this.ShowRecordView,
				function(data){
					console.log(data)
				}
			); 
		},
		
		// Deletion confirmation dialog passing on the id of the selected record.
		Delete: function(data, eventSource){
			controller.call(
				"remove",
				"Prospect", 
				{ 
					"id" : data 
				},
				function(data){
					prospect.ShowGridView($("#Prospect-View-Pagination li.active a").text());
				},
				function(data){
					console.log(data)
				}
			); 
		},
		
		Promote: function(data){
			controller.call(
				"changeStatus",
				"Prospect",
				{
					"id" : data,
					"status" : 2
				},
				function(data){
					global.goToPage("es_prospect.php");
				},
				function(data){
					console.log(data);
				}
			);
		},
	
	
		/*
		* ------------------------------------------------------------------------------------------------------------------
		* Presentation functions
		* ------------------------------------------------------------------------------------------------------------------
		*/
	
	
		// Shows grid view page
		ShowGridView: function(data, currentPage = 1){
						
			$("#Prospect-Edit").hide();				
			$("#lnkProspects").parent().addClass("active");
			$("#Prospect-View-Records").hide();
			$("#Prospect-View-DataTable").hide();
			$("#Prospect-View-Pagination").hide();
			$("#Prospect-View-DataTable tbody tr").remove();	

			// Binds ON DELETE event to the handler
			$("#Prospect-Delete-Confirmation").on("click", function(e){
				$("#Prospect-Delete").modal("hide");
				prospect.Delete($(this).data("id"), $(this).data("eventSource"));
			});					

			// If empty
			if (data.RECORDS === 0){
				$("#Prospect-View-Message").html(data.MESSAGE);
				$("#Prospect-View-Message").show();
			}
			else {
				$("#Prospect-View-Message").hide();
				
				var str = "";
				var table = $("#Prospect-View-DataTable tbody");
				global.ShowWaitCursor(true);				
				$.each(data.ROWS, function(idx, record){
					
					// Create HTML output for each record retrieved
					str  = "<tr><td style=\"width:10%\">" + (++idx) + "</td>";
					str += "<td style=\"width:40%\">" + record.NAME + "</td>";
					str += "<td style=\"width:40%\">" + record.EMAIL + "</td>";
					str += "<td class=\"text-center\" style=\"width:10%\">";
					str += "<a href=\"#\" class=\"btn btn-info btn-sm\" id=\"lnkEdit" + (idx) + "\" data-id=\"" + (record.ID) + "\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Ver</a>&nbsp;"
					str += "<a href=\"#\" class=\"btn btn-danger btn-sm\" id=\"lnkRemove" + (idx) + "\" data-id=\"" + (record.ID) + "\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>";
					str += "</td></tr>";
					table.append(str);	

					// Binds ON_EDIT event handler dynamically
					$("#lnkEdit"+idx).on("click", function(e){
						prospect.SetID($(this).data("id"));
						prospect.GetRecord({"id" : $(this).data("id")});
						e.preventDefault();
					});						

					// Binds ON_REMOVE event handler dynamically
					$("#lnkRemove"+idx).on("click", function(e){
						$("#Prospect-Delete-Confirmation").data("id", $(this).data("id"));
						$("#Prospect-Delete-Confirmation").data("eventSource", idx);
						$("#Prospect-Delete").modal("show");
						e.preventDefault();
					});
				});
				
				// Creates pagination if needed
				if (data.RECORDS > 0){

					var maxPerPage = 10;
					var totalRecords = data.RECORDS;
					var currentPage = data.CURRPAGE;

					$("#Prospect-View-Pagination li").remove();
					var str = "";
					var pages = Math.ceil(totalRecords / maxPerPage);
					for (i=1; i<=pages; i++){
						str = "<li class=\"page-item" + ((i == currentPage)? " active" : "") + "\"><a id=\"lnkPage" + (i) + "\" class=\"page-link\" href=\"#\">" + (i) + "</a></li>"; 
						$("#Prospect-View-Pagination ul").append(str);

						// Binds ON CLICK event to the handler dynamically, so that the page number can be passed on to the controller
						$("#lnkPage"+i).on("click", function(e){
							prospect.GetAll($(e.target).text());
							e.preventDefault();
						});
					}
					(pages > 1) ? $("#Prospect-View-Pagination").show() : $("#Prospect-View-Pagination").hide();


					$("#Prospect-View-Records").html(data.RECORDS);
					$("#Prospect-View-Records").show();
				}
				$("#Prospect-View-DataTable").show();
			}
			$("#Prospect-View").show();	
			global.ShowWaitCursor(false);
		},
		
		// Shows record view page
		ShowRecordView: function(data){
			global.ShowWaitCursor(true);

			// Fill up regular fields
			$("#Prospect-Edit #fldName").val(data.ROWS[0].NAME);
			$("#Prospect-Edit #fldEmail").val(data.ROWS[0].EMAIL);
			$("#Prospect-Edit #fldtel1").val(data.ROWS[0].TEL1);
			$("#Prospect-Edit #fldtel2").val(data.ROWS[0].TEL2);
			$("#Prospect-Edit input[name=fldIsPortuguese][value=" + data.ROWS[0].ISPORTUGUESE + "]").prop("checked", true);
			$("#Prospect-Edit #fldScholarship").val(data.ROWS[0].SCHOLARSHIP);
			$("#Prospect-Edit #fldGraduation").val(data.ROWS[0].GRADUATION);
			$("#Prospect-Edit #fldGradLocation").val(data.ROWS[0].GRADLOCATION);
			$("#Prospect-Edit #fldCourse").val(data.ROWS[0].GRADCOURSE);
			$("#Prospect-Edit input[name=fldENEM][value=" + data.ROWS[0].ENEM + "]").prop("checked", true);
			$("#Prospect-Edit #fldComment1").val(data.ROWS[0].COMMENT1);
			$("#Prospect-Edit #fldProfession").val(data.ROWS[0].PROFESSION);
			$("#Prospect-Edit #fldLinkedin").val(data.ROWS[0].LINKEDINURL);
			$("#Prospect-Edit #fldMarketSeg").val(data.ROWS[0].INVSEGMENT);
			$("#Prospect-Edit input[name=fldPrevVisit][value=" + data.ROWS[0].PREVISIT + "]").prop("checked", true);
			$("#Prospect-Edit #fldLocationToInv").val(data.ROWS[0].INVTLOCATION);
			$("#Prospect-Edit #fldInvest").val(data.ROWS[0].INVBUDGET);
			$("#Prospect-Edit #fldRetdStatus").val(data.ROWS[0].RETDSTATUS);
			$("#Prospect-Edit #fldRetWage").val(data.ROWS[0].RETWAGE);
			$("#Prospect-Edit #fldLocationToRet").val(data.ROWS[0].RETDLOCATION);
			$("#Prospect-Edit #fldRetAlone").val(data.ROWS[0].RETDALONE);
			$("#Prospect-Edit input[name=fldIsSponsor][value=" + data.ROWS[0].RETMINORSPON + "]").prop("checked", true);
			$("#Prospect-Edit #fldComment2").val(data.ROWS[0].COMMENT2);
			$("#Prospect-Edit #fldComment3").val(data.ROWS[0].COMMENT3);
			$("#Prospect-Edit #fldComment4").val(data.ROWS[0].COMMENT4);
			$("#Prospect-Edit #fldComment5").val(data.ROWS[0].COMMENT5);

			// Checkbox group
			var bitValue = data.ROWS[0].BONDS;
			var totalItems = ($("input[name=fldBonds]").length * bitValue.length - 7); 
			for (i = 1; i < totalItems; i*=2){
				if (global.BitWiseTest(bitValue, i) > 0){
					$("#Prospect-Edit input[name=fldBonds][value=" + i + "]").prop("checked", true);
				}
			}			
		
			// Show & Hide
			$("#Prospect-View").hide();				
			$("#Prospect-Edit-DataView").show();
			$("Prospect-Edit-Commands").show();
			$("#Prospect-Edit").show();
			global.ShowWaitCursor(false);
		}

	}
})();


/*
* ------------------------------------------------------------------------------------------------------------------
* Event handlers
* ------------------------------------------------------------------------------------------------------------------
*/

$(document).ready(function(){
	
	prospect.Init();

	$("#Prospect-cmdClose").on("click", function(e){
		global.goToPage("es_prospect.php");
		e.preventDefault();		
	});
	
	$("#Prospect-cmdPromote").on("click", function(e){
		$("#Prospect-Promote").modal("show");		
		$("#Prospect-Promote-Confirmation").data("id", prospect.GetID());
		e.preventDefault();
	});

	$("#Prospect-Promote-Confirmation").on("click", function(e){
		prospect.Promote($(this).data("id"));	
	});
});