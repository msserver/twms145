/** 
 * @author: Eric
 * @npc Tylus: Warrior 3rd Job Advancement
 * @map: El Nath: Chief's Residence (211000001)
 * @func: Partial GMS-like 3rd Job Advancement & Protect Tylus El Nath PQ
*/

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 1) {
		cm.sendOk("Make up your mind and visit me again.");
		cm.dispose();
		return;
    }
    if (mode == 1)
		status++;
    else
		status--;
    if (status == 0) {
		cm.sendSimple("Can I help you?#b\r\n#L1#I would like to leave now to protect you."); //#L0#Please allow me to do the Zakum Dungeon Quest.\r\n
	} else if (status == 1) {
		if (selection == 0) {
			cm.sendOk("Permission #ggranted#k."); // match gms's system here lol
			cm.dispose();
		} else if (selection == 1) {
			if (cm.getQuestStatus(6192) == 0 || cm.getQuestStatus(6192) == 1) {
				if (cm.getParty() != null) {
					var ddz = cm.getEventManager("ProtectTylus");
					if (ddz == null) {
						cm.sendOk("Please report a #enull Event Instance#n to a #rGame Master#k.");
						cm.dispose();
					} else {
						var prop = ddz.getProperty("state");
						if (prop == null || prop.equals("0")) {
							ddz.startInstance(cm.getParty(), cm.getMap(), cm.getPlayer().getAveragePartyLevel());
						} else {
							cm.sendOk("Someone else is already trying to protect Tylus, please try again in a bit.");
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("Please form a party in order to protect Tylus!");
					cm.dispose();
				}
			} else if ((cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 2110) && cm.getQuestStatus(6192) == 2) {
				cm.sendOk("You have protected me. Thank you. I will teach you stance skill.");
				if (cm.getJob() == 112) {
					if (cm.getPlayer().getMasterLevel(1121002) <= 0) {
						cm.teachSkill(1121002, 0, 10);
					}
				} else if (cm.getJob() == 122) {
					if (cm.getPlayer().getMasterLevel(1221002) <= 0) {
						cm.teachSkill(1221002, 0, 10);
					}
				} else if (cm.getJob() == 132) {
					if (cm.getPlayer().getMasterLevel(1321002) <= 0) {
						cm.teachSkill(1321002, 0, 10);
					}
				}
			}
		} else {
			cm.dispose();
		}
    } else if (status == 2) {
	    if (cm.getPlayerStat("LVL") >= 70 && cm.getPlayerStat("RSP") <= (cm.getPlayerStat("LVL") - 70) * 3) {
			if (cm.getJob() == 110) { // FIGHTER
				cm.changeJob(111); // CRUSADER
				cm.sendOk("You are now a #bCrusader#k.");
				cm.dispose();
			} else if (cm.getJob() == 120) { // PAGE
				cm.changeJob(121); // WHITEKNIHT
				cm.sendOk("You are now a #bWhite Knight#k.");
				cm.dispose();
			} else if (cm.getJob() == 130) { // SPEARMAN
				cm.changeJob(131); // DRAGONKNIGHT
				cm.sendOk("You are now a #bDragon Knight#k");
				cm.dispose();
			} else if (cm.getJob() == 2110) { // ARAN
				cm.changeJob(2111); // ARAN
				if (cm.canHold(1142131,1)) {
					cm.forceCompleteQuest(29926);
					cm.gainItem(1142131,1); //temp fix
				}
				cm.sendOk("You are now a #bAran#k.");
				cm.dispose();
			}
	    } else {
			cm.sendOk("Come back when you are level 70 and used SP.");
			cm.dispose();
	    }
    }
	/*if ((cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 2110 ) && cm.getPlayerStat("LVL") >= 70) {
	    if (cm.getPlayerStat("RSP") > (cm.getPlayerStat("LVL") - 70) * 3) {
	        if (cm.getPlayer().getAllSkillLevels() > cm.getPlayerStat("LVL") * 3) { //player used too much SP means they have assigned to their skills.. conflict
		    cm.sendOk("It appears that you have a great number of SP yet you have used enough SP on your skills already. Your SP has been reset. #ePlease talk to me again to make the job advancement.#n");
		    cm.getPlayer().resetSP((cm.getPlayerStat("LVL") - 70) * 3);
	        } else {
	    	    cm.sendOk("Hmm...You have too many #bSP#k. You can't make the job advancement with too many SP left.");
	        }
		cm.safeDispose();
	    } else {
	        cm.sendNext("You are indeed a strong one.");
	    }
	} else {
	    cm.sendOk("Please make sure that you are eligible for the job advancement. (level 70+)");
	    cm.safeDispose();
	}*/
}