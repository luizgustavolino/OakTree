// Engine.JS

game.engine = {};

game.engine.paused 			= false;
game.engine.frameCount 		= 0;
game.engine.timer 			= null;
game.engine.fps 			= 60.0;
game.engine.perFrameDelay 	= 1000.0 / game.engine.fps;

game.engine.mute			= false;
game.engine.scene           = null;

game.engine.bootstrap = function(){
	
	game.resources.harvest();
	requestAnimationFrame(game.engine.loop);
	game.engine.showScene(game.scenes.title);
	game.dpad.setup();
	
}

game.engine.showScene = function(_scene){
    
    if(game.engine.scene && game.engine.scene.onExit){
        game.engine.scene.onExit();
    }

    game.engine.scene = _scene;
    var tag = document.getElementById("viewport")
    tag.style.backgroundColor = _scene.clearColor

    if(game.engine.scene.onEnter){
        game.engine.scene.onEnter();
    }
    
}

game.engine.clear = function(){

    viewport.clearRect(0, 0, game.resources.contextDom.width, game.resources.contextDom.height);
    joypadCanvas.clearRect(0, 0, game.resources.joypadTag.width, game.resources.joypadTag.height);
    
}

game.engine.loop = function(){
	
    if(!game.engine.paused){
        game.engine.frameCount += 1;
    }
    
    game.engine.clear();
    
    if(game.engine.scene){
        game.engine.scene.update(game.engine.frameCount);
        game.engine.scene.draw(game.engine.frameCount);
    }

    joypad.update(game.engine.frameCount);
    joypad.draw(game.engine.frameCount);

    game.dpad.update();

    requestAnimationFrame(game.engine.loop);
	
}

game.engine.setMute = function (_mute) {

	for(var tag in game.resources.audio){
	    var audioAsset = game.resources.audio[tag];
		audioAsset.muted = _mute;
	}
	
	game.engine.mute = _mute;
}

game.engine.fx = function (_name) {
	game.resources.audio[_name].currentTime = 0;
	game.resources.audio[_name].play();
}

if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = ( function() {

                return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                        window.setTimeout( callback, 1000 / 60 );
                };
        } )();
}

// footer
console.log("bootstrap: engine ready");