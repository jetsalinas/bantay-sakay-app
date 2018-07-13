/* Set the width of the side navigation to 0 */
function toggleNav() {
    if (document.getElementById("station-nav-container").style.width == "0px") {
        document.getElementById("station-nav-container").style.width = "25%";
        document.getElementById("station-nav").style.display = "inline-block";
    } else {
        document.getElementById("station-nav-container").style.width = "0px";
        document.getElementById("station-nav").style.display = "none";
    }
} 