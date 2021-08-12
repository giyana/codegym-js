document.addEventListener("DOMContentLoaded", function () {
    //API取得~HTML書込まで一連の動作
    const wholeOparation = function () {
        const xhr = new XMLHttpRequest();
        const url = getWeatherApi();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            const dataJson = this.response;
            const data = JSON.parse(dataJson);
            const weatherEn = data.weather[0].main;
            const weatherText = sharpData(weatherEn);
            editHtml(weatherText);
        };
        xhr.send();
    };

    //APIへの問い合わせ
    const getWeatherApi = function () {
        //指定されたプルダウンの値を取得
        const cityName = document.querySelector("#city").value;
        //APIへの問い合わせURLを生成
        const appId = "4b5774e9f3d2a07b84f0f2f88e486224";
        const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appId}`;
        return queryUrl;
    };

    //日本語の天候・町名を取得（公式ドキュメントの全天候網羅済）
    const sharpData = function (weatherEn) {
        //日本語の天候を取得
        const weatherTrans = {
            "Clouds": "曇り",
            "Clear": "晴天",
            "Snow": "雪",
            "Rain": "雨",
            "Tornado": "竜巻",
            "Squall": "スコール",
            "Thunderstorm": "雷雨",
            "Drizzle": "霧雨",
            "Mist": "霧",
            "Smoke": "煙っぽい",
            "Haze": "煙霧",
            "Fog": "濃霧",
            "Ash": "降灰",
            "Dust": "砂塵",
            "Sand": "砂っぽい",
            "": "不明"
        };
        const weatherJp = weatherTrans[weatherEn];
        //日本語の町名取得
        const cityEn = document.getElementById("city")
        const cityIndex = cityEn.selectedIndex
        const cityJp = cityEn.options[cityIndex].text;
        return `${cityJp}の天気は${weatherJp}です。`;
    };

    //取得した町名・天気をHTMLに反映
    const editHtml = function (weatherText) {
        const resultWeather = document.getElementById("result");
        resultWeather.textContent = weatherText;
    };

    //初回レンダリング時
    wholeOparation();

    //プルダウンを切り替え時
    document.getElementById("city").onchange = function () { wholeOparation() };
});
