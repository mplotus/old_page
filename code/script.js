var left_navigator;
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
}
const left_show_click = () => {
    //console.log('clicked');
    left_navigator.classList.toggle('left_nav_show');
}