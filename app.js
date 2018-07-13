// Navbar Toggle button
var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 300,
    'tolerance': 70
});

document.querySelector('.toggle-button').addEventListener('click', function () {
    slideout.toggle();
});

//Vue definitions

var stationStats = new Vue({
    el: "#app-station-statistics",
    data: {
        isNorth: true,
        selectedStation: null,
        selectedIndex: null,
        loadNorth: 75.1,
        loadSouth: 63.2
    }
})

var globalStats = new Vue({
    el: "#app-global-statistics",
    data: {
        globalStatus: "Good",
        globalTrains: 27,
        globalHeadwayTime: 3.5,
        globalCycleTime: 1.5
    }
})

var trainsUrl = 'http://localhost:5000/api/trains';
var stationsUrl = 'http://localhost:5000/api/stations';
var statisticsUrl = 'http://localhost:5000/api/statistics';

var trainsData = [];
var stationsData = [];
var statisticsData = {};

var updateData = function() {
    var request = new Request(trainsUrl , { method: 'GET'});
    fetch(request).then(response => {
        if(response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        trainsData = data;
    }).catch(error => {
    });

    request = new Request(stationsUrl , { method: 'GET'});
    fetch(request).then(response => {
        if(response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        stationsData = data;
    }).catch(error => {
    });

    request = new Request(statisticsUrl , { method: 'GET'});
    fetch(request).then(response => {
        if(response.status === 200) {
            return response.json();
        } else {
            console.log("API server could not be reached");
        }
    }).then(data => {
        statisticsData = data;
    }).catch(error => {
    });
}

// Navbar Station Selection Scripts
var trainNodes = document.querySelectorAll('.train');

var hideNodes = function(e) {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.add('train-inactive')
    }
    e.target.classList.remove('train-inactive');
    stationsData.selectedIndex = parseInt(e.target.dataset.index);
    stationStats.selectedStation = stationsData[stationsData.selectedIndex].name;
    stationStats.loadNorth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadNorth)*100);
    stationStats.loadSouth = Math.round(parseFloat(stationsData[stationsData.selectedIndex].loadSouth)*100);
}

for (var i = 0; i < trainNodes.length; i++) {
    trainNodes[i].addEventListener("click", hideNodes, false);
}

updateData();
setInterval(updateData, 3000);