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

var trainNodes = document.querySelectorAll('.train');

var hideNodes = function(e) {
    for (var i = 0; i < trainNodes.length; i++) {
        trainNodes[i].classList.add('train-inactive')
    }
    e.target.classList.remove('train-inactive');
}

for (var i = 0; i < trainNodes.length; i++) {
    trainNodes[i].addEventListener("click", hideNodes, false);
  }

// var appMenu = new Vue({
//     el: "#app-menu",
//     data: {
//         isNorth: true
//     }
// })

// var appView = new Vue({
//     el: "#app-view",
//     data: {

//     }
// })