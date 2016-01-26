function ScheduleTime(timeStr, obj){
	this.appointments = [];
	this.numOfOpenings = 0;	
	this.timeStr = "";
	this.displayTimeStr = "";

	if (obj){
		this.timeStr = timeStr;	
		this.displayTimeStr = formatTimeStr(timeStr);
		this.numOfOpenings = obj.numOfOpenings;
		this.setAppointments(obj.appointments);
	} 

	function formatTimeStr(timeStr){
		var timeMoment = new moment("1/11/1911 " + timeStr);
		return timeMoment.format("h:mm A");
	}
}

ScheduleTime.prototype.isAvailable = function(){
    // null check
    if (!this.numOfOpenings){
        return false;
    }

    /* check if number of appointments for this time
     * is greater/equal than number of openings for this time */
     if (!this.appointments){
        this.appointments = [];
     }
     
     // filter out cancelled appoitnments
     var filteredAppts = [];
     this.appointments.forEach(function(appointment){
     	if (!appointment.isCancelled()){
     		filteredAppts.push(appointment);
     	}
     });

     var numOfAppointments = filteredAppts.length;
     if (numOfAppointments >= this.getNumOfOpenings()){
        return false;
     }

     return true;
}

ScheduleTime.prototype.isTimeInRange = function(dateStr){
	var BUFFER_HOURS = 2;
	var formattedDateStr = dateStr.replace(/-/g, '/');
    var now = new moment();
    var givenDateTimeMoment = new moment(formattedDateStr + " " + this.timeStr);
    var isInRange = givenDateTimeMoment > now.add(BUFFER_HOURS, "hours");
    return isInRange;
}

ScheduleTime.prototype.getAppointments = function(){
	return this.appointments;
}

ScheduleTime.prototype.setAppointments = function(appointments){
	var self = this;
	self.appointments = [];
	if (!appointments) {
		return;
	}

	var appointmentKeys = Object.keys(appointments);
    appointmentKeys.forEach(function(appointmentKey){
	    var appointment = new Appointment(appointments[appointmentKey]);
		self.appointments.push(appointment);
    });
}

ScheduleTime.prototype.getNumOfOpenings = function(){
	return this.numOfOpenings;
}