var energy;
var captcha;
var fish = 0;
var logs = 0;
var phase = "inventory";
var captchaStatus = "none";

var confirmation = confirm("Start?");
if (confirmation) {
	isActive = true;
	start();
}

function createIframe(object, src, manager) {
	var iframe = document.createElement("iframe");
	var frameid = document.createAttribute("id");
	var framesrc = document.createAttribute("src");
	var framewidth = document.createAttribute("width");
	var frameheight = document.createAttribute("height");
	var frameborder = document.createAttribute("frameborder");
	var childlength = document.body.childNodes.length;
	var lastelement = document.body.childNodes[childlength-1];

	frameid.nodeValue = object;
	framesrc.nodeValue = src;
	framewidth.nodeValue = 1000;
	frameheight.nodeValue = 1000;
	frameborder.nodeValue = 0;
	
	iframe.setAttributeNode(frameid);
	iframe.setAttributeNode(framesrc);
	iframe.setAttributeNode(framewidth);
	iframe.setAttributeNode(frameheight);
	iframe.setAttributeNode(frameborder);
	if(manager) {
		iframe.addEventListener("load", manager, true);
	}
	lastelement.parentNode.insertBefore(iframe, lastelement.nextSibling);
} 

function start() {
	createIframe("bot", "http://ageofrebellion.com/index.php?mod=Inventory", function() {mainPhase();});
}

function mainPhase() {
	var iFrame = document.getElementById("bot");
	var gameBod = iFrame.contentDocument.getElementById("gamebody");
	var energyBar = iFrame.contentDocument.getElementById("img2");
	energy = /(\d+)\s*\//.exec(energyBar.alt)[1];
	if(captchaStatus == "none") {		
		if (captchaCheck()) {
			captchaStatus = "unsolved";
			captcha = 20;
			iFrame.src = "http://ageofrebellion.com/index.php?mod=BotCheck";
		}
		else { 
		whatToDo();
		}
	}
	else if (captchaStatus == "unsolved") {
		if (/Captcha solved. Thank you!/.test(gameBod.innerHTML)) {
			captcha = 0;
			captchaStatus = "solved";
			whatToDo();
		}
		else {
			if (iFrame.contentDocument.getElementById("adcopy-puzzle-image-image")) {
				alert("BotCheck!");
			}
			else {
				return;
			}	
		}
	}
	
	else if (captchaStatus == "solved") {
		whatToDo();
	}
	else {
		alert("What dun goofed? =P");
	}
}

function captchaCheck() {
	var iFrame = document.getElementById("bot");
	if (iFrame.contentDocument.getElementById("gamebody")) {
		var gameBod = iFrame.contentDocument.getElementById("gamebody");
		if(/you need to complete a/.test(gameBod.innerHTML)) {
			return true;
		}
		else {
			return false;
		}
	}
	else{
		return false;
	}
}

function whatToDo() {
	var iFrame = document.getElementById("bot");
	var gameBod = iFrame.contentDocument.getElementById("gamebody");
	var listOfTd = [];
	
	if(captchaStatus == "solved") {
		captchaStatus = "none";
		if(phase == 1) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=north"
		}
		else if(phase == 2) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Fishing";
		}
		else if(phase == 3) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=north";
		}
		else if(phase == 4) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Woodcutting";
		}
		else if(phase == 5) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=east";
		}
		else if(phase == 6) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine";
		}
		else if(phase == 7) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=west";
		}
		else if(phase == 8) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Woodcutting";
		}
		else if(phase == 9) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=south";
		}
		else if(phase == 10) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Fishing";
		}
		else if(phase == 11) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=south";
		}
		else if(phase == 12) {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine";
		}
		else {
			alert("Yeah, something messed up");
		}
		return;
	}
	
	else if(phase == "inventory") {
		listOfTd = gameBod.getElementsByTagName("td");
		for(i=0;i<listOfTd.length;i++) {
			if(listOfTd[i].innerHTML) {
				if(listOfTd[i].innerHTML == "Regular Log") {
					var brother = listOfTd[i].nextSibling;
					logs = brother.innerHTML;
					logs -= 0;
				}
				else if(listOfTd[i].innerHTML == "Raw Sardine") {
					var sister = listOfTd[i].nextSibling;
					fish = sister.innerHTML;
					fish -= 0;
				}
			}
		}
	phase = 1;
	iFrame.src = "http://ageofrebellion.com/index.php?mod=Explore&travel=north";
	return;
	}
	
	else if(phase == 1) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=north","http://ageofrebellion.com/index.php?mod=Fishing");
	}
	
	else if(phase == 2) {
		catchFish("http://ageofrebellion.com/index.php?mod=Explore&travel=north");
	}
	else if(phase == 3) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=north","http://ageofrebellion.com/index.php?mod=Woodcutting");
	}
	else if(phase == 4) {
		chopWood("http://ageofrebellion.com/index.php?mod=Explore&travel=east");
	}
	
	else if(phase == 5) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=east","http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine");
	}
	else if(phase == 6) {
		cook("http://ageofrebellion.com/index.php?mod=Explore&travel=west");
	}
	else if(phase == 7) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=west","http://ageofrebellion.com/index.php?mod=Woodcutting");
	}
	else if(phase == 8) {
		chopWood("http://ageofrebellion.com/index.php?mod=Explore&travel=south");
	}
	else if(phase == 9) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=south","http://ageofrebellion.com/index.php?mod=Fishing");
	}
	else if(phase == 10) {
		catchFish("http://ageofrebellion.com/index.php?mod=Explore&travel=south&r=1");
	}
	else if(phase == 11) {
		moved("http://ageofrebellion.com/index.php?mod=Explore&travel=south","http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine");
	}
	else if(phase == 12) {
		cook("http://ageofrebellion.com/index.php?mod=Explore&travel=north");
	}
	else {
		alert("Erm, no phase?");
	}
}
	
function chopWood(url) {
		var iFrame = document.getElementById("bot");
		var gameBod = iFrame.contentDocument.getElementById("gamebody");
		var caught = 0; 
		var missed = 0;
		var total;
		if (/enough energy/.test(gameBod.innerHTML)) {
			energy = 0;
		}
		if (gameBod.innerHTML.match(/You successfully chopped down a Normal Log!/g)) {
			caught = gameBod.innerHTML.match(/You successfully chopped down a Normal Log!/g).length;
		}
		if (gameBod.innerHTML.match(/You failed to cut any logs this time/g)) {
			missed = gameBod.innerHTML.match(/You failed to cut any logs this time/g).length;
		}
		total = caught + missed;
		logs += caught;
		captcha += total;
		if(captcha > 20) {captcha = 20;}
		
		if (energy < 1) {
			var timeoutID = window.setTimeout(function() {  
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Woodcutting";  
			}, 60000);
		}
		else {
			if(logs >= 20) {
				phase += 1;
				iFrame.src = url;
				return;
			}
			else if(captcha == 19) {
				if (energy == 20) {
					var listOfInput = gameBod.getElementsByTagName("input");
					for(i=0;i<listOfInput.length;i++) {
						if(listOfInput[i].value) {
							if (listOfInput[i].value == "AUTO-CUT") {
								listOfInput[i].click();
								return;
							}
						}
					}
				}
				else {
					window.setTimeout(function() {  
					iFrame.src = "http://ageofrebellion.com/index.php?mod=Woodcutting";  
					}, 60000 * (20 - energy));
				}
				
			}
			else {
				var listOfInput = gameBod.getElementsByTagName("input");
				for(i=0;i<listOfInput.length;i++) {
					if(listOfInput[i].value) {
						if (listOfInput[i].value == "CLICK TO WOODCUT") {
							listOfInput[i].click();
							return;
						}
					}
				}
			}
		}
	}
	
function catchFish(url) {
		var iFrame = document.getElementById("bot");
		var gameBod = iFrame.contentDocument.getElementById("gamebody");
		var caught = 0; 
		var missed = 0;
		var total;
		if (/You do not have enough energy/.test(gameBod.innerHTML)) {
			energy = 0;
		}
		if (gameBod.innerHTML.match(/You successfully caught a Sardine!/g)) {
			caught = gameBod.innerHTML.match(/You successfully caught a Sardine!/g).length;
		}
		if (gameBod.innerHTML.match(/You failed to catch any fish this time./g)) {
			missed = gameBod.innerHTML.match(/You failed to catch any fish this time./g).length;
		}
		total = caught + missed;
		fish += caught;
		captcha += total;
		if(captcha > 20) {captcha = 20;}
		
		if (energy < 1) {
			var timeoutID = window.setTimeout(function() {  
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Fishing";  
			}, 60000);
		}
		else {
			if(fish >= 20) {
				phase += 1;
				iFrame.src = url;
			}
			else if(captcha == 19) {
				if (energy == 20) {
					var listOfInput = gameBod.getElementsByTagName("input");
					for(i=0;i<listOfInput.length;i++) {
						if(listOfInput[i].value) {
							if (listOfInput[i].value == "AUTO-FISH") {
								listOfInput[i].click();
								return;
							}
						}
					}
				}
				else {
					window.setTimeout(function() {  
					iFrame.src = "http://ageofrebellion.com/index.php?mod=Fishing";  
					}, 60000 * (20 - energy));
				}
				
			}
			else {
				var listOfInput = gameBod.getElementsByTagName("input");
				for(i=0;i<listOfInput.length;i++) {
					if(listOfInput[i].value) {
						if (listOfInput[i].value == "CLICK TO FISH") {
							listOfInput[i].click();
							return;
						}
					}
				}
			}
		}
	}
	function cook(url) {
		var iFrame = document.getElementById("bot");
		var gameBod = iFrame.contentDocument.getElementById("gamebody");
		var bust = new Date();
		var buster = bust.getTime();
		if(/You cooked a Sardine/.test(gameBod.innerHTML)) {
			fish -= 1;
			logs -= 1;
			captcha += 1;
			if (energy < 1) {
				var timeoutID = window.setTimeout(function() {  
				iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine&r=" + buster;
				}, 60000);
			}
				
			else if( (logs > 0) && (fish > 0) ) {
				iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine&r=" + buster;
			}
			else {
				if(phase == 12) {
					phase = 1;
					iFrame.src = url;
				}
				else {
				phase += 1;
				iFrame.src = url;
				return;
				}
			}
		}
		
		else if (/enough energy/.test(gameBod.innerHTML)) {
			energy = 0;
			var timeoutID = window.setTimeout(function() {  
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine&r=" + buster;
			}, 60000);
			
		}
		
		else {
			iFrame.src = "http://ageofrebellion.com/index.php?mod=Cooking&cook=Sardine&r=" + buster;
		}
	}
	function moved(here,next) {
		var iFrame = document.getElementById("bot");
		var gameBod = iFrame.contentDocument.getElementById("gamebody");
		if(/You do not have enough energy to travel at this moment/.test(gameBod.innerHTML)) {
			var bust = new Date();
			var buster = bust.getTime();
			var timeoutID = window.setTimeout(function() {  
			iFrame.src = here + "&r=" + buster;  
			}, 60000);
			return;
		}
		else {
			captcha += 1;
			phase += 1;
			iFrame.src = next;
		}
	}	
