// ==UserScript==
// @name         YouTube
// @match        https://www.youtube.com/watch?*
// @match        https://gaming.youtube.com/watch?*
// @grant        none
// ==/UserScript==

(function()
	{
	var counter = 0;
	function changeSpeed()
		{
		var speed = document.getElementById("speedBox").value;
		if (document.getElementsByClassName('html5-main-video'))
			{
			document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
			document.getElementsByClassName('html5-main-video')[0].focus();
			}
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
	function pipEvent()
		{
		if (document.getElementsByClassName('html5-main-video'))
			{
			document.getElementsByClassName('html5-main-video')[0].requestPictureInPicture();
			}
		}
	function addSpeedButton(searchBox)
		{
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
				//pause();
				changeSpeed();
				if (document.getElementsByClassName('html5-main-video'))
					{
					document.getElementsByClassName('html5-main-video')[0].addEventListener("play", changeSpeed);
					}
				}, 500);
			
			var pipButton = document.createElement("button");
			pipButton.id = "pipButton";
			pipButton.innerText = "PiP";
			pipButton.addEventListener("click", pipEvent);
			searchBox.insertBefore(pipButton, searchBox.firstChild);
			}
		}
	function waitToLoad()
		{
		window.setTimeout(function()
			{
			var searchBox;
			if (document.getElementById("secondary"))
				{
				searchBox = document.getElementById("secondary");
				if (isRendered(searchBox) != true)
					{
					if (document.getElementById("primary"))
						searchBox = document.getElementById("primary");
					}
				}
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
function isRendered(domObj) 
	{
	if ((domObj.nodeType != 1) || (domObj == document.body))
		return true;
	if (domObj.currentStyle && domObj.currentStyle["display"] != "none" && domObj.currentStyle["visibility"] != "hidden")
		return isRendered(domObj.parentNode);
	else if (window.getComputedStyle)
		{
		var cs = document.defaultView.getComputedStyle(domObj, null);
		if (cs.getPropertyValue("display") != "none" && cs.getPropertyValue("visibility") != "hidden")
			return isRendered(domObj.parentNode);
		}
	return false;
	}
waitToLoad();
})();
