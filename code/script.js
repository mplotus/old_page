var left_navigator, left_arrow, about_content;
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
    left_arrow = document.getElementsByClassName('left_arrow')[0];
    about_content = document.getElementsByClassName('about_content')[0];
}
const page_scroll = () => {
    var addBarTop = 0.25 * window.innerHeight + 60;
    if(document.body.scrollTop > addBarTop) 
        document.getElementById('addstick_bar').style.display = 'block';
    else
        document.getElementById('addstick_bar').style.display = 'none';
}
const left_show_click = () => {
    left_navigator.classList.toggle('left_nav_show');
    left_arrow.classList.toggle('left_arr_rotate');
}
const about_label_click = () => {
    about_content.classList.toggle('about_cnt_show');
    console.log(document.body.scrollTop);
}