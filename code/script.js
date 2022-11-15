var left_navigator, left_arrow, about_content;
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
    left_arrow = document.getElementsByClassName('left_arrow')[0];
    about_content = document.getElementsByClassName('about_content')[0];
    alert(window.innerWidth + ' x ' + window.innerHeight);
}
const left_show_click = () => {
    left_navigator.classList.toggle('left_nav_show');
    left_arrow.classList.toggle('left_arr_rotate');
}
const about_label_click = () => {
    //console.log('clicked');
    about_content.classList.toggle('about_cnt_show');
}