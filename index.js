module.exports = function(dependencies, gms) {
	function doCheck() {
		var state = gms.getState();
		var registeredChangedTimestamp = dependencies.moment("2000-01-01");

		dependencies.logger.info("SENTINEL: state:", state.state, "updated:", state.stateLastUpdatedTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a"), "changed:", state.stateLastChangedTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a"));
		
		if(registeredChangedTimestamp.diff(dependencies.moment(state.stateLastChangedTimestamp)) < 0) {
			dependencies.db.insert(state);
			registeredChangedTimestamp = state.stateLastChangedTimestamp;
		}


		if(state.state == "ON" && dependencies.moment().diff(state.stateLastChangedTimestamp, 'minutes') > 1) {
			console.log("SENTINEL: ALARM");
		}
	}

	setInterval(doCheck, 1000);
}