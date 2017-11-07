
game.scenes.topd 			= {};
game.scenes.topd.clearColor = "#0E7771";
game.scenes.topd.zLevel 	= 5

game.scenes.topd.platx 	= 0
game.scenes.topd.platy 	= 5

game.scenes.topd.player 	= {
	x: 0, y: 11, lookingAt: 1, wframes: 0
}

game.scenes.topd.draw = function(_frame){

	var s = game.scenes.topd
	var f = ~~(_frame/8)
	var p = game.scenes.topd.player
	var dx = 0
	var dy = 0

	var z = game.scenes.topd.zLevel

	for ( var i = z + 3; i >= z && i >= 0; i--) {
		if(i < lst_m1.length)
			game.scenes.topd.drawLevel(lst_m1[i], i - z)
	}

	if (p.wframes > 0) {
		if(p.lookingAt == 0) dy += 32 - p.wframes*2
		if(p.lookingAt == 1) dy -= 32 - p.wframes*2
		if(p.lookingAt == 2) dx += 32 - p.wframes*2
		if(p.lookingAt == 3) dx -= 32 - p.wframes*2

		viewport.drawImage(game.resources.popo,
			([0,1,0,2][f%4] + p.lookingAt*3) * 32, 64, 32, 32,
			(~~p.x * 32) + dx, (~~p.y * 32) + dy, 32, 32);
	}else{

		viewport.drawImage(game.resources.popo,
			(gd.player_anm_fs_t[f%30] + p.lookingAt*3) * 32, 64+32, 32, 32,
			(~~p.x * 32), (~~p.y * 32), 32, 32);
	}

	if (p.wframes > 0) {
		if(--p.wframes == 0) {
			if(p.lookingAt == 0) p.y++
			if(p.lookingAt == 1) p.y--
			if(p.lookingAt == 2) p.x++
			if(p.lookingAt == 3) p.x--
		}
	}

}

game.scenes.topd.drawLevel = function(tiles, zIndex){

	for (var y = 0; y < tiles.length; y++) {
		var sl = tiles[y];
		for (var x = 0; x < sl.length; x++) {
			var tile = sl[x]

			if(tile > 1) {
				viewport.drawImage(game.resources.toplevel,
					(tile%10 - 1) * 32, (~~(tile/10.0) - 1) * 32, 32, 32,
					x*32, y*32, 32, 32);

				for (var i = 0; i < zIndex; i++) {
					viewport.drawImage(game.resources.toplight,
					(tile%10 - 1) * 32, (~~(tile/10.0) - 1) * 32, 32, 32,
					x*32, y*32, 32, 32);
				}
			}

		}
	}

}

game.scenes.topd.update = function(_frame){

	var p = game.scenes.topd.player
	var l = lst_m1[game.scenes.topd.zLevel]

	if (p.wframes == 0) {
		if (pressed("left") || down("left"))   {
			p.lookingAt = 3
			if(p.x > 0 && l[p.y][p.x-1] >= 50){
				p.wframes  = 16
			}
		} else if (pressed("right") || down("right")) {
			p.lookingAt = 2
			if(p.x < 11 && l[p.y][p.x+1] >= 50){
				p.wframes  = 16
			}
		} else if (pressed("up") || down("up")) {
			p.lookingAt = 1
			if(p.y > 0 && l[p.y-1][p.x] >= 50){
				p.wframes  = 16
			}
		} else if (pressed("down") || down("down")) {
			p.lookingAt = 0
			if(p.y < 11 && l[p.y+1][p.x] >= 50){
				p.wframes  = 16
			}
		}

	}

	if(down("action")){

		game.scenes.plat.zLevel = 5 - ~~(p.y/2.0)
		game.scenes.plat.topdx  = p.x
		game.scenes.plat.topdy  = game.scenes.topd.zLevel
		
		if(p.lookingAt == 3) game.scenes.plat.topdLookingAt 	 = "l"
		else if(p.lookingAt == 2) game.scenes.plat.topdLookingAt = "r"

		game.engine.showScene(game.scenes.plat);

	}
	
}

game.scenes.topd.onEnter = function(_frame){

	var s 				= game.scenes.topd
	s.player.x 			= s.platx
	s.player.wframes 	= 0

	if(s.platLookingAt == "l") {
		s.player.lookingAt = 3
	}else{
		s.player.lookingAt = 2
	}

	s.zLevel = s.platy
}

game.scenes.topd.onExit = function(_frame){
	
}