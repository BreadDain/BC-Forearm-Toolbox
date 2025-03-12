/*export const HOOK_PRIORITIES = {
  Top: 11,
  OverrideBehaviour: 10,
  ModifyBehaviourHigh: 6,
  ModifyBehaviourMedium: 5,
  ModifyBehaviourLow: 4,
  AddBehaviour: 3,
  Observe: 0,
} as const;*/

//SDK stuff
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

//import { waitFor } from "../util/utils";



(async function() {
	const BCFT_Ver = '0.4';
	const modApi = bcModSDK.registerMod({
		name: 'BCFT',
		fullName: 'Bondage Club Forearm Toolbox',
		version: BCFT_Ver,
		// Optional - Link to the source code of the mod
		repository: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	});
	
	let Lock = "";
	let Tlock = "";

	//GibMeMyWaterCell();
	//RecordMyBlacklist();
//async function GibMeMyWaterCell(){
	//await waitFor(() => !!LoginResponse)
	modApi.hookFunction('LoginResponse', 3, (args, next) => {
		const ret = next(args);
		const response = args[0];
		if (response && typeof response.Name === 'string' && typeof response.AccountName === 'string') {
			var itemfixarray = Asset.filter(x => x.InventoryID == undefined && x.Group.Category == "Item");
			for (let i = 0; i < itemfixarray.length; i++){
				InventoryAdd(Player, itemfixarray[i].Name, itemfixarray[i].Group.Name, false);
			}  
		}
		return ret;
	});
//}

//async function RecordMyBlacklist(){
	//await waitFor(() => !!ChatRoomListUpdate)
	modApi.hookFunction('ChatRoomListUpdate', 3, (args, next) => {
		const ret = next(args);
		const action = args[0];
		const adding = args[1];
		console.log("List update detected");
		if (adding == true){
			console.log("List addition detected");
			if (action === Player.GhostList||list === Player.BlackList){
				let promptedReason = prompt(getText("Blacklist Reason?"));
				if (promptedReason != null){
					recordBlame(args[2],promptedReason);
				}
			}
		}
		return ret;
	});
//}
	CommandCombine([
	    {
	        Tag: 'tbunlock',
	        Description:": unlocks all restraints with unlockable padlocks.",
	        Action: (args) => {
	            var target;
	            if (args === "") {
	                target = ChatRoomCharacter.find((x) => x.MemberNumber === Player.MemberNumber);
	            } else if (args != "") {
	                var targetnumber = parseInt(args);
	                target = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
	            }
	            if (target != ""){
	                CharacterReleaseFromLock(target, "CombinationPadlock");
	                CharacterReleaseFromLock(target, "ExclusivePadlock");
	                CharacterReleaseFromLock(target, "HighSecurityPadlock");
	                CharacterReleaseFromLock(target, "IntricatePadlock");
	                CharacterReleaseFromLock(target, "MetalPadlock");
	                CharacterReleaseFromLock(target, "MistressPadlock");
	                CharacterReleaseFromLock(target, "MistressTimerPadlock");
	                CharacterReleaseFromLock(target, "PandoraPadlock");
	                CharacterReleaseFromLock(target, "PasswordPadlock");
	                CharacterReleaseFromLock(target, "SafewordPadlock");
	                CharacterReleaseFromLock(target, "TimerPadlock");
	                CharacterReleaseFromLock(target, "TimerPasswordPadlock");
	                ChatRoomCharacterUpdate(target);
	                ChatRoomSendLocal("ZentOS: Locks removed.", 10000);
	            }
	        }
	    }])
	
	CommandCombine([
	    {
	        Tag: 'tbuntie',
	        Description:": Unties target with unlocked restraints.",
	        Action: (args) => {
	            var target;
	            if (args === "") {
	                target = ChatRoomCharacter.find((x) => x.MemberNumber === Player.MemberNumber);
	            } else if (args != "") {
	                var targetnumber = parseInt(args);
	                target = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
	            }
	            if (target != ""){
	                CharacterReleaseNoLock(target);
	                ChatRoomCharacterUpdate(target);
	                ChatRoomSendLocal("ZentOS: Restraints removed.", 10000);
	            }
	        }
	    }])
	
	CommandCombine([
	    {
	        Tag: 'tbsws',
	        Description:": Frees you from a specific item.",
	
	        Action: args => {
	            ChatRoomSendLocal(
	                `<p style='background-color:#000452;color:#EEEEEE'>Siena's toolbox:
	                <br>You have 5 seconds to click  on target, select area. If successful, will be returned. If not, retry.</p>`.replaceAll('\n', '')
	            );
	            setTimeout(function() {
	                CurrentCharacter.Appearance = CurrentCharacter.Appearance.filter(x => (CurrentCharacter.FocusGroup && CurrentCharacter.FocusGroup.Name) ? x.Asset.Group.Name !=
	                CurrentCharacter.FocusGroup.Name : true);
	                ChatRoomCharacterUpdate(CurrentCharacter);
	                DialogLeave();
	                ChatRoomSendLocal("ZentOS: Restraint on target removed.", 10000);
	            }, 5000);
	        }
	    }])
	
	CommandCombine([{
	    Tag: 'tblock',
	    Description: "(target) (locktype) (other parameters): adds locks to all lockable items on specified target.",
	    Action: (args) => {
	        if (args === "") {
	            ChatRoomSendLocal(
	                "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: The lock command has several syntaxes:\n" +
	                "/lock (target) (locktype) for locks 1 to 8 + locks 17 and 19\n" +
	                "/lock (target) (locktype) (r) for lock 9\n" +
	                "/lock (target) (locktype) (code/ptcode) for locks 10 and 20\n" +
	                "/lock (target) (locktype) (password) (r) for locks 11 and 12\n" +
	                "/lock (target) (locktype) (minutes) (h) (i) (r) for locks 13 to 15 + lock 18\n" +
	                "/lock (target) (locktype) (password) (minutes) (h) (i) (r) for lock 16\n" +
	                "ALWAYS SPECIFY THE TARGET. Lock types:\n" +
	                "1 Metal - 2 Exclusive - 3 Intricate - 4 High Security\n" +
	                "5 Pandora - 6 Mistress - 7 Lover - 8 Owner\n" +
	                "9 Five Minutes - 10 Combination - 11 Safeword\n" +
	                "12 Password - 13 Mistress Timer - 14 Lover Timer\n" +
	                "15 Owner Timer - 16 Timer Password\n" +
	                "17 Best Friend - 18 Best Friend Timer\n" +
	                "19 Family - 20 Portal Link\n" +
	                "BCTweaks is required for locks 17 and 18\n" +
	                "Use <b>/lock par</b> for info about other parameters</p>"
	            );
	        } else if (args === "par") {
	            ChatRoomSendLocal(
	                "<p style='background-color:#5fbd7a'><b>ULTRAbc</b>: Special parameters of lock command:\n" +
	                "code must be between 0 and 9999.\n" +
	                "password is limited to 8 characters.\n" +
	                "portal code must include 8 characters, using only 0-9 and a-f.\n" +
	                "maximum time = 240 minutes for locks 13 and 16,\n" +
	                "10080 minutes for locks 14, 15 and 18\n" +
	                " \n" +
	                "Optional parameters:\n" +
	                "h to hide the timer,\n" +
	                "i to enable time input from other players,\n" +
	                "r for item removal when correct password entered\n" +
	                "or lock timer runs out.\n" +
	                " \n" +
	                "Tip: replace h and/or i by another character when you need to skip them.</p>"
	            );
	        } else {
	            var silent = 0;
	            var stringLock1 = args;
	            var stringLock2 = stringLock1.split(/[ ,]+/);
	            var lk = stringLock2[1];
	            if (lk == 1) {
	                Lock = "MetalPadlock";
	            } else if (lk == 2) {
	                Lock = "ExclusivePadlock";
	            } else if (lk == 3) {
	                Lock = "IntricatePadlock";
	            } else if (lk == 4) {
	                Lock = "HighSecurityPadlock";
	            } else if (lk == 5) {
	                Lock = "PandoraPadlock";
	            } else if (lk == 6) {
	                Lock = "MistressPadlock";
	            } else if (lk == 7) {
	                Lock = "LoversPadlock";
	            } else if (lk == 8) {
	                Lock = "OwnerPadlock";
	            } else if (lk == 9) {
	                Lock = "TimerPadlock";
	                var removeitem = stringLock2[2];
	            } else if (lk == 10) {
	                Lock = "CombinationPadlock";
	                var code = stringLock2[2];
	            } else if (lk == 11) {
	                Lock = "SafewordPadlock";
	                var PS = /^[A-Z]+$/;
	                if (stringLock2[2] != null) {
	                    var pw = stringLock2[2].toUpperCase();
	                } else {
	                    var pw = "PLEASE";
	                }
	                var removeitem = stringLock2[3];
	            } else if (lk == 12) {
	                Lock = "PasswordPadlock";
	                var PS = /^[A-Z]+$/;
	                if (stringLock2[2] != null) {
	                    var pw = stringLock2[2].toUpperCase();
	                } else {
	                    var pw = "PASSWORD";
	                }
	                var removeitem = stringLock2[3];
	            } else if (lk == 13) {
	                Lock = "MistressTimerPadlock";
	                var minutes = stringLock2[2];
	                time = (minutes - 5);
	                var hidetimer = stringLock2[3];
	                var enableinput = stringLock2[4];
	                var removeitem = stringLock2[5];
	            } else if (lk == 14) {
	                Lock = "LoversTimerPadlock";
	                var minutes = stringLock2[2];
	                time = (minutes - 5);
	                var hidetimer = stringLock2[3];
	                var enableinput = stringLock2[4];
	                var removeitem = stringLock2[5];
	            } else if (lk == 15) {
	                Lock = "OwnerTimerPadlock";
	                var minutes = stringLock2[2];
	                time = (minutes - 5);
	                var hidetimer = stringLock2[3];
	                var enableinput = stringLock2[4];
	                var removeitem = stringLock2[5];
	            } else if (lk == 16) {
	                Lock = "TimerPasswordPadlock";
	                var PS = /^[A-Z]+$/;
	                if (stringLock2[2] != null) {
	                    var pw = stringLock2[2].toUpperCase();
	                } else {
	                    var pw = "PASSWORD";
	                }
	                var minutes = stringLock2[3];
	                time = (minutes - 5);
	                var hidetimer = stringLock2[4];
	                var enableinput = stringLock2[5];
	                var removeitem = stringLock2[6];
	            } else if (lk == 17) {
	                Lock = "Best Friend Padlock";
	            } else if (lk == 18) {
	                Lock = "Best Friend Timer Padlock";
	                if (stringLock2[2] == null) {
	                    var minutes = 1;
	                } else {
	                    var minutes = stringLock2[2];
	                }
	                if (minutes > 10080) {
	                    time = 100800;
	                } else {
	                    time = (minutes + 5);
	                }
	                var hidetimer = stringLock2[3];
	                var enableinput = stringLock2[4];
	                var removeitem = stringLock2[5];
	            } else if (lk == 19) {
	                Lock = "FamilyPadlock";
	            } else if (lk == 20) {
	                Lock = "PortalLinkPadlock";
	                var PTS = /^[0-9a-f]+$/;
	                var ptcode = stringLock2[2];
	            }
	            var targetname = stringLock2[0];
	            var target = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(targetname.toLowerCase())));
	            if (target[0] == null) {
	                var targetnumber = parseInt(targetname);
	                target[0] = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
	            }
	            if ((target[0] != null) && ((target[0] == Player) || (target[0].AllowItem == true)) && (target[0].OnlineSharedSettings.UBC != undefined)) {
	                if ((target[0].Nickname == '') || (target[0].Nickname == undefined)) {
	                    tgpname = target[0].Name;
	                } else {
	                    tgpname = target[0].Nickname;
	                }
	                mn = Player.MemberNumber;
	                for (let A = 0; A < target[0].Appearance.length; A++)
	                    if (target[0].Appearance[A].Asset.AllowLock == true) {
	                        if (((target[0].Appearance[A].Property != null) && (target[0].Appearance[A].Property.LockedBy == null)) || (target[0].Appearance[A].Property == null)) {
	                            if (lk != 20) {
	                                InventoryLock(target[0], target[0].Appearance[A], Lock, mn);
	                            } else {
	                                if (target[0].Appearance[A].Property.Attribute != null) {
	                                    if (target[0].Appearance[A].Property.Attribute.includes("PortalLinkLockable")) {
	                                        InventoryLock(target[0], target[0].Appearance[A], Lock, mn);
	                                    }
	                                }
	                            }
	                            if (removeitem == "r") {
	                                target[0].Appearance[A].Property.RemoveOnUnlock = true;
	                                target[0].Appearance[A].Property.RemoveItem = true;
	                            }
	                            if (minutes != null) {
	                                if (lk == 18) {
	                                    target[0].Appearance[A].Property.MaxTime = 604800;
	                                    target[0].Appearance[A].Property.RemovalTime = Math.round(CurrentTime + time * 60 * 100);
	                                } else {
	                                    target[0].Appearance[A].Property.RemoveTimer = target[0].Appearance[A].Property.RemoveTimer + (time * 60 * 1000);
	                                }
	                            }
	                            if (hidetimer == "h") {
	                                target[0].Appearance[A].Property.ShowTimer = false;
	                            }
	                            if (enableinput == "i") {
	                                target[0].Appearance[A].Property.EnableRandomInput = true;
	                            }
	                            if ((code != null) && (code > -1) && (code < 10000)) {
	                                target[0].Appearance[A].Property.CombinationNumber = code;
	                            }
	                            if ((ptcode != null) && (ptcode.length == 8) && (ptcode.match(PTS))) {
	                                target[0].Appearance[A].Property.PortalLinkCode = ptcode;
	                            }
	                            if ((pw != null) && (pw.length <= 8) && (pw.match(PS))) {
	                                target[0].Appearance[A].Property.Password = pw;
	                            }
	                            if ((lk == 17) || (lk == 18)) {
	                                target[0].Appearance[A].Property.LockedBy = "HighSecurityPadlock";
	                                target[0].Appearance[A].Property.LockPickSeed = "8,3,5,10,4,2,6,7,1,9,0,11";
	                                let listOwnerLovers = new Set();
	                                if (target[0].Ownership && target[0].Ownership.MemberNumber != null) {
	                                    listOwnerLovers.add(target[0].Ownership.MemberNumber);
	                                }
	                                if (target[0].Lovership) {
	                                    for (let L = 0; L < target[0].Lovership.length; L++) {
	                                        const lover = target[0].Lovership[L];
	                                        if (lover.MemberNumber != null)
	                                            listOwnerLovers.add(target[0].Lovership[L].MemberNumber);
	                                    }
	                                }
	                                target[0].Appearance[A].Property.MemberNumberListKeys = "-1," + Array.from(listOwnerLovers).join(",");
	                            }
	                            if (lk == 17) {
	                                target[0].Appearance[A].Property.Name = "Best Friend Padlock";
	                            }
	                            if (lk == 18) {
	                                target[0].Appearance[A].Property.Name = "Best Friend Timer Padlock";
	                            }
	                        }
	                    }
	                ChatRoomCharacterUpdate(target[0]);
	            }
	            ChatRoomSetTarget(null);
	        }
	    }
	}])
	
	CommandCombine([
	    {
	        Tag: 'tbbl',
	        Description:": lists all blacklists in current room.",
	        Action: (args) => {
	              var person;
	              var message = "ZentOS:\n";
	              for (let i = 0; i < ChatRoomData.Character.length; i++){
	                person = ChatRoomData.Character[i];
	                //console.log(person);
	                if (person.ItemPermission > 2){
	                  if (person.Nickname !== "") message += person.Nickname + "/" + person.Name;
	                            else message += person.Name;
	                  message += " is hidden with perm. wall. - blacklist is hidden.\n";
	                  continue;
	                }
	                if (person.BlackList.length > 0) {
	                  if (person.Nickname !== "") message += person.Nickname + "/" + person.Name;
	                  else message += person.Name;
	                  message += " has blacklisted: ";
	                  var victim;
	                  for (let j = 0; j < person.BlackList.length; j++){
	                    victim = ChatRoomCharacter.find((x) => x.MemberNumber === person.BlackList[j]);
			    if (victim){
		                    if (victim.Nickname !== "") message += victim.Nickname + "/" + victim.Name;
		                    else message += victim.Name;
		                    message += "(" + victim.MemberNumber + "); ";
			    }
	                  }
	                  message += "\n";
	                }
	              }
				      ChatRoomSendLocal(message, 30000);
	        }
	    }])

	CommandCombine([
	    {
	        Tag: 'tbwr',
	        Description:": Sends a remote OOC whisper to TargetID. /tbwr ID MESSAGE",
	        Action: (args) => {
			var string1 = parseInt(args.split(/[ ,]+/)[0]);
			var string2 = args.split(/[ ,]+/)[1];
			var target;
			if (!string1 || !string2 || string1 === "" || string2 === "") {
				ChatRoomSendLocal("ZentOS: Specify TargetID and Message. /tbwr ID MESSAGE", 10000);
				return;
			}else{
				target = ChatRoomCharacter.find((x) => x.MemberNumber === string1);
				string2 = `(${string2.replace(/\)/g, "\\uf130\\u005d")}`;
			}
			if (target){
				const data = ChatRoomGenerateChatRoomChatMessage("Whisper", string2);
				data.Target = target;
				ServerSend("ChatRoomChat", data);
				ChatRoomSendLocal("ZentOS: Sent remotely to "+string1+": "+string2, 0);
			}else{
				ChatRoomSendLocal("ZentOS: Target not found.", 10000);
			}
	        }
	    }])

	function formatted_date(){
		var result="";
		var d = new Date();
		result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+ d.getHours()+":"+d.getMinutes();
		return result;
	}	

	function recordBlame(ID, msg) {
		const file = new Blob(["Blacklist reason for "+ID+":\n"+msg], { type: 'text/plain' });
		link.href = URL.createObjectURL(file);
		var d = formatted_date();
		link.download = "Blacklist report "+d+" ID_"+ID+".txt";
		link.click();
		URL.revokeObjectURL(link.href);
	}
	
})();
