// ==UserScript==
// @name         Siena's forearm toolbox
// @namespace    https://www.bondageprojects.com/
// @version      0.4
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
    () => {
        const n = document.createElement("script");
        n.type = "text/javascript";
        n.crossOrigin = "anonymous";
        n.src = `https://breaddain.github.io/BC-Forearm-Toolbox/main/bcft.js?_=${Date.now()}`;
        document.head.appendChild(n);
    },
    2000,
);
