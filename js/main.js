// Matt Ballert
// VFW 1211
// CSS for Project Week 2

window.addEventListener("DOMContentLoaded", function () {


	function $(x) {
	var theElement = document.getElementById(x);
	return theElement;
	}

//	Select Field
//	function howHear (){
//		var formTag = document.getElementById("howhear"),
//		selectListItem = $("select"),
//		makeSelect = document.createElement("select");
//		makeSelect.setAttribute("id", "How Did You Hear About Us?");
//	for(var i=0, j=howHeard.length; i<j; i++){
//		var makeOption = document.createElement("option");
//		var optText = howHeard[i];
//		makeOption.setAttribute("value", optText);
//		makeOption.innerHTML = optText;
//		makeSelect.appendChild(makeOption);
//	}
//	selectListItem.appendChild(makeSelect);
//	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].isfirst;
		for(var i = 0; i<radio.length; i++){
			if(radios[i].checked){
			firstValue = radios[i].value;
			}
		}
	}
	function getCheckboxValue(){
		if($('table').checked){
			platValue = $('table')
		}else{
			platValue = $('video')
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('gameform').style.display = "none";
				$('clear').style.display = "inline";
				$('display').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('gameform').style.display = "block";
				$('clear').style.display = "inline";
				$('display').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id					= Math.floor(Math.random()*100000001);
		var item				= {};
			item.yourname		= ["Your Name", $('yourname').value];
			item.email			= ["Email Adress", $('email').value];
			item.comname		= ["Company Name", $('comname').value];
			item.comsite		= ["Company Website", $('comsite').value];
			item.gname			= ["Game Name", $('gname').value];
			item.clink			= ["Crowdfunding Link", $('clink').value];
			item.estdate		= ["Estimated Release Date", $('estdate').value];
			item.howhear		= ["How Did You Hear About Us", $('howhear').value];
			item.firstgame		= ["First Game", firstValue];
			item.platform		= ["Platform", platValue];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Game Submitted!");
	}
	
	function getData(){
		toggleControls("on")
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.")
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li')
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All data cleared!");
			window.location.reload();
			return false;
		}
	}
	// Variable Defaults
	// var howHeard = ["--How Did You Hear About Us?--", "Facebook", "Twitter", "Google+", "Other" ];
//	howHear();

	var firstValue
	var	platValue
	//Set Links & Submit
	var submitLink = $("submit")
	submitLink.addEventListener("click", storeData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var displayLink = $("display")
	displayLink.addEventListener("click", getData)});