
game.scenes.plat = {};

game.scenes.plat.clearColor 	   = "#3B0F43";
game.scenes.plat.looking   = 0

game.scenes.plat.idleFrame = 0
game.scenes.plat.zLevel    = 1
game.scenes.plat.topdx 	   = 0
game.scenes.plat.topdy 	   = 0
game.scenes.plat.boxezes   = []

game.scenes.plat.draw = function(_frame){

	var s = game.scenes.plat
	var z = game.scenes.plat.zLevel

	for ( var i = z + 3; i >= z && i >= 0; i--) {
		if(i < ls_m1.length)
			game.scenes.plat.drawTiles(ls_m1[i], i - z)
	}

	var position = s.hero.body.GetOriginPosition();
	var accell = s.hero.body.GetLinearVelocity();
	
	var f = ~~((_frame-s.idleFrame)/8)

	if(accell.y < -gd.player_jump_ths || accell.y > gd.player_jump_ths) {
		var extra =  accell.y < 0 ? 0 : 1
		viewport.drawImage(game.resources.popo,
			(3+extra) * 32, s.looking, 32,32,
			~~position.x - 16, ~~position.y - 16, 32,32);

	}else if(accell.x > gd.player_anm_ths || accell.x < -gd.player_anm_ths) {
		viewport.drawImage(game.resources.popo,
			[0,1,0,2][f%4] * 32, s.looking, 32,32,
			~~position.x - 16, ~~position.y - 16, 32,32);
	} else{
		viewport.drawImage(game.resources.popo,
			gd.player_anm_fs[f%30]*32, s.looking, 32,32,
			~~position.x - 16, ~~position.y - 16, 32, 32);
	}

	if(gd.boxdebug) {
		game.boxRenderer.draw(s.world, viewport);
	}

}

game.scenes.plat.drawTiles = function(list, zIndex) {

	for (var y = 0; y < list.length; y++) {
		var sl = list[y];
		for (var x = 0; x < sl.length; x++) {
			var tile = sl[x]
			if(tile > 1) {
				viewport.drawImage(game.resources.level,
					(tile%10 - 1) * 32, (~~(tile/10.0) - 1) * 32, 32, 32,
					x*32, y*32, 32, 32);

				for (var i = 0; i < zIndex; i++) {
					viewport.drawImage(game.resources.light,
					(tile%10 - 1) * 32, (~~(tile/10.0) - 1) * 32, 32, 32,
					x*32, y*32, 32, 32);
				}
			}
		}
	}

}

game.scenes.plat.update = function(_frame){

	var s = game.scenes.plat
	s.world.Step( 1.0 / game.engine.fps, 1);

	if (s.hero.body) {

		var v = s.hero.body.GetLinearVelocity();
		var position = s.hero.body.GetOriginPosition();

		if( position.y >= 400){
			game.engine.showScene(game.scenes.thanks);
		}

		if(down("up") && v.y == 0){
			var impulse  = new b2Vec2(0, -gd.player_jump_size);
			var position = s.hero.body.GetOriginPosition();
            s.hero.body.ApplyImpulse(impulse, position);
		}

		v = s.hero.body.GetLinearVelocity();

		if(( pressed("left") &&  pressed("right")) || (!pressed("left") && !pressed("right"))){
			if (v.x > 0) { v.x -= gd.player_speed }
			if (v.x < 0) { v.x += gd.player_speed }
		} else {
			if (pressed("left") || down("left"))   {
				s.looking = 32
				v.x -= gd.player_speed
				if(v.x < gd.player_max_speed * -1) v.x = gd.player_max_speed * -1
			}
    		if (pressed("right") || down("right")) {
    			s.looking = 0
    			v.x += gd.player_speed
    			if(v.x > gd.player_max_speed) v.x = gd.player_max_speed
    		}
		}

		if(down("action") && v.y == 0){
			
			game.scenes.topd.platx = ~~((position.x)/32);
			game.scenes.topd.platy = ~~((position.y)/32/2) + 1;

			if(s.looking == 0 ) game.scenes.topd.platLookingAt = "r" 
			else game.scenes.topd.platLookingAt = "l" 

			game.engine.showScene(game.scenes.topd);

		}

		var ths = gd.player_stop_ths
		if(v.x <= ths && v.x >= -ths && v.x != 0){
			v.x = 0;
			s.idleFrame = _frame
		}

		if(v.y <= ths && v.y >= -ths && v.y != 0) v.y = 0;

		var velocity = new b2Vec2(v.x, v.y);
    	s.hero.body.SetLinearVelocity(velocity);
	}
	
}

game.scenes.plat.onEnter = function(_frame){

	var s = game.scenes.plat

	if(!s.world) {

		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-1000, -1000);
		worldAABB.maxVertex.Set(1000, 1000);
		var gravity = new b2Vec2(0, 300);
		var doSleep = true;

		s.world = new b2World(worldAABB, gravity, doSleep);
		s.hero = game.ph.hero(s.world, s.topdx * 32 + 16, 32*10 - 14);

		game.ph.box(s.world, -10, 0, 5, 400, true)
		game.ph.box(s.world, 390, 200, 5, 135, true)
		game.ph.box(s.world, 0, -10, 384, 6,true)

	}else{

		for (var i = game.scenes.plat.boxezes.length - 1; i >= 0; i--) {
			var box = game.scenes.plat.boxezes[i]
			s.world.DestroyBody(box);
		}

		game.scenes.plat.boxezes = []

    	s.hero.body.SetLinearVelocity(
    		new b2Vec2(0, 0));
		s.hero.body.SetCenterPosition(
			new b2Vec2(s.topdx * 32 + 16, (s.topdy * 2 * 32) - 14), 0)
		s.looking = s.topdLookingAt == "l" ? 32 : 0
	}


	for (var y = 0; y < ls_m1[game.scenes.plat.zLevel].length; y++) {
		var sl = ls_m1[game.scenes.plat.zLevel][y];
		for (var x = 0; x < sl.length; x++) {
			tile = sl[x]
			if(tile != 0 && tile < 50) {
				game.scenes.plat.boxezes.push(
					game.ph.box(s.world, 16+x*32, 16+y*32, 16, 16, true)
				)
			}
		}
	}

}

game.scenes.plat.onExit = function(_frame){
	
}