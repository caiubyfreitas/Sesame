/*
* ****************************************************************************************************************************
*
* CLIENT VIEW IMPLEMENTATION
* april-2018
* By Caiuby Freitas
*
* Defines what happens when user clicks on clients menu options and implements presentation features.
* This is the VIEW counterpart of the MVC-based abstraction implemented herein.
*
* ****************************************************************************************************************************
*/

var client = (function(){		
	
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
			if (pageName[1] === "es_client"){ 
				client.GetAll();
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
				"Client", 
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
				"Client", 
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
				"Client", 
				{ 
					"id" : data 
				},
				global.goToPage("es_client.php"),
				function(data){
					console.log(data)
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
						
			$("#Client-Edit").hide();				
			$("#lnkClients").parent().addClass("active");
			$("#Client-View-Records").hide();
			$("#Client-View-DataTable").hide();
			$("#Client-View-Pagination").hide();
			$("#Client-View-DataTable tbody tr").remove();	

			// Binds ON DELETE event to the handler
			$("#Client-Delete-Confirmation").on("click", function(e){
				$("#Client-Delete").modal("hide");
				client.Delete($(this).data("id"), $(this).data("eventSource"));
			});					

			// If empty
			if (data.RECORDS === 0){
				$("#Client-View-Message").html(data.MESSAGE);
				$("#Client-View-Message").show();
			}
			else {
				$("#Client-View-Message").hide();
				
				var str = "";
				var table = $("#Client-View-DataTable tbody");
				global.ShowWaitCursor(true);				
				$.each(data.ROWS, function(idx, record){
									
					// Create HTML output for each record retrieved
					str  = "<tr><td style=\"width:5%\">" + (++idx) + "</td>";
					str += "<td>" + record.NAME + "</td>";
					str += "<td>" + record.EMAIL + "</td>";
					str += "<td style=\"width:10%\">" + record.LAST_UPDATE + "</td>";
					str += "<td class=\"text-center\" style=\"width:10%\">";
					str += "<a href=\"#\" class=\"btn btn-info btn-sm\" id=\"lnkEdit" + (idx) + "\" data-id=\"" + (record.ID) + "\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Ver</a>&nbsp;"
					str += "<a href=\"#\" class=\"btn btn-danger btn-sm\" id=\"lnkRemove" + (idx) + "\" data-id=\"" + (record.ID) + "\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>";
					str += "</td></tr>";
					table.append(str);	

					// Binds ON_EDIT event handler dynamically
					$("#lnkEdit"+idx).on("click", function(e){
						client.SetID($(this).data("id"));
						client.GetRecord({"id" : $(this).data("id")});
						e.preventDefault();
					});						

					// Binds ON_REMOVE event handler dynamically
					$("#lnkRemove"+idx).on("click", function(e){
						$("#Client-Delete-Confirmation").data("id", $(this).data("id"));
						$("#Client-Delete-Confirmation").data("eventSource", idx);
						$("#Client-Delete").modal("show");
						e.preventDefault();
					});
				});
				
				// Creates pagination if needed
				if (data.RECORDS > 0){

					var maxPerPage = 10;
					var totalRecords = data.RECORDS;
					var currentPage = data.CURRPAGE;

					$("#Client-View-Pagination li").remove();
					var str = "";
					var pages = Math.ceil(totalRecords / maxPerPage);
					for (i=1; i<=pages; i++){
						str = "<li class=\"page-item" + ((i == currentPage)? " active" : "") + "\"><a id=\"lnkPage" + (i) + "\" class=\"page-link\" href=\"#\">" + (i) + "</a></li>"; 
						$("#Client-View-Pagination ul").append(str);

						// Binds ON CLICK event to the handler dynamically, so that the page number can be passed on to the controller
						$("#lnkPage"+i).on("click", function(e){
							client.GetAll($(e.target).text());
							e.preventDefault();
						});
					}
					(pages > 1) ? $("#Client-View-Pagination").show() : $("#Client-View-Pagination").hide();


					$("#Client-View-Records").html(data.RECORDS);
					$("#Client-View-Records").show();
				}
				$("#Client-View-DataTable").show();
			}
			$("#Client-View").show();	
			global.ShowWaitCursor(false);
		},
		
		// Shows record view page
		ShowRecordView: function(data){
			global.ShowWaitCursor(true);
			
			$("#tab2").hide();
			$("#tab3").hide();
			$("#tab4").hide();
			$("#tab5").hide();
			$("#tab6").hide();
			$("#tab7").hide();
			$("#tab8").hide();

			// Fill up regular fields
			$("#Client-Edit #fldName").val(data.ROWS[0].NAME);
			$("#Client-Edit #fldEmail").val(data.ROWS[0].EMAIL);
			$("#Client-Edit #fldtel1").val(data.ROWS[0].TEL1);
			$("#Client-Edit #fldtel2").val(data.ROWS[0].TEL2);
			$("#Client-Edit input[name=fldIsPortuguese][value=" + data.ROWS[0].ISPORTUGUESE + "]").prop("checked", true);
			$("#Client-Edit #fldScholarship").val(data.ROWS[0].SCHOLARSHIP);
			$("#Client-Edit #fldGraduation").val(data.ROWS[0].GRADUATION);
			$("#Client-Edit #fldGradLocation").val(data.ROWS[0].GRADLOCATION);
			$("#Client-Edit #fldCourse").val(data.ROWS[0].GRADCOURSE);
			$("#Client-Edit input[name=fldENEM][value=" + data.ROWS[0].ENEM + "]").prop("checked", true);
			$("#Client-Edit #fldComment1").val(data.ROWS[0].COMMENT1);
			$("#Client-Edit #fldProfession").val(data.ROWS[0].PROFESSION);
			$("#Client-Edit #fldLinkedin").val(data.ROWS[0].LINKEDINURL);
			$("#Client-Edit #fldMarketSeg").val(data.ROWS[0].INVSEGMENT);
			$("#Client-Edit input[name=fldPrevVisit][value=" + data.ROWS[0].PREVISIT + "]").prop("checked", true);
			$("#Client-Edit #fldLocationToInv").val(data.ROWS[0].INVTLOCATION);
			$("#Client-Edit #fldInvest").val(data.ROWS[0].INVBUDGET);
			$("#Client-Edit #fldRetdStatus").val(data.ROWS[0].RETDSTATUS);
			$("#Client-Edit #fldRetWage").val(data.ROWS[0].RETWAGE);
			$("#Client-Edit #fldLocationToRet").val(data.ROWS[0].RETDLOCATION);
			$("#Client-Edit #fldRetAlone").val(data.ROWS[0].RETDALONE);
			$("#Client-Edit input[name=fldIsSponsor][value=" + data.ROWS[0].RETMINORSPON + "]").prop("checked", true);
			$("#Client-Edit #fldComment2").val(data.ROWS[0].COMMENT2);
			$("#Client-Edit #fldComment3").val(data.ROWS[0].COMMENT3);
			$("#Client-Edit #fldComment4").val(data.ROWS[0].COMMENT4);
			$("#Client-Edit #fldComment5").val(data.ROWS[0].COMMENT5);
			$("#Client-Edit #fldParentName1").val(data.ROWS[0].P1NAME);
			$("#Client-Edit #fldParentName2").val(data.ROWS[0].P2NAME);
			$("#Client-Edit #fldParentName3").val(data.ROWS[0].P3NAME);
			$("#Client-Edit #fldParentName4").val(data.ROWS[0].P4NAME);
			$("#Client-Edit #fldParentName5").val(data.ROWS[0].P5NAME);
			$("#Client-Edit #fldDoB1").val(data.ROWS[0].P1DOB);
			$("#Client-Edit #fldDoB2").val(data.ROWS[0].P2DOB);
			$("#Client-Edit #fldDoB3").val(data.ROWS[0].P3DOB);
			$("#Client-Edit #fldDoB4").val(data.ROWS[0].P4DOB);
			$("#Client-Edit #fldDoB5").val(data.ROWS[0].P5DOB);
			$("#Client-Edit input[name=fldDec1][value=" + data.ROWS[0].P1DEC + "]").prop("checked", true);
			$("#Client-Edit input[name=fldDec2][value=" + data.ROWS[0].P2DEC + "]").prop("checked", true);
			$("#Client-Edit input[name=fldDec3][value=" + data.ROWS[0].P3DEC + "]").prop("checked", true);
			$("#Client-Edit input[name=fldDec4][value=" + data.ROWS[0].P4DEC + "]").prop("checked", true);
			$("#Client-Edit input[name=fldDec5][value=" + data.ROWS[0].P5DEC + "]").prop("checked", true);

			// Checkbox group
			var bitValue = data.ROWS[0].BONDS;
			var totalItems = ($("input[name=fldBonds]").length * bitValue.length - 7); 
			for (i = 1; i < totalItems; i*=2){
				if (global.BitWiseTest(bitValue, i) > 0){
					$("#Client-Edit input[name=fldBonds][value=" + i + "]").prop("checked", true);
				}
			}			
			
			switch(parseInt(data.ROWS[0].GOAL)){
			case 1:
				$("#tab2").show();
				break;
			case 2:
				$("#tab3").show();
				break;
			case 3:
				$("#tab4").show();
				break;
			case 4:
				$("#tab5").show();
				break;
			case 5:
				$("#tab6").show();
				break;
			case 6:
				$("#tab7").show();
				break;
			default:
				$("#tab8").show();
				break;
			}	
	
			// Show & Hide
			$("#Client-View").hide();				
			$("#Client-Edit-DataView").show();
			$("#Client-Edit-Commands").show();
			$("#Client-Edit").show();
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
	
	client.Init();

	$("#Client-cmdClose").on("click", function(e){
		global.goToPage("es_client.php");
		e.preventDefault();		
	});
	
});