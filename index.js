module.exports = function(dependencies, gms) {
	function doCheck() {
		var state = gms.getState();
		dependencies.logger.info("SENTINEL: state:", state.state, "updated:", state.stateLastUpdatedTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a"), "changed:", state.stateLastChangedTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a"));
		console.log("SENTINEL: doing a check.", dependencies.moment().diff(state.stateLastChangedTimestamp, 'minutes'));
		if(state.state == "ON" && dependencies.moment().diff(state.stateLastChangedTimestamp, 'minutes') > 1) {
			console.log("SENTINEL: ALARM");
		}
	}

	setInterval(doCheck, 1000);
}