function ScheduleDate(month, year, source, obj){
	this.year = year;
	this.month = month;
	this.date = obj.$id;
	this.dateStr = obj ? createDateStr(month, obj.$id, year) : "";
	this.displayDateStr = obj ? createDisplayDateStr(month, obj.$id, year) : "";
	this.displayDateStrWithYear = obj ? createDisplayDateStrWithYear(month, obj.$id, year) : "";
	this.times = [];
	if (obj && obj[source].times){
		this.times = this.getInRangeTimes(obj[source].times, this.dateStr, source);
	}

	function createDateStr(month, date, year){
		return month + "-" + date + "-" + year;
	}

	function createDisplayDateStrWithYear(month, date, year){
		var formattedDateStr = month + "/" + date + "/" + year,
			dateMoment = new moment(formattedDateStr);
		var displayDateStr = dateMoment.format("ddd MMM D YYYY");

		return displayDateStr;
	}

	function createDisplayDateStr(month, date, year){
		var formattedDateStr = month + "/" + date + "/" + year,
			dateMoment = new moment(formattedDateStr),
			todayMoment = new moment();
		var isToday = dateMoment.year() === todayMoment.year() &&
					  dateMoment.dayOfYear() === todayMoment.dayOfYear();
		var displayDateStr = dateMoment.format("ddd MMM D");
		if (isToday){
			displayDateStr = "Today"
		}

		return displayDateStr;
	}
}

ScheduleDate.prototype.getInRangeTimes = function(rawTimesObj, dateStr){
	var inRangeTimes = [];
	var timeStrings = Object.keys(rawTimesObj);
    timeStrings.forEach(function(timeStr){
	    var formattedDateStr = dateStr.replace(/-/g, '/');
	    var time = new ScheduleTime(timeStr, rawTimesObj[timeStr]);
	    if (time.isTimeInRange(formattedDateStr)){
	    	inRangeTimes.push(time);
	    }
    });

    return inRangeTimes;
}

ScheduleDate.prototype.getDayOfWeek = function(){
	var formattedDateStr = dateObj.$id.replace(/-/g, '/');
    var momentObj = new moment(formattedDateStr);
    return momentObj.format("ddd");
}

ScheduleDate.prototype.getMonthDay = function(){
	var formattedDateStr = dateObj.$id.replace(/-/g, '/');
    var momentObj = new moment(formattedDateStr);
    return momentObj.format("MMM DD");
}

ScheduleDate.prototype.getTimes = function(){
	return this.times;
}

ScheduleDate.prototype.isDateInRange = function (){
    // check if the date object is even valid
    if (!this.dateStr){
        return false;
    }

    // compare dateObj with today's date to see if it's equal or after today
    var todaysMoment = new moment();
    var modDateStr = this.dateStr.replace(/-/g, '/');
    var dateObjMoment = new moment(modDateStr);
    var dateIsInRange = (dateObjMoment.year() >= todaysMoment.year())
                        && (dateObjMoment.dayOfYear() >= todaysMoment.dayOfYear());

    return dateIsInRange;           
}

/* looks at the times under a date. 
 * if all times are unavailable then 
 * mark date as unavailable as well */
ScheduleDate.prototype.isAvailable = function(){
    // null check
    if (!this.times){
        return false;
    }

    var available = false;
    this.times.forEach(function(time){
    	if (time.isAvailable()){
    		available = true;
    	}
    });

    return available;
}