// Resources.JS

game.resources = {};


game.resources.harvest = function(){

    game.resources.contextDom = document.getElementById("viewport");
	game.resources.canvas     = game.resources.contextDom.getContext("2d");
	
	viewport = game.resources.canvas;

    game.resources.joypadTag    = document.getElementById("joypad");
    game.resources.joypadCanvas = game.resources.joypadTag.getContext("2d");
    joypadCanvas = game.resources.joypadCanvas;
	
    var imageSet = ["popo", "level", "light", "toplevel", "toplight", "title", "thanks"];
    
    for(var i = 0; i < imageSet.length; i++){
        var imageName = imageSet[i];
        game.resources[imageName] = document.getElementById(imageName);
        if(!game.resources[imageName]) console.log("Invalid image: "+game.resources[imageName]);
    }
    
    game.resources.audio = [];
    
    var audioAssets = [];
    
    for(var j = 0; j < audioAssets.length; j++){
        var audioName = audioAssets[j];
        game.resources.audio[audioName] = document.getElementById(audioName);
        if(!game.resources.audio[audioName]) console.log("Invalid audio: "+audioName);
    }
}

// footer
console.log("bootstrap: resources ready");