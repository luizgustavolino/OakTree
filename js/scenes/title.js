game.scenes.title = {}
game.scenes.title.clearColor = "#000"

game.scenes.title.draw = function(_frame){
	viewport.drawImage(game.resources.title, 0, 0);
}

game.scenes.title.update = function(_frame){

	if(down("action")){
		game.engine.showScene(game.scenes.topd);
	}
}

game.scenes.title.onEnter = function(_frame){

}

game.scenes.title.onExit = function(_frame){

}