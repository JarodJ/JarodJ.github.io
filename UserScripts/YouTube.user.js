// ==UserScript==
// @name         YouTube
// @match        https://www.youtube.com/watch?*
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
			try
				{
				document.getElementsByClassName('html5-main-video')[0].requestPictureInPicture();
				}
			catch(err)
				{
				alert("error starting pip");
				}
			}
		}
	function addSpeedButton(searchBox)
		{
		// console.log("adding");
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
			// console.log("added");
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
			// else if (document.getElementById("search"))
				// searchBox = document.getElementById("search");
			// else if (document.getElementById("search-container"))
				// searchBox = document.getElementById("search-container");
			// else if (document.querySelector('[section-identifier="related-items"]'))
				// searchBox = document.querySelector('[section-identifier="related-items"]');
			else
				{
				counter += 1;
				if (counter <= 15)
					waitToLoad();
				else
					searchBox = document.body;
				// searchBox = document.body;
				}
			if (searchBox)
				{
				// console.log(searchBox);
				addSpeedButton(searchBox);
                setResolution()
				makeVideoFixedPos();
				}
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
function makeVideoFixedPos()
	{
	if (document.getElementById("player-theater-container"))
		{
		if ((document.getElementById("player-theater-container").offsetHeight > 0) && (document.getElementById("player-theater-container").offsetHeight < (window.innerHeight / 1.5)))
			{
			document.getElementById("player-theater-container").style.position = "fixed";
			document.getElementById("player-theater-container").style.zIndex = "1000";
			if (document.getElementById("columns"))
				document.getElementById("columns").style.marginTop = "575px";
			}
		else
			{
			document.getElementById("player-theater-container").style.position = "relative";
			if (document.getElementById("columns"))
				document.getElementById("columns").style.marginTop = "0";
			}
		}
	}
function setResolution()
    {
    if ((document.getElementsByClassName("html5-video-player")) && (document.getElementsByClassName("html5-video-player")[0].wrappedJSObject))
        {
        // const resolutions = ['highres', 'hd2880', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny'];
        // const heights = [4320, 2880, 2160, 1440, 1080, 720, 480, 360, 270, 270];
        // var availableResolutions = document.getElementsByClassName("html5-video-player")[0].wrappedJSObject.getAvailableQualityLevels();
        var quality = "large"
        var currentQuality = document.getElementsByClassName("html5-video-player")[0].wrappedJSObject.getPlaybackQuality();
        if ((currentQuality != "") && (currentQuality != quality))
            document.getElementsByClassName("html5-video-player")[0].wrappedJSObject.setPlaybackQualityRange(quality);
        }
    }
// console.log("running");
waitToLoad();
})();
