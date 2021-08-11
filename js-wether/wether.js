document.addEventListener("DOMContentLoaded", function () {
    //指定されたプルダウンの値を取得
    let getSelectValue = function (name) {
        let result = "";
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

    //APIへの問い合わせ～HTML反映まで
    let getAPI = function () {
        //APIへの問い合わせURLを生成
        const cityName = getSelectValue("city");
        const appId = "4b5774e9f3d2a07b84f0f2f88e486224";
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appId}`;
        
        //天気情報を取得＆HTMLに反映
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            let data_json = this.response;
            let data = JSON.parse(data_json);
            let weather_en = data.weather[0].main;

            //天候状況を日本語に翻訳（公式ドキュメントの全天候網羅済）
            switch (weather_en) {
                case "Clouds":
                    var weather_jp = "曇り";
                    break;
                case "Clear":
                    var weather_jp = "晴天"
                    break;
                case "Snow":
                    var weather_jp = "雪"
                    break;
                case "Rain":
                    var weather_jp = "雨"
                    break;
                case "Tornado":
                    var weather_jp = "竜巻"
                    break;
                case "Squall":
                    var weather_jp = "スコール"
                    break;
                case "Thunderstorm":
                    var weather_jp = "雷雨"
                    break;
                case "Drizzle":
                    var weather_jp = "霧雨"
                    break;
                case "Mist":
                    var weather_jp = "霧"
                    break;
                case "Smoke":
                    var weather_jp = "煙っぽい"
                    break;
                case "Haze":
                    var weather_jp = "煙霧"
                    break;
                case "Fog":
                    var weather_jp = "濃霧"
                    break;
                case "Ash":
                    var weather_jp = "降灰"
                    break;
                case "Dust":
                    var weather_jp = "砂塵"
                    break;
                case "Sand":
                    var weather_jp = "砂っぽい"
                    break;
                default:
                    var weather_jp = "不明"
            }

            //HTML上のプルダウンの町名取得
            let city_en = document.getElementById("city")
            let city_index = city_en.selectedIndex
            let city_jp = city_en.options[city_index].text;

            //取得した町名・天気をHTMLに反映
            let result_weather = document.getElementById("result");
            result_weather.textContent = `${city_jp}の天気は${weather_jp}です。`;
        };
        xhr.send();
    };

    //初回レンダリング時
    getAPI();

    //プルダウンを切り替え時
    document.getElementById("city").onchange = function () { getAPI() };
});
