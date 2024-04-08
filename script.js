let multiplier = 1;
let clicks = 0;

let upgrades = {
 'harvester': {
  upgrade: 1,
  cost: 10,
  has: 0,
  type: 1
 },
 'marketer': {
  upgrade: 2,
  cost: 50,
  has: 0,
  type: 1
 },
 'manager': {
  upgrade: 4,
  cost: 225,
  has: 0,
  type: 1
 },
 'factory': {
  upgrade: 8,
  cost: 1000,
  has: 0,
  type: 2
 },
 'industry': {
  upgrade: 14,
  cost: 7500,
  has: 0,
  type: 2
 },
}

function update() {
 document.getElementById('clcs').textContent = 'ORANGES: ' + clicks;
 document.getElementById('cpc').textContent = 'ORANGES PER CLICK: ' + 1 * multiplier;
 const data = {
  upgrades: upgrades,
  multiplier: multiplier,
  oranges: clicks
 }
 localStorage.setItem('data', JSON.stringify(data))
}

function loadUpgrade() {
 for (const upgrade in upgrades) {
  if (upgrades[upgrade].type == 1) {
   document.getElementById(upgrade).innerHTML = 'HIRE AN ' + upgrade.toUpperCase() + '-' + upgrades[upgrade].cost + '|' + upgrades[upgrade].has + " <img style='width: 80px; height: auto;' src='icons/" + upgrade.toLowerCase() + ".png'>";
  } else if (upgrades[upgrade].type == 2) {
   document.getElementById(upgrade).innerHTML = 'BUY A ' + upgrade.toUpperCase() + '-' + upgrades[upgrade].cost + '|' + upgrades[upgrade].has + " <img style='width: 80px; height: auto;' src='icons/" + upgrade.toLowerCase() + ".png'>";
  }
 }
}

function orange() {
 clicks += 1 * multiplier;
 document.getElementById('orng').style = 'width: 250px; height: 250px; transform: scaleX(-1);';
 setTimeout(function(){
  document.getElementById('orng').style = 'width: 200px; height: 200px;';
 }, 150)
 update();
}

function upgrade(upgrade) {
 if (upgrade in upgrades) {
  if (clicks >= upgrades[upgrade].cost) {
   multiplier += upgrades[upgrade].upgrade;
   upgrades[upgrade].has += 1;
   clicks -= upgrades[upgrade].cost;
   upgrades[upgrade].cost = Math.floor(1.5 * upgrades[upgrade].cost);
   if (upgrades[upgrade].type == 1) {
    document.getElementById(upgrade).innerHTML = 'HIRE AN ' + upgrade.toUpperCase() + '-' + upgrades[upgrade].cost + '|' + upgrades[upgrade].has + " <img style='width: 80px; height: auto;' src='icons/" + upgrade.toLowerCase() + ".png'>";
   } else if (upgrades[upgrade].type == 2) {
    document.getElementById(upgrade).innerHTML = 'BUY A ' + upgrade.toUpperCase() + '-' + upgrades[upgrade].cost + '|' + upgrades[upgrade].has + " <img style='width: 80px; height: auto;' src='icons/" + upgrade.toLowerCase() + ".png'>";
   }
   update();
  }
 }
}

function resetData() {
 upgrades = {
  'harvester': {
   upgrade: 1,
   cost: 10,
   has: 0,
   type: 1
  },
  'marketer': {
   upgrade: 2,
   cost: 50,
   has: 0,
   type: 1
  },
  'manager': {
   upgrade: 4,
   cost: 225,
   has: 0,
   type: 1
  },
  'factory': {
   upgrade: 8,
   cost: 1000,
   has: 0,
   type: 2
  },
  'industry': {
   upgrade: 14,
   cost: 7500,
   has: 0,
   type: 2
  },
 }
 multiplier = 1
 clicks = 0
 update()
}

window.onload = function() {
 const data = JSON.parse(localStorage.getItem('data'))
 if (data) {
  upgrades = data["upgrades"]
  multiplier = data["multiplier"]
  clicks = data["oranges"]
 }
 update()
 loadUpgrade()
}