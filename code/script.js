var left_navigator, left_arrow, about_content, address_path;
var selectedPath = '';
var _arrFileType;
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
    _arrFileType = new Array();
    fetch('./code/filetype.xml').then(res => {
        res.text().then(xml => {
            let _parser = new DOMParser();
            let _types = _parser.parseFromString(xml, 'application/xml').querySelectorAll('type');
            for(i=0; i<_types.length; i++) {
                _arrFileType.push([_types[i].id, _types[i].innerHTML]);
            }
        })
    });
    load_directory('/');
}
const page_scroll = () => {
    var addBarTop = 0.25 * window.innerHeight + 60;
    if(document.body.scrollTop > addBarTop) 
        document.getElementById('addstick_bar').style.display = 'block';
    else
        document.getElementById('addstick_bar').style.display = 'none';
    change_path(selectedPath);
}
const change_path = _path => {
    if(_path!='' && _path !=NaN) {
        document.getElementById('addstick_path').innerText = _path;
        document.getElementById('address_path').innerText = _path;
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
    load_directory(selectedPath);
}
const parent_click = () => {
    if(selectedPath != '/') {
        let arrPath = extrPath(selectedPath);
        if(arrPath.toString()!='NaN') {
            arrPath.pop();
            selectedPath = ('/' + arrPath.toString().replace(/,/g,'/')).replace('//','/');
            change_path(selectedPath);
            load_directory(selectedPath);
        }
    }
}
const load_directory = _path => {
    let arrPath = extrPath(selectedPath);
    fetch('./code/data.xml').then((res) => {
        res.text().then((xml) => {
            let parser = new DOMParser();
            let _root = parser.parseFromString(xml, 'application/xml').querySelector('root');
            let _dir = _root;
            for(i=0;i<arrPath.length;i++) {
                for(j=0;j<_dir.children.length;j++) {
                    if(_dir.children[j].id == arrPath[i]) {
                        _dir = _dir.children[j];
                    }
                }
            }
            let _linkPage = document.getElementsByClassName('link_page')[0];
            while(_linkPage.childNodes.length>0) {
                _linkPage.removeChild(_linkPage.childNodes[0]);
            }
            for(i=0;i<_dir.children.length;i++) {
                let _file = _dir.children[i];
                if(_file.nodeName == 'folder') {
                    let _dirItem = document.createElement('div');
                    _dirItem.classList.add('link_item');
                    _dirItem.title = _file.id;
                    // Icon for directory
                    let _dirIcon = document.createElement('img');
                    _dirIcon.style.width = '64px';
                    _dirIcon.style.height = '64px';
                    _dirIcon.alt = 'No Icon';
                    _dirIcon.src = _arrFileType[1][1];
                    _dirItem.appendChild(_dirIcon);
                    // Label for directory
                    let _dirText = document.createElement('div');
                    _dirText.classList.add('link_text');
                    _dirText.innerText = _file.id;
                    _dirItem.appendChild(_dirText);
                    _dirItem.addEventListener('click', e => {
                        selectedPath += '/' + e.currentTarget.title;
                        selectedPath = selectedPath.replace('//','/');
                        change_path(selectedPath);
                        load_directory(selectedPath);
                    });
                    _linkPage.appendChild(_dirItem);
                }
                if(_file.nodeName == 'file') {
                    let _linkItem = document.createElement('a');
                    _linkItem.classList.add('link_item');
                    _linkItem.title = _file.id;
                    _linkItem.href = _file.children[0].innerHTML;
                    _linkItem.target = '_blank';
                    // Icon for item
                    let _linkIcon = document.createElement('img');
                    _linkIcon.style.width = '64px';
                    _linkIcon.style.height = '64px';
                    _linkIcon.alt = 'No Icon';
                    if(_file.children[1].innerHTML.substring(0,1) == '#') {
                        let _iconName = _file.children[1].innerHTML;
                        for(k=2;k<_arrFileType.length;k++) {
                            if(_iconName == _arrFileType[k][0]) {
                                _linkIcon.src = _arrFileType[k][1];
                                break;
                            }
                            else _linkIcon.src = _arrFileType[0][1];
                        }
                    }
                    else {
                        _linkIcon.src = _file.children[1].innerHTML;
                    }
                    _linkItem.appendChild(_linkIcon);
                    // Label for item
                    let _linkText = document.createElement('div');
                    _linkText.classList.add('link_text');
                    _linkText.innerText = _file.id;
                    _linkItem.appendChild(_linkText);
                    _linkPage.appendChild(_linkItem);
                }
            }
        })
    });
}
const extrPath = _path => {
    if(_path.substring(0,1)!='/') return NaN;
    else {
        let arrPath = new Array();
        let iChr = 1;
        for(t=1;t<_path.length;t++) {
            if(_path.substring(t,t+1)=='/') {
                arrPath.push(_path.substring(iChr, t));
                iChr = t+1;
            }
        }
        arrPath.push(_path.substring(iChr, _path.length));
        return arrPath;
    }
}
const cntSplash = _path => {
    let nSpl = 0;
    for(k=0;k<_path.length;k++) {
        if(_path.substring(k,k+1)=='/') nSpl++;
    }
    return nSpl;
}
const about_label_click = () => {
    about_content.classList.toggle('about_cnt_show');
}