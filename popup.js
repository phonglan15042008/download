(function () {
	var stopAsking = (localStorage["qv_.stopAsking"] === "true");
	var sendLink = function (url, title, index) {
		chrome.tabs.create({
			url: "https://kuturl.com/bookmarklet/?api=f4432356d53887971b7ae95830d81211bc99b2da&url=" + encodeURIComponent(url),
			index: index
		});
		window.close();
	}

	var isLinkhayPage = function(url){
		return (url.toLowerCase().indexOf("://linkhay.com") >= 0);
	}

	chrome.tabs.query({
		active: true, currentWindow: true
	}, function (tabs) {
		var url = tabs[0].url,
			index = tabs[0].index + 1,
			title = tabs[0].title,
			isLH = !!isLinkhayPage(url);
		if (!isLH && stopAsking) {
			sendLink(url, title, index);
		} else {
			document.getElementById("url").textContent = url;
			document.getElementById("stopAskingWrap").style.display = (isLH ? "none" : "block");
			document.getElementById("sendLink").addEventListener('click', function () {
				if (!isLH) {
					localStorage["qv_.stopAsking"] = !!document.getElementById("stopAsking").checked;
				}
				sendLink(url, title, index);;
			});
		}
	});

})();
