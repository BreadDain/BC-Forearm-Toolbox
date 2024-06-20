// Bondage Club Mod Development Kit (1.2.0)
// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
/** @type {ModSDKGlobalAPI} */

let Lock = "";
let Tlock = "";

sdk.hookFunction('LoginResponse', 0, (args, next) => {
  next(args);

  const response = args[0];
  if (response && typeof response.Name === 'string' && typeof response.AccountName === 'string') {
    console.log(`JEJEJEJEJJEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`);
    }
  });

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
                    if (victim.Nickname !== "") message += victim.Nickname + "/" + victim.Name;
                    else message += victim.Name;
                    message += "(" + victim.MemberNumber + "); ";
                  }
                  message += "\n";
                }
              }
			      ChatRoomSendLocal(message, 30000);
        }
    }])
