// author: maurice soulliere
// application: assignment 3
var rootNode;
var companyNode;
var termNode;

$(document).on("pagebeforeshow","#projectMain",function() {
	// console.log("beforepageshow");
	$.ajax
	
	$.getJSON("mydata.json",function(data) {
		
		rootNode = data.members;

		menuLine = "";
		for(x=0;x<rootNode.length;x++) {
			// console.log(rootNode[x].pic);
			menuLine += "<li li-id='" + x + "'>" +
				"<a href='#aboutPopup' class='ui-btn' data-rel='dialog' data-transition='pop' data-position-to='window'>" +
				"<img src='_images/"+rootNode[x].pic+"?a=1229' height='30' />&nbsp;&nbsp;" +
				rootNode[x].name + "</a></li>";
		}
		$("#navhome").html( "<ul id='listhome'>" + menuLine + "</ul>" );
		
		$("#navhome").navbar("destroy");
		$("#navhome").navbar();
		
	});
	
	prepMainPage();
});

function prepMainPage() {
	$.getJSON("pharmacy.json",function(data) {
		companyNode = data.Pharmaceutical;

		$("#companySection").html(
			"<h1>Company</h1>" +
			"<button id='btnCompanyInfo' class='ui-btn'>" +
			"<img src='_images/" + companyNode.logo + "' width=30 /> " +
			companyNode.name + "</button>"
		);
	});
	
	$.ajax({
		type:"POST",
		url:"XML07-generalhealthdefinitions.xml",
		dataType:"xml",
		success: function(xml) {
			termsLength = $(xml).find("term-group").length;
			$("#btnListTerms").html("List " + termsLength + " Terms");
		},
		error: function(e) {
			console.log(e.status + " - " + e.statusText);
		}
	})
	
}

// get the rowID when the user clicks on a user in footer nav
$(document).on("click","#listhome > li", function() {
	rowID = $(this).closest("li").attr("li-id");
	populatePopup(rowID);
});

// get the rowID when the user clicks on a user in footer nav
$(document).on("click","#btnCompanyInfo", function() {
	window.location.href = "company.html";
});

$(document).on("click","#btnListTerms", function() {
	window.location.href = "terminology.html";
});

function populatePopup(rowID) {
	// console.log("Populating popup...");
	$("#imageSection").html( 
		"<img src='_images/" + rootNode[rowID].pic + "' width='80%'/>"
	);
	$("#tablePopup").find("tr:nth-child(1)").find("td").html( rootNode[rowID].name );
	$("#tablePopup").find("tr:nth-child(2)").find("td").html( rootNode[rowID].login );
	$("#tablePopup").find("tr:nth-child(3)").find("td").html( rootNode[rowID].number );
}
