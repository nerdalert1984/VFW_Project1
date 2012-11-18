// Matt Ballert
// VFW 1211
// JS for Project Week 4

window.addEventListener("DOMContentLoaded", function () {


	function $(x) {
	var theElement = document.getElementById(x);
	return theElement;
	}

//	Select Field
	function howHear (){
		var formTag = document.getElementById("howhear"),
		selectListItem = $("select"),
		makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "How Did You Hear About Us?");
	for(var i=0, j=howHeard.length; i<j; i++){
		var makeOption = document.createElement("option");
		var optText = howHeard[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectListItem.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radio = document.forms[0].isfirst;
		for(var i = 0; i<radios.length; i++){
			if(radio[i].checked){
			firstValue = radio[i].value;
			}
		}
	}
	function getCheckboxValue(){
		if($('table').checked){
			platValue = $('table').value
		}else{
			platValue = $('video').value
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
	
	function storeData(key){
		if(!key){
		var id					= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		getCheckboxValue();
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
			alert("There is no data in Local Storage so default data was added.")
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.howHeard[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li')
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	function getImage(hearImg, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ hearImg +".jpeg");
		imageLi.appendChild(newImg);
	}
	
	function autoFillData(){
		for(var n in json){
			var id 				= Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Information";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br')
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Information";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$('yourname').value = item.yourname[1];
		$('email').value = item.email[1]
		$('comname').value = item.comname[1]
		$('comsite').value = item.comsite[1]
		$('gname').value = item.gname[1]
		$('clink').value = item.clink[1]
		$('estdate').value = item.estdate[1]
		$('howhear').value = item.howhear[1]
		var radios = document.forms[0].firstgame;
			for (var i=0; i<radios.length; i++){
				if(radios[i].value == "Yes" && item.firstgame[1] == "Yes"){
				}else if(radios[i].value == "No" && item.firstgame[1] == "No"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.platform[1] == "table"){
			$('platform').setAttribute("checked", "checked");
		}
		
		submitLink.removeEventListener("click", validate);
		$('submit').value = "Edit Information";
		var editSubmit = $('submit')
		editSubmit.addEventListener("click", validate);		
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information deleted.");
			window.location.reload();
		}else{
			alert("Information was NOT deleted.")
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
	
	function validate(e){
		var getYourname = $('yourname');
		var getEmail = $('email');
		var getComname = $('comname');
		var getComsite = $('comsite');
		var getGname = $('gname');
		
		errMsg.innerHTML = "";
		getYourname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getComname.style.border = "1px solid black";
		getComsite.style.border = "1px solid black";
		getGname.style.border = "1px solid black";
		
		var messageAry = [];
		
		if(getYourname.value === ""){
			var nameError = "Please fill in your name.";
			getYourname.style.border = "1px solid orange";
			messageAry.push(nameError);
		}
		
		
		var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(emailRe.exec(getEmail.value))){
			var emailError = "Please fill in your e-mail address.";
			getEmail.style.border = "1px solid orange";
			messageAry.push(emailError);
		}
		
		if(getComname.value === ""){
			var comnameError = "Please fill in the name of your company.";
			getComname.style.border = "1px solid orange";
			messageAry.push(comnameError);
		}
		
		if(getComsite.value === ""){
			var siteError = "Please fill in web address of your company's website.";
			getComsite.style.border = "1px solid orange";
			messageAry.push(siteError);
		}
		
		if(getGname.value === ""){
			var gNameError = "Please fill in the name of your game.";
			getGname.style.border = "1px solid orange";
			messageAry.push(gNameError);
		}
		
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
		storeData(this.key);
		}
	}
		
	// Variable Defaults
	// var howHeard = ["--How Did You Hear About Us?--", "Facebook", "Twitter", "Google+", "Other" ];
//	howHear();
	
	var firstValue
	var	platValue
	var errMsg = $('errors');
	//Set Links & Submit
	var submitLink = $("submit")
	submitLink.addEventListener("click", validate);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var displayLink = $("display")
	displayLink.addEventListener("click", getData)});
	