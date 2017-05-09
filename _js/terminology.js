// author: maurice soulliere
// application: assignment 3
var rootNode;
var companyNode;
var termXml;

$(document).on("pagebeforeshow","#projectTerms",function() {
	// console.log("beforepageshow");
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
	prepTermPage();
});

function prepTermPage() {
	$.ajax({
		type: "POST",
		url: "XML07-generalhealthdefinitions.xml",
		dataType: "xml",
		success: processData
	});
}

function processData(xml) {
	termXml = xml;
	itemNum = 0;
	sectionStart = "";
	theData = "";
	$("#term-block-a").html("");
	$("#term-block-b").html("");
	$("#term-block-c").html("");
	
	$(termXml).find("term-group").each( function() {
		if (itemNum<3) {
			$("#term-block-a").append(
				"<a tp-id='"+itemNum+"' href='#termPopup' class='ui-btn' data-rel='dialog' data-transition='pop' data-position-to='window' data-mini='true'>" +
				"<img src='_images/" + $(this).find("icon").text() + "' height='30' />&nbsp;&nbsp;" +
				$(this).find("term").text() + "</a>"
			)
		} else if (itemNum<6) {
			$("#term-block-b").append(
				"<a tp-id='"+itemNum+"' href='#termPopup' class='ui-btn' data-rel='dialog' data-transition='pop' data-position-to='window'>" +
				"<img src='_images/"+$(this).find("icon").text()+"' height='30' />&nbsp;&nbsp;" +
				$(this).find("term").text() + "</a>"
			)
		} else {
			$("#term-block-c").append(
				"<a tp-id='"+itemNum+"' href='#termPopup' class='ui-btn' data-rel='dialog' data-transition='pop' data-position-to='window'>" +
				"<img src='_images/"+$(this).find("icon").text()+"' height='30' />&nbsp;&nbsp;" +
				$(this).find("term").text() + "</a>"
			)
		}
		itemNum += 1;
	});

}

// get the rowID when the user clicks on a store (or home) in footer nav
$(document).on("click","#listhome > li", function() {
	rowID = $(this).closest("li").attr("li-id");
	populatePopup(rowID);
});

$(document).on("click","#term-block-a > a", function() {
	termID = $(this).closest("a").attr("tp-id");
	populateTermPopup(termID);
});

$(document).on("click","#term-block-b > a", function() {
	termID = $(this).closest("a").attr("tp-id");
	populateTermPopup(termID);
});

$(document).on("click","#term-block-c > a", function() {
	termID = $(this).closest("a").attr("tp-id");
	populateTermPopup(termID);
});

// go to the main index page
$(document).on("click","#btnGoHome", function() {
	window.location.href = "index.html";
});
$(document).on("click","#btnGoCompany", function() {
	window.location.href = "company.html";
});

/*
<generalHealth last-updated="2016-10-03" page-url="https://medlineplus.gov/definitions/generalhealthdefinitions.html" title="General Health">
	<term-group reference="NIH MedlinePlus" reference-url="https://medlineplus.gov/">
		<term>Basal Body Tempature</term>
		<definition>Basal body temperature is your temperature at rest when you wake up in the morning. This temperature rises slightly around the time of ovulation. Keeping track of this temperature and other changes such as cervical mucus may help you figure out when you are ovulating. Take your temperature before you get out of bed every morning. Since the change during ovulation is only about 1/2 degree F (1/3 degree C), you should use a sensitive thermometer such as a basal body thermometer.</definition>
		<icon>Programming-Java-Coffee-Cup-Logo-icon-32.png</icon>
*/
function populateTermPopup(termID) {
	
	$("#termData").html(
		"<h1>Term: "+$(termXml).find("term-group:nth("+termID+")").find("term").text()+"</h1>" +
		"<div style='width:100%'>"+$(termXml).find("term-group:nth("+termID+")").find("definition").text()+"</div>"
	);

}

function populatePopup(rowID) {
	// console.log("Populating popup...");
	$("#imageSection").html( 
		"<img src='_images/" + rootNode[rowID].pic + "' width='80%'/>"
	);
	$("#tablePopup").find("tr:nth-child(1)").find("td").html( rootNode[rowID].name );
	$("#tablePopup").find("tr:nth-child(2)").find("td").html( rootNode[rowID].login );
	$("#tablePopup").find("tr:nth-child(3)").find("td").html( rootNode[rowID].number );
}
