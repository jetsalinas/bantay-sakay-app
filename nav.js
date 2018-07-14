var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'side': 'right',
    'padding': 300,
    'tolerance': 70
});

document.querySelector('#toggle-train-list').addEventListener('click', function () {
    slideout.toggle();
});
