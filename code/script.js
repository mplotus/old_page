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
}