function page_load() {
    document.getElementById('get-info').innerHTML = 'Viewport is: ' + 
    window.innerWidth + ' x ' + window.innerHeight + ' client is: ' +
    document.documentElement.clientWidth + ' x ' + document.documentElement.clientHeight;
}