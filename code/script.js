var left_navigator, left_arrow, about_content, address_path;
var selectedPath = '';
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
    left_arrow = document.getElementsByClassName('left_arrow')[0];
    about_content = document.getElementsByClassName('about_content')[0];
    address_path = document.getElementById('address_path');
    //console.log(document.getElementById('body_page').childNodes.length); = 3
}
const page_scroll = () => {
    var addBarTop = 0.25 * window.innerHeight + 60;
    if(document.body.scrollTop > addBarTop) 
        document.getElementById('addstick_bar').style.display = 'block';
    else
        document.getElementById('addstick_bar').style.display = 'none';
    change_path(selectedPath);
}
const change_path = _str => {
    if(_str!='' && _str !=NaN) {
        document.getElementById('addstick_path').innerText = _str;
        document.getElementById('address_path').innerText = _str;
    }
}
const left_show_click = () => {
    // Show left panel and make an effect
    left_navigator.classList.toggle('left_nav_show');
    left_arrow.classList.toggle('left_arr_rotate');
    // Load data from xml to left panel

}
const about_label_click = () => {
    about_content.classList.toggle('about_cnt_show');
}