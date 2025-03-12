// ==UserScript==
// @name         Siena's forearm toolbox
// @namespace    https://www.bondageprojects.com/
// @version      0.3
// @description  No Description
// @author       Lorfem
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @run-at document-end
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==



setTimeout(
	function () {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://raw.githubusercontent.com/BreadDain/BC-Forearm-Toolbox/main/bcft.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
	}, 
        10000
);
