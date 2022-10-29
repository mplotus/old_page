function twoDigit(_number) {
    if(_number>9) return _number;
    else return '0' + _number;
}

function page_load() {
    var inf_bar = document.getElementById('info-bar');
    var mDate = new Date(document.lastModified);
    var mCode = ''; var mHour = mDate.getHours();
    if(mHour<12) mCode = 'M';
    else if(mHour<18) mCode = 'A';
    else mCode = 'E';
    mCode += twoDigit(mDate.getDate()) + '' + 
        twoDigit(mDate.getMonth() + 1) + '' + twoDigit(mDate.getFullYear()%100);
    inf_bar.innerHTML = 'Update code: ' + mCode + '<br>Gmail: mplotus.github.io@gmail.com<br>Mobile: 0395.480.387';
    var _fols = document.getElementsByClassName('folder');
    var _fcon = document.getElementsByClassName('nested');
    if(_fols.length == _fcon.length) {
        for(i=0;i<_fols.length;i++) {
            _fols[i].addEventListener('click',fols_click);
            var spName = _fols[i].innerText.toLowerCase().replace(/ /g,'_');
            _fcon[i].id = spName;
        }
    }
    else alert('Error when load content!');
}

function fols_click() {
    var spName = this.innerText.toLowerCase().replace(/ /g,'_');
    document.getElementById(spName).classList.toggle('shown');
}