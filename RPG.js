`use strict`
let playerName = prompt('Hello player welcome to 👣 100 STEPS 👣 what should we call you?')
let LVL = 1;
//let dexterity = 5;
let maxxpmultiplier = 1;
let defence = 5;
let armorbonus = 0;
let weaponbonus = 0;
let strenght = 5;
let Anger = 5;
let deffocus = 0;
let charge = 0;
let maxStage = 100;
let maxHP =(LVL * 100) + (defence * 6);
let HP = 130;
let maxRAGE = 100;
let RAGE = 0;
let rageGain = (Anger * 2) + LVL;
let SP = 5;
let eqweapon = ['Fists'];
let eqarmour = ['Dirty Rags'];
let weaponclass = 0;
let armorclass = 0;
let mobstr = 0;
let mobdef = 0;
let mobhp = 0;
let mobdmg = 0;
let playerdmg = ((LVL + strenght)* 3)+weaponbonus;//RAGEged
let xp = 0;
let xpmultiplier;
let maxxx = 100;
let maxxp = LVL * 130;
let stage = 0;
let mobmaxhp;
let mobs = ['Skeleton','Zombie','Ghoul','Banshee','Imp','Hellhound','Slime'];
let bosses = ['Dragon','Vampyre','Cerberus','Griffon','Manticore'];
let rewards = ['Health Serum','RAGE Serum','Bronze Sword', 'Bronze Armour', 'Steel Sword','Steel Armour', 'Diamond Sword','Diamond Armor', 'Health Serum','RAGE Serum','Health Serum','RAGE Serum','Health Serum','RAGE Serum','Health Serum','RAGE Serum']
let traps = ['Damage'];
let inventory = ['Health Serum','RAGE Serum'];
let flee = [true,false,false,true,false,true,false,true];
let outcomes = [mobs,bosses,rewards,traps,mobs,mobs];
let occurence = null;
let descision = null;
let fledornot;
mainGame();
function mainGame(){
    
    alert(`Hello ${playerName} welcome to 100 steps lets get familiar with the game and how to play it`);
    alert(`This game will be played only by text you input in the prompt window and you can refer to help by putting !help in the prompt window any time during the game`);
    alert(`Your goal is to survive the 100 steps and try not to die`);
    alert(`Goodluck :D`)
    for ( HP; HP > 0; HP){
        let input=prompt(`
        ${playerName}'s stats: 💉${HP.toFixed()}/${maxHP.toFixed()}HP 💢${RAGE.toFixed()}/${maxRAGE.toFixed()}RAGE
        🎗️LVL : ${LVL} | 🎓XP: ${xp.toFixed()}/${maxxp.toFixed()} | ✨Skillpoints : ${SP}
        💢${Anger.toFixed()} Anger | 🛡️${defence.toFixed()} Defence | 💪${strenght.toFixed()} Strenght
        ⚔️Weapon : ${eqweapon} | Damage bonus :(${weaponbonus})
        🪖Armour : ${eqarmour} | Armour bonus :(${armorbonus})
        👣Steps Left : ${maxStage - stage}
        
        What will you do next? (!help for commands)`);
        randomArray();
        switch (input) {        
            case  '!help':
                alert(`     
                !str - To spend a skillpoint on Strenght
                !def - To spend a skill point on Defence
                !anger - To spend a skill point on Anger
                !heal - To use a Health Serum.
                !enrage - To use a Rage Serum.
                !inventory - To check your inventory.
                !step - To step.`)
                break;
            case '!heal':
                healme();
                break;
                case '!enrage':
                    enrageme();
                    break;
            case '!inventory':                   
                alert(`${inventory}`);
                break;
            case '!dex':
            if(SP>0){dexterity++
            SP--}else{
                alert(`No skillpoints left!`)
            }
            break;
            case '!str':
                if(SP>0){
                    strenght++ 
                    playerdmg = ((LVL + strenght)* 3)+weaponbonus;
                    SP--
                }else{
                    alert(`No skillpoints left!`)
                }
                break;
            case '!def':
                if(SP>0){
                    defence++
                    maxHP = 100 + (defence * 6);
                    HP += 6;
                    SP--
                }else{
                    alert(`No skillpoints left!`)
                }
                break;
            case '!anger':
                if(SP>0){
                    Anger++
                    SP--
                }else{
                    alert(`No skillpoints left!`)
                }
                break;
            case '!step':
                stage++;
                if(occurence === mobs){
                    fleeorfight();
                }else if(occurence === bosses){
                    alert(`⚠️You've encountered a boss : ${descision} you must fight for your life!`)
                    fightmob();
                }else if(occurence === rewards){
                    rewardsmanager();
                }else if(occurence === traps){
                    alert(`🪤You've encountered a trap and you take ${maxHP * 0.1} ${descision}!`)
                    HP -= maxHP * 0.1;
                }
            }
        }
    }
    
    function fleeorfight(){//dialog before fighting a common enemy or running from it
    generatemobstats();
        fightdialog1=prompt(`You've encountered a ${descision} !fight - to fight !run - to attempt an escape`)
        if(fightdialog1==='!fight'){
            fightmob();
        }else if(fightdialog1==='!run'){
            fleeorno();
        }else{
            alert(`Invalid command.`)
            fleeorfight();
        }

}

function generatemobstats(multiplier){//generates the enemy stats according to the given formula "multiplier"
    mobdef = 1 * multiplier
    mobhp = 20 * multiplier
    mobmaxhp = 20 * multiplier
    mobstr = 1 * multiplier
    mobdmg = (mobstr + LVL) * 2;
    if(occurence === bosses){
        mobhp = 60 * multiplier;
        mobmaxhp = 60 * multiplier;
    }
}
function fightmob(){//main combat manager
    let multiplier = LVL * 1;
    if (occurence === bosses) {
        multiplier = LVL * 2
    }else{

    }
    generatemobstats(multiplier);
    for (mobhp; mobhp>0 && HP>0;mobhp){
        fightdialog=prompt(`${descision} : DEF : ${mobdef.toFixed()} STR : ${mobstr.toFixed()} HP : ${mobhp.toFixed()}/${mobmaxhp.toFixed()}
        
        ${playerName} : DEF : ${defence} STR : ${strenght} HP : ${HP.toFixed()}/${maxHP.toFixed()} RAGE : ${RAGE}/${maxRAGE}
        
        🤺!attack(Basic attack)
        🛡️!block(Block for one turn and gain double rage) 
        ⏳!chargeattack(Charge for two turns and deal a massive blow)
        💥!ultimate(Consume all your rage to unleash a deadly blow)`)
    if(fightdialog==='!attack'){
    alert(`You swing your ${eqweapon} at the ${descision} and deal ${(playerdmg-mobdef).toFixed()} damage.`)
    mobhp -= (playerdmg-mobdef);
    rageManager();
    if(mobhp >0 && HP>0){
        alert(`The ${descision} retaliates and hits you for ${mobdmg-armorbonus.toFixed()} DAMAGE`);
        HP -= (mobdmg-armorbonus);
    }else if(mobhp<=0 && HP>0){
    mobdead();
}else if(mobhp>0 && HP<=0){
    alert(`You are dead. Killed by : ${descision}`)
}
    }else if(fightdialog==='!block'){
        alert(`As you block you feel extremely focused for your next attack`);
        let blockefficiency = (mobdmg - defence - armorbonus)
        rageManager();
        rageManager();
        alert(`The ${descision} attacks , you successfully block some of the damage and get hit for ${blockefficiency.toFixed()} DAMAGE`);
        if(blockefficiency > 0){
            HP -= blockefficiency;
        }else{
            alert(`Thanks to your armour and defence level you blocked all incoming damage.`)
        }
    }else if(fightdialog==='!chargeattack'){//manages the charge attack.
        alert(`You channel your energy to your ${eqweapon}.`)
        rageManager();
        rageManager();
        if(mobhp >0 && HP>0){
            alert(`Meanwhile the ${descision} strikes you twice for${((mobdmg-armorbonus)*2).toFixed()} DAMAGE`);
            HP -= ((mobdmg-armorbonus)*2);
            alert(`You retaliate with your ${eqweapon} for ${((playerdmg-mobdef)*3).toFixed()} Damage`);
            mobhp -= (playerdmg-mobdef) * 3;
            if(mobhp>0 && HP>0){
                alert(`That was one hell of a blow!`)
            }else{
                alert(`That was one hell of a blow!`)
                mobdead();
            }
        }else if(mobhp<=0 && HP>0){
        mobdead();
    }else if(mobhp>0 && HP<=0){
        alert(`You are dead. Killed by : ${descision}`)
    }

    }else if(fightdialog==='!ultimate'){//manages the ultimate attack
        if(RAGE==100){
            alert(`You gather all your rage and swing your ${eqweapon} fiercely at the ${descision} and deal ${((playerdmg-mobdef) * 6).toFixed()} damage.`)
            mobhp-= ((playerdmg-mobdef) * 6);
            RAGE = 0;
            if(mobhp<=0){
                mobdead();
            }
        }else{
            alert(`Not enough RAGE!`)
        }
    }else if(fightdialog==='!heal'){
        healme();
    }else if(fightdialog==='!enrage'){
        enrageme();
    }
    else{
        alert('invalid command!')
    }
}
}
function fleeorno(){//randomly picks a boolean from an array , so we can decide if the player can run away or not.
    fledornot = flee[Math.floor(Math.random() * flee.length)];
    // fledornot = true ? null : fightmob();
    if(fledornot === true){
        alert('You ran away successfuly 5 steps penalty applied')
        stage -= 5;
    }else{
        alert('You could not manage to escape this time , prepare to fight!')
        fightmob();
    }
}
function xpgain(){//calculates how much XP the player should get for current kill
    xpmultiplier = mobmaxhp * 2.3;
}
function mobdead(){ //After an enemy is dead calls a function to give player XP and check if the player has leveled up.
    if(mobhp<=0){
        xpgain();
        alert(`You killed ${descision} and get ${xpmultiplier} XP`);
        xp += xpmultiplier;
        mobhp = 0;
        levelManager();
    }
}

function levelManager(){ //Manages player level.(executed after a player kills something.)
    if(xp>=maxxp){
        xp-=maxxp
        LVL++;
        maxHP =(LVL * 100) + (defence * 6);
        HP = maxHP;
        maxxpmultiplier += 0.3
        maxxp = LVL * 130 * maxxpmultiplier;
        SP += 1;
        alert(`Congratulations ${playerName} you have advanced to level ${LVL} and have gained 1 Skillpoints.`)
    }
}

function rageManager(){ // manages rage
    if(RAGE < maxRAGE && RAGE != 100){
        RAGE += (Anger * 2);
        if(RAGE >= 100){
            RAGE = 100;
        }
    }
    
}
function randomArray(){//picks a random array , and than picks a random index from that array to randomize the next outcome of the step the player takes.
 occurence = outcomes[Math.floor(Math.random() * outcomes.length)];   
 descision = occurence[Math.floor(Math.random() * occurence.length)];
}

function movetoinventory(){ //Move the item we found from rewards array to inventory array
    let index = rewards.indexOf(descision);
    alert(`You put the ${descision} inside your inventory.`)
        rewards.splice(index, 1);
        inventory.push(descision);
}

function equipitem(){ //Equip the item we just got (called from main  game function)
    let index = rewards.indexOf(descision);
    alert(`You pick up the ${descision} it might come in handy!`)
        rewards.splice(index, 1);
        eqweapon.length = 0;
        eqweapon.indexOf(descision) === -1 ? eqweapon.push(descision) : null;
}

function equiparmour(){ //Equip the armor we just found (called from main game function)
    let index = rewards.indexOf(descision);
    alert(`You equip the${descision} gotta protect those assets.`)
        rewards.splice(index, 1);
        eqarmour.length = 0;
        eqarmour.indexOf(descision) === -1 ? eqarmour.push(descision) : null;
}

function discarditem(){ //A function to be executed if the found item is of a lower grade than currently equipped item.
    let index = rewards.indexOf(descision);
        rewards.splice(index, 1);
        alert(`You have a better item equipped , this ${descision} will be of no use. 
        You leave it behind...`)
}

function healme(){//consumes a health potion to heal the player if hp is below max hp and there is a potion avail
    let index = inventory.indexOf('Health Serum');
    if(index>-1 && HP<maxHP){
        inventory.splice(index,1);
        HP += 100;
        alert(`You consume the health serum!`)
        if(HP>maxHP){
            HP = maxHP;
        }
        }else if(index>-1 && HP == maxHP){
            alert(`It seems like you are already at full health, that would be a waste...`)
        }else{
            alert(`You reach out in your inventory for a serum but it seems there are none...`)
        }
}

function enrageme(){//consumes a rage potion to enrage the player if rage is below 100 and there is a potion at hand
    let index2 = inventory.indexOf('RAGE Serum');
    if(index2>-1 && RAGE<maxRAGE){
        inventory.splice(index2,1);
        RAGE += 100;
        alert(`You consume the rage serum!`)
        if(RAGE>maxRAGE){
            RAGE = maxRAGE;
        }
        }else if(index2>-1 && RAGE == maxRAGE){
            alert(`It seems like you are already at full rage, that would be a waste...`)
        }else{
            alert(`You reach out in your inventory for a serum but it seems there are none...`)
        }
}

function rewardsmanager(){//manages and decides what to do with rewards found from rewards array.
    alert(`💰You've found a Chest and in it you find a ${descision}!`)
                    if(descision === 'Bronze Sword' && weaponclass < 1){
                        equipitem();
                        alert(`You equip the ${descision}`);
                        weaponbonus = 3;
                        weaponclass = 1;
                        playerdmg = ((LVL + strenght)* 3)+weaponbonus;
                    }else if(descision === 'Bronze Sword' && weaponclass >=1){
                        discarditem();
                    }else if(descision === 'Steel Sword' && weaponclass < 3){
                        equipitem();
                        alert(`You equip the ${descision}`);
                        weaponbonus = 6;
                        weaponclass = 2;
                        playerdmg = ((LVL + strenght)* 3)+weaponbonus;
                    }else if(descision === 'Steel Sword' && weaponclass == 3){
                        discarditem();
                    }else if(descision === 'Diamond Sword'){
                        equipitem();
                        alert(`You equip the ${descision}`);
                        weaponbonus = 11;
                        weaponclass = 3;
                        playerdmg = ((LVL + strenght)* 3)+weaponbonus;
                    }else if(descision === 'Bronze Armour' && armorclass <1){
                        equiparmour();
                        alert(`You equip the ${descision}`);
                        armorbonus = 3;
                        armorclass = 1;
                    }else if(descision === 'Bronze Armour' && armorclass >=1){
                        discarditem();
                    }else if(descision === 'Steel Armour' && armorclass < 3){
                        equiparmour();
                        alert(`You equip the ${descision}`);
                        armorbonus = 6;
                        armorclass = 2;
                    }else if(descision === 'Steel Armour' && armorclass == 3){
                        discarditem();
                    }else if(descision === 'Diamond Armour'){
                        equiparmour();
                        alert(`You equip the ${descision}`);
                        armorbonus = 11;
                        armorclass = 3;
                    }else{
                        alert(`You pick up the ${descision} it might come in handy..`)
                        movetoinventory();
                    }
}