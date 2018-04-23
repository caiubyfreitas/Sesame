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
				global.goToPage("es_prospect.php"),

/*
				function(data){
					prospect.ShowGridView($("#Prospect-View-Pagination li.active a").text());
				},
				
*/
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
					
					switch(parseInt(record.GOAL)){
					case 1:
						goal = "Profissional";
						break;
					case 2:
						goal = "Estudante";
						break;
					case 3:
						goal = "Empreendedor";
						break;
					case 4:
						goal = "Aposentado";
						break;
					case 5:
						goal = "Rendimentos Próprios";
						break;
					case 6:
						goal = "Pessoa Notória";
						break;
					default:
						goal = "Parente Português";
					}
					
					// Create HTML output for each record retrieved
					str  = "<tr><td style=\"width:5%\">" + (++idx) + "</td>";
					str += "<td style=\"width:10%\">" + goal + "</td>";
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
			
			$("#tab2").hide();
			$("#tab3").hide();
			$("#tab4").hide();
			$("#tab5").hide();
			$("#tab6").hide();
			$("#tab7").hide();
			$("#tab8").hide();

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
			$("#Prospect-Edit #fldParentName1").val(data.ROWS[0].P1NAME);
			$("#Prospect-Edit #fldParentName2").val(data.ROWS[0].P2NAME);
			$("#Prospect-Edit #fldParentName3").val(data.ROWS[0].P3NAME);
			$("#Prospect-Edit #fldParentName4").val(data.ROWS[0].P4NAME);
			$("#Prospect-Edit #fldParentName5").val(data.ROWS[0].P5NAME);
			$("#Prospect-Edit #fldDoB1").val(data.ROWS[0].P1DOB);
			$("#Prospect-Edit #fldDoB2").val(data.ROWS[0].P2DOB);
			$("#Prospect-Edit #fldDoB3").val(data.ROWS[0].P3DOB);
			$("#Prospect-Edit #fldDoB4").val(data.ROWS[0].P4DOB);
			$("#Prospect-Edit #fldDoB5").val(data.ROWS[0].P5DOB);
			$("#Prospect-Edit input[name=fldDec1][value=" + data.ROWS[0].P1DEC + "]").prop("checked", true);
			$("#Prospect-Edit input[name=fldDec2][value=" + data.ROWS[0].P2DEC + "]").prop("checked", true);
			$("#Prospect-Edit input[name=fldDec3][value=" + data.ROWS[0].P3DEC + "]").prop("checked", true);
			$("#Prospect-Edit input[name=fldDec4][value=" + data.ROWS[0].P4DEC + "]").prop("checked", true);
			$("#Prospect-Edit input[name=fldDec5][value=" + data.ROWS[0].P5DEC + "]").prop("checked", true);
			
			// Checkbox group
			var bitValue = data.ROWS[0].BONDS;
			var totalItems = ($("input[name=fldBonds]").length * bitValue.length - 7); 
			for (i = 1; i < totalItems; i*=2){
				if (global.BitWiseTest(bitValue, i) > 0){
					$("#Prospect-Edit input[name=fldBonds][value=" + i + "]").prop("checked", true);
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
			$("#Prospect-View").hide();				
			$("#Prospect-Edit-DataView").show();		
			$("#Prospect-Edit-Commands").show();
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