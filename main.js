window.addEventListener("load", () => {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, async (tabs) => {
        let url = tabs[0].url;
        const resp = await fetch("https://url-shortener-service.p.rapidapi.com/shorten", {
            headers: {
                "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
                "X-RapidAPI-Key": "461ca06f56msha4cfbc8fe132165p13b29djsnb942d4ff1575",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `url=${url}`
        });
        const { result_url } = await resp.json();
        const input = document.getElementById("url");
        input.value = result_url;
        input.select();
        document.execCommand("copy");
        new QRCode(document.getElementById("qrcode"), {
            text: result_url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        document.querySelector(".alert").style = "display:none";
    });
})