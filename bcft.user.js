// ==UserScript==
// @name         Siena's forearm toolbox
// @namespace    https://www.bondageprojects.com/
// @version      1.0
// @description  No Description
// @author       Siena
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bondage-europe.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    
    javascript:void function(){function httpGet(a){var b=new XMLHttpRequest;return b.open("GET",a,!1),b.send(null),b.responseText}var code=httpGet("https://raw.githubusercontent.com/BreadDain/BC-Forearm-Toolbox/main/bcft.js");const script=document.createElement("script");script.type="text/javascript",script.innerHTML=code,document.head.appendChild(script),eval(script)}();
})();
