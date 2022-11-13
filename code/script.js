var left_navigator, left_arrow;
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
    left_arrow = document.getElementsByClassName('left_arrow')[0];
}
const left_show_click = () => {
    //console.log('clicked');
    left_navigator.classList.toggle('left_nav_show');
    left_arrow.classList.toggle('left_arr_rotate');
}