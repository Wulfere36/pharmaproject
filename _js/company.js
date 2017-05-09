// author: maurice soulliere
// application: assignment 3
var rootNode;
var companyNode;
var termNode;
var locationList = new Array();

$(document).on("pagebeforeshow","#projectCompany",function() {
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
	
	prepCompanyPage();
});

function prepCompanyPage() {
	$.getJSON("pharmacy.json",function(data) {
		
		companyNode = data.Pharmaceutical;
		
		$("#companyInfo").html(
			"<a href='" + companyNode.url + "'>" +
				"<img src='_images/" + companyNode.logo + "' width=30 /> " + companyNode.name + "</a><br/>" +
			"<span>" + companyNode.about + "</span><br />" +
			"<span>" + companyNode.phone + "</span><br /><br />" +
			"<a href='#geo' data-transition='slidefade' class='ui-btn ui-corner-all ui-icon-custommap ui-btn-icon-left' style='padding:4px 10px; margin:2px;'>Google Map</a>"
		);
		
		productNode = companyNode.products;
		$("#drugItems").html("");
		for(x=0;x<productNode.length;x++) {
			$("#drugItems").append(
				"<div data-role='collapsible' data-mini='true'>" +
					"<h3>" +
							productNode[x].brandname + " (" + productNode[x].drugname + ")" +
					"</h3>" +
					"<div style='font-size:.8em'>" +
						"<span>" + productNode[x].drugdesc + "</span><br />" +
						"<span>" + productNode[x].mode + "</span><br />" +
						"<span>" + productNode[x].contra1 + "</span><br />" +
						"<span>" + productNode[x].contra2 + "</span>" +
					"</div>" +
				"</div>"
			)
		}
		$("#drugItems").collapsibleset("refresh");
		
	});
	
	
}

// get the rowID when the user clicks on a store (or home) in footer nav
$(document).on("click","#listhome > li", function() {
	rowID = $(this).closest("li").attr("li-id");
	populatePopup(rowID);
});

// go to the main index page
$(document).on("click","#btnGoHome", function() {
	window.location.href = "index.html";
});

$(document).on("click","#btnGoTerminology", function() {
	window.location.href = "terminology.html";
});

function populatePopup(rowID) {
	console.log("Populating popup...");
	/*
	$("#imageSection").html( 
		"<img src='_images/" + rootNode[rowID].pic + "' width='80%'/>"
	);
	$("#tablePopup").find("tr:nth-child(1)").find("td").html( rootNode[rowID].name );
	$("#tablePopup").find("tr:nth-child(2)").find("td").html( rootNode[rowID].login );
	$("#tablePopup").find("tr:nth-child(3)").find("td").html( rootNode[rowID].number );
	*/
}

// check when map page is opened and populate the map
// actually, really just copy and pasted the original from the example, changing
// only those values that were necessary
$(document).on("pageshow", "#geo", function() {
	
	$("#map_canvas").html("");
	
		
	//tempObj = data.query.results.item;
	//tempObj = data.item;

	pos = 0;

	function Cmp(title, lat, lng) {
		this.title=title;
		this.lat=lat;
		this.lng=lng;
	}		

	locationList.push(new  Cmp(
		companyNode.name + "<br>" + companyNode.phone,
		companyNode.lat,
		companyNode.long
	));
	
	theLine = "";
	for(x=0;x<rootNode.length;x++) {
		theLine+=rootNode[x].name + "<br>"
	}
	locationList.push(new  Cmp(
		theLine,
		43.656233,
		-79.739397
	));
	
	latCM = locationList[0].lat;
	lngCM = locationList[0].lng;
	mapCM = new google.maps.LatLng(latCM, lngCM);
			
	latSH = locationList[1].lat;
	lngSH = locationList[1].lng;
	mapSH = new google.maps.LatLng(latSH, lngSH);			

	var mapOptions = {
		center: mapCM,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var myLoc1 = new google.maps.Marker ({
		map : map,
		icon : "_images/pushpin.gif",					// optional
		animation : google.maps.Animation.DROP,	// options DROP BOUNCE
		position: mapCM
	});	
	var myLoc2 = new google.maps.Marker ({
		map : map,
		icon : "_images/pushpin.gif",					// optional
		animation : google.maps.Animation.DROP,	// options DROP BOUNCE
		position: mapSH
	});	

	info1 = new google.maps.InfoWindow({
		content: "Location Info:<br><br>" + locationList[0].title
	});
	info2 = new google.maps.InfoWindow({
		content: "Location Info:<br><br>" + locationList[1].title
	});
	google.maps.event.addListener(myLoc1, "click", function() {
		info1.open(map, myLoc1);  
	});
	google.maps.event.addListener(myLoc2, "click", function() {
		info2.open(map, myLoc2);  
	});
		
});

