//Initialize mobile side nav
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, draggable=true)
})

// Pages

const NotFound = { template: '<p>Page not found</p>' }
const HomeComponent = { template: `<p>Hello page</p>` }
const TrainsComponent = { template: '<p>Trains page</p>' }
const StationsComponent = { template: '<p>Stations page</p>' }
const NavigatorComponent = { template: '<p>Navigator page</p>' }

// Routing

const routes = [
    { path: '/', component: HomeComponent },
    { path: '/trains', component: TrainsComponent },
    { path: '/stations', component: StationsComponent },
    { path: '/navigator', component: NavigatorComponent }
];

const router = new VueRouter({ routes });

// App

const app = new Vue({
    router
}).$mount('#app')