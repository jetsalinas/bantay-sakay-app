

//Vue definitions

var stationStats = new Vue({
    el: "#app-station-statistics",
    data: {
        isNorth: true,
        selectedStation: null,
        selectedIndex: null,
        loadNorth: 75.1,
        loadSouth: 63.2,
        firstTrainTime: 3.5,
        secondTrainTime: 5.5
    }
})

var globalStats = new Vue({
    el: "#app-global-statistics",
    data: {
        globalStatus: "All systems go!",
        globalTrains: 29,
        globalHeadwayTime: 3.3,
        globalCycleTime: 1.5,
        selectedStation: null
    }
})

var menuBar = new Vue({
    el: "#menu-bar",
    data: {
        title: "Bantay Sakay",
        subtitle: "",
        displayBack: false
    }
});

var attractionsGeneral = new Vue({
    el: "#app-attractions-general",
    data: {
        attractionsData: [],
        selectedStation: null
    }
});

var trainsUrl = 'http://localhost:5000/api/trains';
var stationsUrl = 'http://localhost:5000/api/stations';
var statisticsUrl = 'http://localhost:5000/api/statistics';
var attractionsUrl = 'http://localhost:5000/api/attractions';

var trainsData = [];
var stationsData = [];
var statisticsData = {};
var attractionsData = {};

var updateData = function () {
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
        attractionsGeneral.attractionsData = data;
    }).catch(error => {
    });

    console.log(attractionsData);
}

// Navbar Station Selection Scripts
var trainNodes = document.querySelectorAll('.train');

var selectStationView = function (e) {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.add('train-inactive')
        trainNodes[i].classList.remove('train-active');
    }
    e.target.classList.remove('train-inactive');
    e.target.classList.add('train-active');
    stationsData.selectedIndex = parseInt(e.target.dataset.index);
    stationStats.selectedStation = stationsData[stationsData.selectedIndex].name;
    globalStats.selectedStation = stationsData[stationsData.selectedIndex].name;
    attractionsGeneral.selectedStation = stationsData[stationsData.selectedIndex].name;
    stationStats.loadNorth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadNorth) * 100);
    stationStats.loadSouth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadSouth) * 100);
    menuBar.title = stationStats.selectedStation;
    menuBar.displayBack = true;
}

var resetNodes = function () {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.remove('train-inactive');
        trainNodes[i].classList.remove('train-active');
    }
}

var closeStationView = function () {
    stationStats.selectedStation = null;
    stationStats.selectedIndex = null;
    globalStats.selectedStation = null;
    menuBar.title = "Bantay Sakay";
    menuBar.displayBack = false;
    attractionsGeneral.selectedStation = null;
    resetNodes();
};

for (var i = 0; i < trainNodes.length; i++) {
    trainNodes[i].addEventListener("click", selectStationView, false);
}

updateData();
setInterval(updateData, 1000 * 60 * 10);
