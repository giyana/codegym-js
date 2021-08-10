document.addEventListener('DOMContentLoaded', function () {
    //指定されたプルダウンの値を取得
    let getSelectValue = function (name) {
        let result = '';
        let elems = document.getElementById(name).options;
        for (let i = 0, len = elems.length; i < len; i++) {
            let elem = elems.item(i);
            if (elem.selected) {
                result = elem.value;
                break;
            }
        }
        return result;
    };

    //APIへの問い合わせURLを生成
    let getAPI = function () {
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + getSelectValue('city') + '&APPID=4b5774e9f3d2a07b84f0f2f88e486224';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            let data_json = this.response;
            let data = JSON.parse(data_json);
            let weather = data.weather;
            console.log(weather);

            //取得した天気をHTMLに反映
            let result_weather = document.getElementById("result");
            let city = document.getElementById("city").value
            //console.log(city.value);
            result_weather.textContent = `${city}の天気は${weather}です`;
        };
        xhr.send();
    };

    //最初のレンダリング時に問い合わせURLを生成
    getAPI();

    //プルダウンを切り替えた時にAPIへの問い合わせURLを生成
    document.getElementById('city').onchange = function () { getAPI() };


});

/*
天気一覧
Clouds
Clear
Snow
Rain
Drizzle
Thunderstorm
Mist
Smoke
Haze
Dust
Fog
Sand
Dust
Ash
Squall
Tornado
*/
