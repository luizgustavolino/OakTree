var joypad = {}

joypad.listening = false

joypad.draw = function(_frame) {

	joypadCanvas.strokeStyle = "red";
	
	joypadCanvas.beginPath();
	joypadCanvas.arc(30,60,20,0,2*Math.PI);
	joypadCanvas.stroke();

	joypadCanvas.beginPath();
	joypadCanvas.arc(110,60,20,0,2*Math.PI);
	joypadCanvas.stroke();

	joypadCanvas.beginPath();
	joypadCanvas.arc(70,25,20,0,2*Math.PI);
	joypadCanvas.stroke();

	joypadCanvas.beginPath();
	joypadCanvas.arc(70,95,20,0,2*Math.PI);
	joypadCanvas.stroke();
}


joypad.update = function(_frame) {

	if(joypad.listening == false) {
		
	}

}