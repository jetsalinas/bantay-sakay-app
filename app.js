var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 300,
    'tolerance': 70
});

// Toggle button
document.querySelector('.toggle-button').addEventListener('click', function () {
    slideout.toggle();
});


//Train selector functions
var trainNodes = document.querySelectorAll('.train');

var hideNodes = function(e) {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.add('train-inactive')
    }
    e.target.classList.remove('train-inactive');
    console.log(e.target.dataset.index);
}

for (var i = 0; i < trainNodes.length; i++) {
    trainNodes[i].addEventListener("click", hideNodes, false);
  }

var stationStats = new Vue({
    el: "#app-station-statistics",
    data: {
        isNorth: true
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