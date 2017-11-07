

var pressed = function(key){
	return game.dpad.keys[key].state == game.dpad.stateKeyPressed
}

var down = function(key){
	return game.dpad.keys[key].state == game.dpad.stateKeyDown
}


game.dpad = {};

game.dpad.stateIdle 		= 0;
game.dpad.stateKeyDown 		= 1;
game.dpad.stateKeyPressed	= 2;
game.dpad.stateKeyUp 		= 3;

game.dpad.keys = {
	
	action:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 13,
	},
	up:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 87
	},
	down:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 83
	},
	left:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 65
	},
	right:{
		state: 0,
		next: 0,
		dirty: false,
		bindingCode: 68
	}
	
}

game.dpad.update = function () {
	
	for(var aKeyTag in game.dpad.keys){
		
		var aKey =  game.dpad.keys[aKeyTag];
		
		if(aKey.state == game.dpad.stateKeyUp && !aKey.next){
			aKey.state = game.dpad.stateIdle;
		}else if(aKey.state == game.dpad.stateKeyDown && !aKey.next){
			aKey.state = game.dpad.stateKeyPressed;
		}else{
			if(aKey.next){
				aKey.state = aKey.next;
			}
		}
		
		aKey.next 	= null;
		aKey.dirty = false;
		
	}

}

game.dpad.setup = function(){
	document.onkeydown 	= game.dpad.keyDown;
	document.onkeyup 	= game.dpad.keyUp;
}

game.dpad.keyDown = function () {
	game.dpad.processKeyEvent("down");
}

game.dpad.keyUp = function () {
	game.dpad.processKeyEvent("up");
}

game.dpad.processKeyEvent = function (type){
	
	var x = null;
	if(window.event) x = event.keyCode;
	else if(event.which) x = event.which;
	
	for(var aKeyTag in game.dpad.keys){
	
		var aKey =  game.dpad.keys[aKeyTag];
		if(aKey.bindingCode == x){
			if(!aKey.dirty){
				aKey.dirty = true;
				
				if(aKey.state == game.dpad.stateIdle){
					if(type == "down"){
						aKey.next = game.dpad.stateKeyDown;	
					}
				}else if (aKey.state == game.dpad.stateKeyDown) {
					if(type == "down"){
						aKey.next = game.dpad.stateKeyPressed;	
					}else if(type == "up"){
						aKey.next = game.dpad.stateKeyUp;
					}			
				}else if (aKey.state == game.dpad.stateKeyPressed) {
					if(type == "up"){
						aKey.next = game.dpad.stateKeyUp;	
					}			
				}
			}else{
				if(type == "up"){
					aKey.next = game.dpad.stateKeyUp;
				}
			}
		}
	}
	
}
