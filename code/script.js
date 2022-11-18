var left_navigator, left_arrow, about_content, address_path;
var selectedPath = '';
const page_load = () => {
    left_navigator = document.getElementsByClassName('left_navigator')[0];
    left_arrow = document.getElementsByClassName('left_arrow')[0];
    about_content = document.getElementsByClassName('about_content')[0];
    address_path = document.getElementById('address_path');
    // Load data from xml
    let leftContain = document.getElementById('left_contain');
    // Clear left contain before add data
    while(leftContain.childNodes.length > 0) {
        leftContain.removeChild(leftContain.childNodes[0]);
    }
    // Add data from xml file
    fetch('./code/data.xml').then(res => {
        res.text().then(xml => {
            let parser = new DOMParser();
            let dirs = parser.parseFromString(xml, 'application/xml').querySelectorAll('folder');
            for(i=0; i<dirs.length;i++) {
                let curElement = dirs[i];
                let fullPath = dirs[i].id;
                let leftPadding = 0;
                while(curElement.parentElement.id != '/') {
                    fullPath = curElement.parentElement.id + '/' + fullPath;
                    leftPadding += 20;
                    curElement = curElement.parentElement;
                }
                fullPath = '/' + fullPath;
                let btt_dir = document.createElement('div');
                btt_dir.innerText = dirs[i].id;
                btt_dir.title = fullPath;
                btt_dir.classList.add('btt_dirs');
                btt_dir.style.paddingLeft = (10 + leftPadding).toString() + 'px';
                btt_dir.style.width = 'calc(98% - ' + (10 + leftPadding).toString() + 'px)';
                if(dirs[i].parentElement.id == '/') btt_dir.style.display = 'block';
                else btt_dir.style.display = 'none';
                btt_dir.addEventListener('click', btt_dir_click);
                leftContain.appendChild(btt_dir);
            }
        })
    });
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
    // Prepare left contain
    let nameHeight = document.getElementById('left_name').offsetHeight;
    document.getElementById('left_cover').style.height = 'calc(100vh - ' + (nameHeight+ 28).toString() + 'px)';
}
const btt_dir_click = e => {
    let leftContain = document.getElementById('left_contain');
    let prTitle = e.currentTarget.title;
    let i;
    for(i=0;i<leftContain.childNodes.length;i++) {
        let iTitle = leftContain.childNodes[i].title;
        if(leftContain.childNodes[i].style.display == 'block') {
            if((iTitle.length > prTitle.length) && (iTitle.substring(0, prTitle.length) == prTitle)) {
                leftContain.childNodes[i].style.display = 'none';
            }
        }
        else {
            if((iTitle.length > prTitle.length) && (iTitle.substring(0, prTitle.length) == prTitle) && (cntSplash(iTitle) == cntSplash(prTitle) + 1)) {
                leftContain.childNodes[i].style.display = 'block';
            }
        }
    }
    selectedPath = prTitle;
    change_path(selectedPath);
}
const extrPath = _path => {
    if(_path.substring(0,1)!='/') return NaN;
    else {
        let arrPath = new Array();
        let iChr = 1;
        for(i=1;i<_path.length;i++) {
            if(_path.substring(i,i+1)=='/') {
                arrPath.push(_path.substring(iChr, i));
                iChr = i+1;
            }
        }
        arrPath.push(_path.substring(iChr, _path.length));
        return arrPath;
    }
}
const cntSplash = _path => {
    let nSpl = 0;
    for(i=0;i<_path.length;i++) {
        if(_path.substring(i,i+1)=='/') nSpl++;
    }
    return nSpl;
}
const about_label_click = () => {
    about_content.classList.toggle('about_cnt_show');
}