chessClock = {
		
	/**
	 * The status of the chess clock is either
	 * "stopped" or "running"
	 */
	status : "stopped",
	
	/**
	 * The id of the currently running clock.
	 * Only relevant for status "running".
	 */
	currentClock : 0,
	
	/**
	 * The current times of the two clocks.
	 */
	times : [ 300, 300 ],
	
	/**
	 * The initial times for the clocks.
	 */
	initialTimes : [ 300, 300 ],
	
	/**
	 * Handle a click on a clock.
	 */
	clockClicked : function(id) {
		if ( this.status == "stopped" ) {
			/* start the clock */
			this.status = "running";
			this.currentClock = id;
			this.setInterval();
			this.addClass(this.currentClock, "running");
			console.log("clock started: " + id);
		} else if ( this.status == "running" ) {
			/* clock is already running */
			if ( this.currentClock == id ) {
				/* change the current clock */
				this.removeClass(this.currentClock, "running");
				if ( this.currentClock == 0 ) {
					this.currentClock = 1;
				} else {
					this.currentClock = 0;
				}
				this.addClass(this.currentClock, "running");
				console.log("clock changed: " + id);
			}
		} else {
			/* status is "expired", do nothing */
		}
	},
	
	/**
	 * Starts the timer.
	 */
	setInterval : function() {
		this.timer = window.setInterval(this.countDown, 1000);
	},
	
	/**
	 * Clears the timer
	 */
	clearInterval : function() {
		if ( this.timer ) {
			window.clearInterval(this.timer);
			this.timer = null;
		}
	},
	
	/**
	 * Counts down the current clock.
	 */
	countDown : function() {
		chessClock.times[chessClock.currentClock]--;
		chessClock.updateClock(
				chessClock.currentClock, 
				chessClock.times[chessClock.currentClock]);
		
		/* check if zero has been reached */
		if ( chessClock.times[chessClock.currentClock] == 0) {
			/* stop the interval */
			chessClock.clearInterval();
			chessClock.status = "expired";
			console.log("timer suspended");
		}
	},
	
	/**
	 * Resets both clocks to their initial values.
	 */
	reset : function() {
		/* reset the times */
		this.times = [ this.initialTimes[0], this.initialTimes[1]];
		
		/* stop the clock */
		this.status = "stopped";
				
		this.clearInterval();
		
		this.removeClass(0, "running");
		this.removeClass(1, "running");
		
		/* update the view */
		this.updateView();
	},
	
	/**
	 * Updates the views of the two clocks with the current values from times.
	 */
	updateView : function() {
		this.updateClock(0, this.times[0]);
		this.updateClock(1, this.times[1]);
	},
	
	/**
	 * Updates the view of the clock with the given id to the given time.
	 */
	updateClock : function(id, time) {
		element = document.getElementById("clock"+id);
		formattedTime = this.formatTime(time);
		element.innerHTML = formattedTime;
		
		/* change the class if time is up */
		if ( time == 0 ) {
			this.addClass(id, "expired");
			this.clearInterval();
		} else {
			/* remove the class "expired" */
			this.removeClass(id, "expired");
		}
	},
	
	addClass : function(id, className) {
		element = document.getElementById("clock"+id);
		element.className += " " + className;
	},
	
	removeClass : function(id, className) {
		element = document.getElementById("clock"+id);
		exp = new RegExp(className);
		element.className = element.className.replace( exp , '' );
	},
	
	/**
	 * Formats the given time in seconds into the format HH:mm.
	 */
	formatTime : function(time) {
		minutes = Math.floor(time / 60);
		seconds = Math.floor(time % 60);
		result = "";
		if (minutes < 10) result += "0";
		result += minutes + ":";
		if (seconds < 10) result += "0";
		result += seconds;
		return result;
	}
				
};
