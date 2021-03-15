// ==UserScript==
// @name         YouTube
// @match        https://www.youtube.com/watch?*
// @match        https://gaming.youtube.com/watch?*
// @grant        none
// ==/UserScript==
alert("running");
alert("running 5");
(function()
	{
	var counter = 0;
	function changeSpeed()
		{
			alert("speed");
		var speed = document.getElementById("speedBox").value;
		alert(speed);
		if (document.getElementsByClassName('html5-main-video'))
			document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
		alert("changed speed");
		}
	function pause()
		{
		if (document.getElementsByClassName('html5-main-video'))
			{
			document.getElementsByClassName('html5-main-video')[0].pause();
			if (document.getElementsByClassName('html5-main-video')[0].playbackRate != document.getElementById("speedBox").value)
				changeSpeed();
			}
		else
			{
			window.setTimeout(function()
				{
				pause();
				}, 1000);
			}
		}
	function addSpeedButton(searchBox)
		{
			alert("add speed");
		if (!document.getElementById("speedBox"))
			{
			var speedLabel = document.createElement("div");
			speedLabel.id = "speedLabel";
			speedLabel.innerText = "Speed";
			speedLabel.setAttribute("style", "font-size: 25px; font-weight: bold; margin: 25px; color: white; display: inline;");
// 			searchBox.appendChild(speedLabel);
			var speedBox = document.createElement("select");
			speedBox.id = "speedBox";
			speedBox.setAttribute("style", "height: 30px; margin: 20px;");
// 			searchBox.appendChild(speedBox);
			searchBox.insertBefore(speedBox, searchBox.firstChild);
			searchBox.insertBefore(speedLabel, searchBox.firstChild);
			var speeds = ["1","1.25","1.5","1.75", "2", "2", "2.25", "2.5", "2.75", "3", "3.5", "4", "4.5", "5"];
			for (var i = 0; i < speeds.length; i++)
				{
				var option = document.createElement("option");
				option.value = speeds[i];
				option.text = speeds[i];
				speedBox.appendChild(option);
				}
			document.getElementById("speedBox").addEventListener("change", changeSpeed);
			document.getElementById("speedBox").selectedIndex = 4;
			window.setTimeout(function()
				{
					alert("added speed");
				//pause();
				changeSpeed();
				}, 500);
			}
		}
	function waitToLoad()
		{
			alert("wait 1");
		window.setTimeout(function()
			{
				alert("after timeout");
			var searchBox;
			if (document.getElementById("secondary"))
				searchBox = document.getElementById("secondary");
			else if (document.getElementById("search"))
				searchBox = document.getElementById("search");
			else if (document.getElementById("search-container"))
				searchBox = document.getElementById("search-container");
			else if (document.querySelector('[section-identifier="related-items"]'))
				searchBox = document.querySelector('[section-identifier="related-items"]');
			else
				{
				/*
				counter += 1;
				if (counter <= 15)
					waitToLoad();
				else
					searchBox = document.body;
				*/
				searchBox = document.body;
				alert("searchBox not found");
				}
			if (searchBox)
					addSpeedButton(searchBox);
			}, 500);
		}
/*
	function handleVisibilityChange()
    	{
		if (!document.getElementById("speedBox"))
			waitToLoad();
    	}
	if (document.hidden == false)
		waitToLoad();
	else
		document.addEventListener("visibilitychange", handleVisibilityChange, false);
*/
alert("wait");
waitToLoad();
})();
