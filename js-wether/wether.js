
//プルダウンの都市を読み込み
document.addEventListener('DOMContentLoaded', function () {
    var getSelectValue = function (name) {
        var result = [];
        var opts = document.getElementById(name).options;

        for (var i = 0, len = opts.length; i < len; i++) {
            var opt = opts.item(i);
            if (opt.selected) {
                result.push(opt.value);
            }
        }
        return result;
    };

    //初見ページ表示
    window.alert(getSelectValue('city'));
    //プルダウンを切り替えた時に表示
    document.getElementById('city').onchange = function () {
        window.alert(getSelectValue('city'));
    };

});
