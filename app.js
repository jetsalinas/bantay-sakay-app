const states = {
    currentView: "global",
    selectedStation: null,
    selectedTrip: null,
    selectedAttraction: null
}

var stationStats = new Vue({
    el: "#app-station-statistics",
    data: {
        states: states,
        etaData: [],
        isNorth: true,
        selectedStation: null,
        selectedIndex: null,
        loadNorth: 75.1,
        loadSouth: 63.2,
        etaFirstNorth: null,
        etaSecondNorth: null,
        etaFirstSouth: null,
        etaSecondSouth: null
    }
})

var globalStats = new Vue({
    el: "#app-global-statistics",
    data: {
        states: states,
        globalStatus: "All stations go!",
        globalTrains: 29,
        globalHeadwayTime: 3.3,
        globalCycleTime: 1.5,
        selectedStation: null
    }
})

var tripStats = new Vue({
    el: "#app-trip-statistics",
    data: {
        states: states
    }, methods: {
        "selectAttraction": function (attractionName) {
            for (attraction in featuredAttractions.attractionsData) {
                if (featuredAttractions.attractionsData[attraction].name == attractionName) {
                    featuredAttractions.states.selectedAttraction = featuredAttractions.attractionsData[attraction];
                    featuredAttractions.hasSelected = true;
                    states.currentView = "attractions";
                    console.log(states.selectedAttraction);
                }
            }
        }
    }
});

var attractionStats = new Vue({
    el: "#app-attraction-stats",
    data: {
        states: states
    }
});

var featuredTrips = new Vue({
    el: "#app-featured-trips",
    data: {
        "states": states,
        "tripsData": [],
        "hasSelected": false,
        "selectedTrip": []
    }, methods: {
        "selectTrip": function (tripName) {
            for (trip in featuredTrips.tripsData) {
                if (featuredTrips.tripsData[trip].name == tripName) {
                    states.selectedTrip = featuredTrips.tripsData[trip];
                    featuredTrips.hasSelected = true;
                    states.currentView = "trips";
                }
            }
        }
    }
});

var featuredAttractions = new Vue({
    el: "#app-featured-attractions",
    data: {
        "states": states,
        "attractionsData": [],
        "hasSelected": false,
        "selectedAttraction": []
    }, methods: {
        "selectAttraction": function (attractionName) {
            for (attraction in featuredAttractions.attractionsData) {
                if (featuredAttractions.attractionsData[attraction].name == attractionName) {
                    featuredAttractions.states.selectedAttraction = featuredAttractions.attractionsData[attraction];
                    featuredAttractions.hasSelected = true;
                    states.currentView = "attractions";
                    console.log(states.selectedAttraction);
                }
            }
        }
    }
})

var menuBar = new Vue({
    el: "#menu-bar",
    data: {
        states: states,
        title: null,
        subtitle: "",
        displayBack: false
    }
});

var trainsData = [];
var stationsData = [];
var statisticsData = {};

var updateData = function () {

    var trainsUrl = 'http://localhost:5000/api/trains';
    var stationsUrl = 'http://localhost:5000/api/stations';
    var statisticsUrl = 'http://localhost:5000/api/statistics';
    var attractionsUrl = 'http://localhost:5000/api/attractions';
    var tripsUrl = 'http://localhost:5000/api/trips';
    var etaUrl = 'http://localhost:5000/api/eta';

    var request = new Request(trainsUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        trainsData = data;
    }).catch(error => {
    });

    request = new Request(stationsUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        stationsData = data;
    }).catch(error => {
    });

    request = new Request(statisticsUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        statisticsData = data;
        if (data.status == 1) {
            globalStats.globalStatus = "All stations go!";
        } else {
            globalStats.globalStatus = "System down!";
        }
        globalStats.globalTrains = data.totalTrains;
        globalStats.globalCycleTime = Math.round(data.cycleTime / 60 / 60 * 100) / 100;
        globalStats.globalHeadwayTime = Math.round(data.headwayTime / 60 * 100) / 100;
    }).catch(error => {
    });

    request = new Request(attractionsUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        featuredAttractions.attractionsData = data;
    }).catch(error => {
    });

    request = new Request(tripsUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        featuredTrips.tripsData = data;
    }).catch(error => {
    });

    request = new Request(etaUrl, { method: 'GET' });
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        stationStats.etaData = data;
    }).catch(error => {
    });
}

var trainNodes = document.querySelectorAll('.train');

var selectStationView = function (e) {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.add('train-inactive')
        trainNodes[i].classList.remove('train-active');
    }
    states.currentView = "station";
    e.target.classList.remove('train-inactive');
    e.target.classList.add('train-active');
    stationsData.selectedIndex = parseInt(e.target.dataset.index);
    states.selectedStation = stationsData[stationsData.selectedIndex].name;
    stationStats.loadNorth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadNorth) * 100);
    stationStats.loadSouth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadSouth) * 100);
    stationStats.etaFirstNorth = Math.round(stationStats.etaData.etaFirstNorth / 60 * 100) / 100;
    stationStats.etaSecondNorth = Math.round(stationStats.etaData.etaSecondNorth / 60 * 100) / 100;
    stationStats.etaFirstSouth = Math.round(stationStats.etaData.etaFirstSouth / 60 * 100) / 100;
    stationStats.etaSecondSouth = Math.round(stationStats.etaData.etaSecondSouth / 60 * 100) / 100;
    menuBar.title = states.selectedStation;
    menuBar.displayBack = true;
}

var resetNodes = function () {
    var trainNodes = document.querySelectorAll('.train');
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.remove('train-inactive');
        trainNodes[i].classList.remove('train-active');
    }
}

var closeView = function () {
    states.currentView = "global"
    states.selectedStation = null;
    states.selectedTrip = null;
    states.selectedAttraction = null;
    menuBar.title = null;
    menuBar.displayBack = false;
    resetNodes();
};

/********
 * MAIN *
 ********/

var trainNodes = document.querySelectorAll('.train');
for (var i = 0; i < trainNodes.length; i++) {
    trainNodes[i].addEventListener("click", selectStationView, false);
}

updateData();
setInterval(updateData, 5000);
