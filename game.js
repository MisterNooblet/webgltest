let dialogueStage = 1;
let playerName;
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
let maxHP = LVL * 100 + defence * 6;
let HP = 130;
let maxRAGE = 100;
let RAGE = 0;
let rageGain = Anger * 2 + LVL;
let SP = 5;
let eqweapon = ['Fists'];
let eqarmour = ['Dirty Rags'];
let weaponclass = 0;
let armorclass = 0;
let mobstr = 0;
let mobdef = 0;
let mobhp = 0;
let mobdmg = 0;
let playerdmg = (LVL + strenght) * 3 + weaponbonus; //RAGEged
let xp = 0;
let xpmultiplier;
let maxxx = 100;
let maxxp = LVL * 130;
let stage = 0;
let mobmaxhp;
let mobs = [
  'Skeleton',
  'Zombie',
  'Ghoul',
  'Banshee',
  'Imp',
  'Hellhound',
  'Slime',
];
let bosses = ['Dragon', 'Vampyre', 'Cerberus', 'Griffon', 'Manticore'];
let rewards = [
  'Health Serum',
  'RAGE Serum',
  'Bronze Sword',
  'Bronze Armour',
  'Steel Sword',
  'Steel Armour',
  'Diamond Sword',
  'Diamond Armor',
  'Health Serum',
  'RAGE Serum',
  'Health Serum',
  'RAGE Serum',
  'Health Serum',
  'RAGE Serum',
  'Health Serum',
  'RAGE Serum',
];
let traps = ['Damage'];
let inventory = ['Health Serum', 'RAGE Serum'];
let flee = [true, false, false, true, false, true, false, true];
let outcomes = [mobs, bosses, rewards, traps, mobs, mobs];
let occurence = null;
let descision = null;
let fledornot;
let rageserums = 1;
let healthserums = 1;
document
  .querySelector('#dialoguebutton')
  .addEventListener('click', function () {
    switch (dialogueStage) {
      case 1:
        document.querySelector(
          '#mainGameBox'
        ).textContent = `You dont remember how you got here, all you can feel is a severe headache...`;
        dialogueStage += 1;
        break;
      case 2:
        document.querySelector('#mainGameBox').textContent =
          'You stroke your head to find a huge bump from a blunt object...';
        dialogueStage += 1;
        break;
      case 3:
        document.querySelector('#mainGameBox').textContent =
          'You get up feeling dizzy and you see a note attached to a tree nearby..';
        dialogueStage += 1;
        break;
      case 4:
        document.querySelector('#mainGameBox').textContent =
          'You get closer to the note and read it carefully...';
        dialogueStage += 1;
        break;
      case 5:
        document.querySelector('#mainGameBox').textContent =
          'Through the forests, through the trees, step a hundred to be free';
        dialogueStage += 1;
        break;
      case 6:
        document.querySelector('#mainGameBox').textContent =
          'There are monsters yet to see, you shold walk so carefully..';
        dialogueStage += 1;
        break;
      case 7:
        document.querySelector('#mainGameBox').textContent =
          'You hear a voice from deep within the forest whispering "What is your name?"';
        dialogueStage += 1;
        document.getElementById('playernamefield').style.display = 'inline';
        break;
      case 8:
        playerName = document.querySelector('#darkfield').value;
        document.querySelector(
          '#mainGameBox'
        ).textContent = `The voice replies goodluck ${playerName} with a slight laugh`;
        document.querySelector('#playerNameDisplay').textContent = playerName;
        dialogueStage += 1;
        document.getElementById('playernamefield').style.display = 'none';
        break;
      case 9:
        document.querySelector('#mainGameBox').textContent =
          'Press the step button when ever youre ready to begin your journey. Youve got 100 steps to survive. GOODLUCK!';
        dialogueStage += 1;
        document.getElementById('dialoguebutton').style.display = 'none';
        document.getElementById('stepbutton').style.display = 'inline';

        break;
      case 10:
        break;
      default:
        break;
    }

    // let input = document.querySelector('#darkfield').value;
    // console.log(input);
    // document.querySelector('#playerNameDisplay').textContent = input;
    // document.querySelector('#rageButton').disabled = true;
    // document.getElementById('rageButton').style.visibility = 'hidden';
  });
document.querySelector('#stepbutton').addEventListener('click', function () {
  randomArray();
  switch (occurence) {
    case mobs:
      generatemob();
      fleeorfight();
      break;
    case bosses:
      generatemob();
      document.querySelector(
        '#mainGameBox'
      ).textContent = `Youve encountered a BOSS : ${descision}
            Fight for your life! And goodluck ${playerName}`;
      document.getElementById('fleebuttons').style.display = 'none';
      document.getElementById('stepbutton').style.display = 'none';
      document.getElementById('attackbutton').style.display = 'inline';
      document.getElementById('blockbutton').style.display = 'inline';
      document.getElementById('chargebutton').style.display = 'inline';
      document.getElementById('ultimatebutton').style.display = 'inline';
      document.getElementById('mobstatsbox').style.display = 'inline';
      maxStage -= 1;
      document.getElementById(
        'stepbutton'
      ).textContent = `Step... (${maxStage})`;
      break;
    case rewards:
      rewardsmanager();
      maxStage -= 1;
      document.getElementById(
        'stepbutton'
      ).textContent = `Step... (${maxStage})`;
      if (maxStage === 0) {
        alert('You win! You may continue or refresh to restart :D');
      }
      break;
    case traps:
      HP -= maxHP * 0.1;
      document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
      document.querySelector(
        '#mainGameBox'
      ).textContent = `Youve encountered a trap you take ${
        maxHP * 0.1
      } Damage!`;
      maxStage -= 1;
      document.getElementById(
        'stepbutton'
      ).textContent = `Step... (${maxStage})`;
      if (maxStage === 0) {
        alert('You win! You may continue or refresh to restart :D');
      }
  }
});

document.querySelector('#rageButton').addEventListener('click', function () {
  if (rageserums > 0 && RAGE < maxRAGE) {
    RAGE += 101;
    rageserums -= 1;
    document.querySelector(
      '#mainGameBox'
    ).textContent = `You consume the rage serum!`;
    document.querySelector('#playerRage').textContent = `100/${maxRAGE}`;
    if (RAGE > maxRAGE && rageserums != 0) {
      RAGE = maxRAGE;
      document.getElementById('rageamount').textContent = ` ${rageserums} `;
    } else if (RAGE > maxRAGE && rageserums === 0) RAGE = maxRAGE;
    document.getElementById('rageamount').textContent = ` ${rageserums} `;
  } else if (rageserums > 0 && RAGE == maxRAGE) {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `It seems like you are already at full rage, that would be a waste...`;
  } else if (rageserums === 0) {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `Too bad , but your out of Rage Serums :(`;
  }
});

document.querySelector('#healButton').addEventListener('click', function () {
  if (healthserums > 0 && HP < maxHP) {
    HP += 100;
    healthserums -= 1;
    document.querySelector(
      '#mainGameBox'
    ).textContent = `You consume the health serum!`;
    document.getElementById('healthamount').textContent = ` ${healthserums} `;
    document.querySelector('#healthtext').textContent = `${HP}/${maxHP}`;
    if (HP > maxHP && healthserums != 0) {
      HP = maxHP;
      document.getElementById('healthamount').textContent = ` ${healthserums} `;
      document.querySelector('#healthtext').textContent = `${HP}/${maxHP}`;
    } else if (HP > maxHP && healthserums === 0) {
      HP = maxHP;
      document.getElementById('healthamount').textContent = ` ${healthserums} `;
      document.querySelector('#healthtext').textContent = `${HP}/${maxHP}`;
    }
  } else if (healthserums > 0 && HP == maxHP) {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `It seems like you are already at full health, that would be a waste...`;
  } else if (healthserums === 0) {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `Too bad , but your out of Health Serums :(`;
  }
});

document.querySelector('#fleebutton').addEventListener('click', function () {
  fledornot = flee[Math.floor(Math.random() * flee.length)];
  // fledornot = true ? null : fightmob();
  if (fledornot === true) {
    document.querySelector('#mainGameBox').textContent =
      'You ran away successfuly 5 steps penalty applied';
    maxStage += 5;
    document.getElementById('stepbutton').textContent = `Step... (${maxStage})`;
    document.getElementById('stepbutton').style.display = 'inline';
    document.getElementById('fleebuttons').style.display = 'none';
  } else {
    document.querySelector('#mainGameBox').textContent =
      'You could not manage to escape this time , fight for your life!';
    document.getElementById('fleebuttons').style.display = 'none';
    document.getElementById('attackbutton').style.display = 'inline';
    document.getElementById('blockbutton').style.display = 'inline';
    document.getElementById('chargebutton').style.display = 'inline';
    document.getElementById('ultimatebutton').style.display = 'inline';
    document.getElementById('mobstatsbox').style.display = 'inline';
    maxStage -= 1;
    document.getElementById('stepbutton').textContent = `Step... (${maxStage})`;
  }
});
//////////////////////////////

document.querySelector('#fightbutton').addEventListener('click', function () {
  document.querySelector(
    '#mainGameBox'
  ).textContent = `Fight for your life! And goodluck ${playerName}`;
  document.getElementById('fleebuttons').style.display = 'none';
  document.getElementById('attackbutton').style.display = 'inline';
  document.getElementById('blockbutton').style.display = 'inline';
  document.getElementById('chargebutton').style.display = 'inline';
  document.getElementById('ultimatebutton').style.display = 'inline';
  document.getElementById('mobstatsbox').style.display = 'inline';
  maxStage -= 1;
  document.getElementById('stepbutton').textContent = `Step... (${maxStage})`;
});

function randomArray() {
  //picks a random array , and than picks a random index from that array to randomize the next outcome of the step the player takes.
  occurence = outcomes[Math.floor(Math.random() * outcomes.length)];
  descision = occurence[Math.floor(Math.random() * occurence.length)];
  if (occurence === mobs || occurence === bosses) {
    document.getElementById('mobname').textContent = descision;
  }
}
function fleeorfight() {
  document.getElementById('stepbutton').style.display = 'none';
  document.getElementById('fleebuttons').style.display = 'inline';
  document.querySelector(
    '#mainGameBox'
  ).textContent = `Youve encountered a ${descision} will you fight or attempt to run away?`;
}

document.getElementById('ragebutton').addEventListener('click', function () {
  if (SP > 0) {
    Anger++;
    SP--;
    document.getElementById('Anger').textContent = Anger;
    document.getElementById('playerSP').textContent = SP;
    if (SP == 0) {
      hidespbuttons();
    }
  }
});

document.getElementById('defbutton').addEventListener('click', function () {
  if (SP > 0) {
    defence++;
    SP--;
    maxHP += 6;
    HP += 6;
    document.getElementById('defence').textContent = defence;
    document.getElementById('playerSP').textContent = SP;
    document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
    if (SP == 0) {
      hidespbuttons();
    }
  }
});

document.getElementById('strbutton').addEventListener('click', function () {
  if (SP > 0) {
    strenght++;
    SP--;
    playerdmg = (LVL + strenght) * 3 + weaponbonus;
    document.getElementById('strenghttext').textContent = strenght;
    document.getElementById('playerSP').textContent = SP;
    if (SP == 0) {
      hidespbuttons();
    }
  }
});

document.getElementById('attackbutton').addEventListener('click', function () {
  mobhp -= playerdmg - mobdef;
  document.getElementById(
    'mobhp'
  ).textContent = `Health : ${mobhp}/${mobmaxhp}`;
  rageManager();
  if (mobhp > 0 && HP > 0) {
    setTimeout(() => {}, 1000);
    document.getElementById(
      'mainGameBox'
    ).textContent = `You swing your ${eqweapon} at the ${descision} and deal ${(
      playerdmg - mobdef
    ).toFixed()} damage.
    The ${descision} retaliates and hits you for ${
      mobdmg - armorbonus.toFixed()
    } DAMAGE`;
    HP -= mobdmg - armorbonus;
    document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
  } else if (mobhp <= 0 && HP > 0) {
    mobdead();
  } else {
    alert(`YOU ARE DEAD. KILLED BY ${descision}`);
    location.reload();
  }
});

document.getElementById('blockbutton').addEventListener('click', function () {
  let blockefficiency = mobdmg - defence - armorbonus;
  rageManager();
  rageManager();
  document.getElementById(
    'mainGameBox'
  ).textContent = `The ${descision} attacks , you successfully block some of the damage and get hit for ${blockefficiency.toFixed()} DAMAGE`;
  HP -= blockefficiency;
  if (blockefficiency > 0 && HP > 0) {
    document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
  } else if (HP <= 0) {
    alert(`YOU ARE DEAD. KILLED BY ${descision}`);
    location.reload();
  } else {
    document.getElementById(
      'mainGameBox'
    ).textContent = `Thanks to your armour and defence level you blocked all incoming damage.`;
  }
});

document.getElementById('chargebutton').addEventListener('click', function () {
  rageManager();
  rageManager();
  if (mobhp > 0 && HP > 0) {
    document.getElementById(
      'mainGameBox'
    ).textContent = `You channel all your energy to your ${eqweapon}. Meanwhile the ${descision} strikes you twice for ${(
      (mobdmg - armorbonus) *
      2
    ).toFixed()} DAMAGE. You retaliate with your ${eqweapon} for ${(
      (playerdmg - mobdef) *
      3
    ).toFixed()} Damage`;
    HP -= (mobdmg - armorbonus) * 2;
    mobhp -= (playerdmg - mobdef) * 3;
    document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
    if (mobhp > 0 && HP > 0) {
      document.getElementById(
        'mobhp'
      ).textContent = `Health : ${mobhp}/${mobmaxhp}`;
    } else {
      mobdead();
    }
  } else if (mobhp <= 0 && HP > 0) {
    mobdead();
  } else if (mobhp > 0 && HP <= 0) {
    alert(`You are dead. Killed by : ${descision}`);
    location.reload();
  }
});

document
  .getElementById('ultimatebutton')
  .addEventListener('click', function () {
    if (RAGE == 100) {
      mobhp -= (playerdmg - mobdef) * 6;
      RAGE = 0;
      document.getElementById('playerRage').textContent = `${RAGE}/100`;
      if (mobhp <= 0) {
        mobdead();
      } else if (mobhp > 0 && HP > 0) {
        document.getElementById(
          'mainGameBox'
        ).textContent = `You gather all your rage and swing your ${eqweapon} fiercely at the ${descision} and deal ${(
          (playerdmg - mobdef) *
          6
        ).toFixed()} damage. The ${descision} retaliates and hits you for ${
          mobdmg - armorbonus.toFixed()
        } DAMAGE`;
        HP -= mobdmg - armorbonus;
        document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
        document.getElementById(
          'mobhp'
        ).textContent = `Health : ${mobhp}/${mobmaxhp}`;
        if (HP <= 0) {
          alert(`YOU ARE DEAD. KILLED BY ${descision}`);
          location.reload();
        }
      }
    } else {
      document.getElementById('mainGameBox').textContent = `Not enough RAGE!`;
    }
  });

function hidespbuttons() {
  document.getElementById('ragebutton').style.display = 'none';
  document.getElementById('strbutton').style.display = 'none';
  document.getElementById('defbutton').style.display = 'none';
}

function rewardsmanager() {
  //manages and decides what to do with rewards found from rewards array.
  document.querySelector(
    '#mainGameBox'
  ).textContent = `💰You've found a Chest and in it you find a ${descision}!`;
  if (descision === 'Bronze Sword' && weaponclass < 1) {
    weaponbonus = 3;
    weaponclass = 1;
    playerdmg = (LVL + strenght) * 3 + weaponbonus;
    equipitem();
  } else if (descision === 'Bronze Sword' && weaponclass >= 1) {
    discarditem();
  } else if (descision === 'Steel Sword' && weaponclass < 3) {
    weaponbonus = 6;
    weaponclass = 2;
    playerdmg = (LVL + strenght) * 3 + weaponbonus;
    equipitem();
  } else if (descision === 'Steel Sword' && weaponclass == 3) {
    discarditem();
  } else if (descision === 'Diamond Sword') {
    weaponbonus = 11;
    weaponclass = 3;
    playerdmg = (LVL + strenght) * 3 + weaponbonus;
    equipitem();
  } else if (descision === 'Bronze Armour' && armorclass < 1) {
    armorbonus = 3;
    armorclass = 1;
    equiparmour();
  } else if (descision === 'Bronze Armour' && armorclass >= 1) {
    discarditem();
  } else if (descision === 'Steel Armour' && armorclass < 3) {
    armorbonus = 6;
    armorclass = 2;
    equiparmour();
  } else if (descision === 'Steel Armour' && armorclass == 3) {
    discarditem();
  } else if (descision === 'Diamond Armour') {
    armorbonus = 11;
    armorclass = 3;
    equiparmour();
  } else if (descision === 'Health Serum') {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `💰You've found a Chest and in it you find a ${descision}!
      You pick up the ${descision} it might come in handy!`;
    healthserums += 1;
    document.getElementById('healthamount').textContent = ` ${healthserums} `;
    movetoinventory();
  } else if (descision === 'RAGE Serum') {
    document.querySelector(
      '#mainGameBox'
    ).textContent = `💰You've found a Chest and in it you find a ${descision}!
      You pick up the ${descision} it might come in handy!`;
    rageserums += 1;
    document.getElementById('rageamount').textContent = ` ${rageserums} `;
    movetoinventory();
  }
}

function equipitem() {
  //Equip the item we just got (called from main  game function)
  let index = rewards.indexOf(descision);
  document.querySelector(
    '#mainGameBox'
  ).textContent = `💰You've found a Chest and in it you find a ${descision}!
  You pick up the ${descision} it might come in handy!`;
  rewards.splice(index, 1);
  eqweapon.length = 0;
  eqweapon.indexOf(descision) === -1 ? eqweapon.push(descision) : null;
  document.getElementById(
    'playerWeapon'
  ).textContent = `${eqweapon} (${weaponbonus})`;
}

function equiparmour() {
  //Equip the armor we just found (called from main game function)
  let index = rewards.indexOf(descision);
  document.querySelector(
    '#mainGameBox'
  ).textContent = `You equip the ${descision} gotta protect those assets.`;
  rewards.splice(index, 1);
  eqarmour.length = 0;
  eqarmour.indexOf(descision) === -1 ? eqarmour.push(descision) : null;
  document.getElementById(
    'playerArmor'
  ).textContent = `${eqarmour} (${armorbonus})`;
}

function discarditem() {
  //A function to be executed if the found item is of a lower grade than currently equipped item.
  let index = rewards.indexOf(descision);
  rewards.splice(index, 1);
  document.querySelector(
    '#mainGameBox'
  ).textContent = `You have a better item equipped , this ${descision} will be of no use. 
        You leave it behind...`;
}

function generatemob() {
  mobdef = 1 * LVL;
  document.getElementById('mobdef').textContent = `Defence : ${mobdef}`;
  mobhp = 20 * LVL;
  mobmaxhp = 20 * LVL;
  document.getElementById(
    'mobhp'
  ).textContent = `Health : ${mobhp}/${mobmaxhp}`;
  mobstr = 1 * LVL;
  document.getElementById('mobstr').textContent = `Strength : ${mobstr}`;
  mobdmg = (mobstr + LVL) * 2;
  if (occurence === bosses) {
    mobhp = 60 * LVL * 2;
    mobmaxhp = 60 * LVL * 2;
    document.getElementById(
      'mobhp'
    ).textContent = `Health : ${mobhp}/${mobmaxhp}`;
  }
}

function rageManager() {
  // manages rage
  if (RAGE < maxRAGE && RAGE != 100) {
    RAGE += Anger * 2;
    document.getElementById('playerRage').textContent = `${RAGE}/100`;
    if (RAGE >= 100) {
      RAGE = 100;
      document.getElementById('playerRage').textContent = `${RAGE}/100`;
    }
  }
}
function xpgain() {
  //calculates how much XP the player should get for current kill
  xpmultiplier = mobmaxhp * 2.3;
}
function mobdead() {
  //After an enemy is dead calls a function to give player XP and check if the player has leveled up.
  if (mobhp <= 0) {
    xpgain();
    xp += xpmultiplier;
    document.getElementById('xpprogress').value = xp;
    document.getElementById('xpprogress').max = maxxp;
    mobhp = 0;
    document.querySelector(
      '#mainGameBox'
    ).textContent = `You have defeated the ${descision} and gain ${xpmultiplier} XP`;
    document.getElementById('fleebuttons').style.display = 'none';
    document.getElementById('attackbutton').style.display = 'none';
    document.getElementById('blockbutton').style.display = 'none';
    document.getElementById('chargebutton').style.display = 'none';
    document.getElementById('ultimatebutton').style.display = 'none';
    document.getElementById('mobstatsbox').style.display = 'none';
    document.getElementById('stepbutton').style.display = 'inline   ';
    levelManager();
    if (maxStage === 0) {
      alert('You win! You may continue or refresh to restart :D');
    }
  }
}

function levelManager() {
  //Manages player level.(executed after a player kills something.)
  if (xp >= maxxp) {
    xp -= maxxp;
    LVL++;
    maxHP = LVL * 100 + defence * 6;
    HP = maxHP;
    maxxpmultiplier += 0.3;
    maxxp = LVL * 130 * maxxpmultiplier;
    SP += 1;
    document.getElementById('ragebutton').style.display = 'inline';
    document.getElementById('strbutton').style.display = 'inline';
    document.getElementById('defbutton').style.display = 'inline';
    document.getElementById('playerSP').textContent = SP;
    document.getElementById('healthtext').textContent = `${HP}/${maxHP}`;
    document.getElementById('xpprogress').value = xp;
    document.getElementById('xpprogress').max = maxxp;
    document.getElementById('playerLevel').textContent = `LVL ${LVL}`;
    document.getElementById(
      'mainGameBox'
    ).textContent = `Congratulations ${playerName} you have advanced to level ${LVL} and have gained 1 Skillpoints.`;
  }
}
