// ==UserScript==
// @name			feedly
// @description		Format feedly site
// @grant			GM_addStyle
// @include			https://feedly.com/*
// @run-at          document-start
// ==/UserScript==

// javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://JarodJ.github.io/UserScripts/Feedly.user.js';})();

(function() {
	if (typeof GM_addStyle != "function")
		{
		GM_addStyle = function(css)
			{
			var style = document.createElement("style");
			style.type = "text/css";
			style.appendChild(document.createTextNode(css));
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0)
				heads[0].appendChild(style);
			else
				document.documentElement.appendChild(style);
			};
		}
	GM_addStyle(
		".col-xl-3.xlarge-only { display: none !important; }" + /* remove ride side bar */
		".col-xl-9, .fx .entry.u4 .title { width: 100% !important; }" + /* enlarge main column and titles */
		".u100Entry, .entryBody, .u4Entry, .fx .entry.u4 { max-width: none !important; }" + /* OLD WAY let stories in main column enlarge */
		"#searchPromo { display: none !important; }" + /* remove annoying add blocking search results */
        "#searchBarFX button.pro, .fx .button-share-to-team, #searchBarFX .feedly-logo, button[title='Share with teammates'], button[title='Create Team Newsletter'] { display: none !important; }" + /* remove update button, team button, icon */
		".fx .container {margin-left: 100px !important }" + /* slide stories closer to left side */
		//".fx .inlineFrame.selected > div { margin-right: -30px !important; margin-left: -30px !important; }" + /* remove grey border on selected story from being marked read */
		".inlineFrame .u100Entry { margin-left: 10px !important; margin-right: 10px !imortant; }" + /* indent text off margin slightly */
		".fx .entry.u4, .fx .entry.u4.selected, .fx .entry.u5.selected { border: none !important; border-bottom: solid 1px grey !important; }" + /* add boder between stories in list and remove border from selected story */
		".fx .entry.u4 .summary { max-height: none !important; }" + /* let more of the summary for articles show in the main list */
        ".fx .row { margin-top: -50px !important; }" + /* move source title higher */
		"#feedlyFrame, .entryBody, .unread, .selectedEntry, .inlineFrame, .entryholder, #floatingBar, .inlineFrame .title.read, #feedlyTitleBar, .entryBody td, .entryBody h3, .entryBody h2, #mainBarFX, .magOverview, .floatingEntryScroller, .fx .entry.u4 .title, .entryBody h4, .subscriptionContentsHolder, .empty, .nonEmpty, .h2Link, .preferencesItemDescription, .preferencesPanel label, .preferencesItemLabel, .entryBody .summary b, .entryBody .content b, .u100Frame .entryBody h1, .inlineFrame .entryBody h1, #searchBarFX, #headerBarFX, #feedlyPageFX,.fx h1, #herculePanel, .fx .item-header, .fx-item-header, #feedlyPageHolderFX { background-color: #2A2B2F !important; color: rgba( 255, 255, 255, 0.85 ) !important; }" + /* change background dark and text light */
		".headerInfo, .pageAction { background-color: rgb(90,90,90) !important; }" + /*change background around buttons slightly lighter dark color so buttons show up */
		"#maxHerculeInput { color: black !important; }" + /* change search bar text to black */
		".fx .entry.read .title { color: #888888 !important; }" + /* make read articles titles greyed out */
        "#tagList  { display: none !important; }" + /* remove boards section on left sidebar */
        "div[data-matching-uri='forms/createPersonalCollection']  { display: none !important; }" + /* remove create new feed on left sidebar */
        ".leftnav-open .fixed-bar { position: relative !important; left: 0 !important; }" + /* stop search bar from floating on top of screen */
		'.entryholder .content a *, .entryBody a * { color: deepskyblue !important; }' + /* make dark blue links lighter */
		//".read { background: rgba( 255, 255, 255, .05 ) !important; }" + /* make read articles greyed out background */
		//"#feedlyPage, #feedlyPart, .u4Entry .marginMaker { width: 100% !important; }" + /* OLD OLD WAY enlarge main column */
		//"#mainBar { width: 85% !important; }" + /* OLD WAY enlarge main column */
		//"#feedlyPage, #feedlyPart { width: 100% !important; }" + /*OLD WAY  enlarge main column */
		//".fx .entry.u4 { max-width: none !important; }" + /* let stories in main column enlarge */
		//"#sideArea { display: none !important; }" + /* OLD WAY remove ride side bar */
		"");
})();
