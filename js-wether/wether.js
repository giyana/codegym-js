document.addEventListener("DOMContentLoaded", function () {
    //指定されたプルダウンの値を取得
    const cityName = document.querySelector("#city").value

    //APIへの問い合わせ～HTML反映まで
    const getAPI = function () {
        //APIへの問い合わせURLを生成
        const appId = "4b5774e9f3d2a07b84f0f2f88e486224";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appId}`;

        //天気情報を取得＆HTMLに反映
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            const dataJson = this.response;
            const data = JSON.parse(dataJson);
            const weatherEn = data.weather[0].main;

            //天候状況を日本語に翻訳（公式ドキュメントの全天候網羅済）
            switch (weatherEn) {
                case "Clouds":
                    var weatherJp = "曇り";
                    break;
                case "Clear":
                    var weatherJp = "晴天"
                    break;
                case "Snow":
                    var weatherJp = "雪"
                    break;
                case "Rain":
                    var weatherJp = "雨"
                    break;
                case "Tornado":
                    var weatherJp = "竜巻"
                    break;
                case "Squall":
                    var weatherJp = "スコール"
                    break;
                case "Thunderstorm":
                    var weatherJp = "雷雨"
                    break;
                case "Drizzle":
                    var weatherJp = "霧雨"
                    break;
                case "Mist":
                    var weatherJp = "霧"
                    break;
                case "Smoke":
                    var weatherJp = "煙っぽい"
                    break;
                case "Haze":
                    var weatherJp = "煙霧"
                    break;
                case "Fog":
                    var weatherJp = "濃霧"
                    break;
                case "Ash":
                    var weatherJp = "降灰"
                    break;
                case "Dust":
                    var weatherJp = "砂塵"
                    break;
                case "Sand":
                    var weatherJp = "砂っぽい"
                    break;
                default:
                    var weatherJp = "不明"
            }

            //HTML上のプルダウンの町名取得
            const cityEn = document.getElementById("city")
            const cityIndex = cityEn.selectedIndex
            const cityJp = cityEn.options[cityIndex].text;

            //取得した町名・天気をHTMLに反映
            const resultWeather = document.getElementById("result");
            resultWeather.textContent = `${cityJp}の天気は${weatherJp}です。`;
        };
        xhr.send();
    };

    //初回レンダリング時
    getAPI();

    //プルダウンを切り替え時
    document.getElementById("city").onchange = function () { getAPI() };
});
