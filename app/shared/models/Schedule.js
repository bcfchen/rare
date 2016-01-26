function Schedule(date, time){
	this.date = date;
	this.time = time;
}

Schedule.prototype.setDate = function(date){
	this.date = date;
}

Schedule.prototype.setTime = function(time){
	this.time = time;
}
