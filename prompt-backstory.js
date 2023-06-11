// How to import local json file data to my JavaScript variable? - https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
const monstersData = require("./monsters.json")

// roll the dice (VRF Feature Chainlink) to fight the monster
// VRF Feature Chainlink will give a random value between 1 and 6
// Function to calculate the modulus of big integers
function calculateModulus(x, y) {
  // Convert the input strings to arrays of digits
  let num1 = x.split("").map(Number)
  let num2 = y.split("").map(Number)

  // Initialize variables
  let result = []
  let carry = 0

  // Perform long division
  for (let i = 0; i < num1.length; i++) {
    let digit = ((carry * 10 + num1[i]) / num2[0]) | 0
    carry = (carry * 10 + num1[i]) % num2[0]
    result.push(digit)
  }

  // Return the modulus as a string
  carry = carry + 1
  return carry.toString()
}

// Test the function
// call the deployed smart contract vrf function from
// requestRandomWords() > MetaMask > lastRequestId() > getRequestStatus() specifying the requestId
// store as string in x
let x = "77646113924834270905986252651261454755461368763224543181842455140643798236323"
let y = "6"
let modulus = calculateModulus(x, y)
console.log(modulus)
const vrf_res = 6

// the vrf_res variable corresponds to the "CR" of the monster. Look for the monster with CR = 5 in the monstersData and store it in variable monster_to_fight
const monster_to_fight = monstersData.monsters[5]

// the monster_to_fight variable corresponds to the monster that the player will fight.
const monster_to_fight_cr = monster_to_fight.CR
const monster_to_fight_name = monster_to_fight.name
const monster_to_fight_stat_block = monster_to_fight.stat_block
const monster_to_fight_description = monster_to_fight.description
const monster_to_fight_defeat_methods = monster_to_fight.defeat_methods
const monster_to_fight_catchphrase = monster_to_fight.catchphrase
const monster_to_fight_weapon = monster_to_fight.weapon

// the monster_to_fight_stat_block variable corresponds to the stat block of the monster that the player will fight.
const monster_to_fight_stat_block_hp = monster_to_fight_stat_block.HP
const monster_to_fight_stat_block_ac = monster_to_fight_stat_block.AC
const monster_to_fight_stat_block_str = monster_to_fight_stat_block.STR
const monster_to_fight_stat_block_dex = monster_to_fight_stat_block.DEX
const monster_to_fight_stat_block_con = monster_to_fight_stat_block.CON
const monster_to_fight_stat_block_int = monster_to_fight_stat_block.INT
const monster_to_fight_stat_block_wis = monster_to_fight_stat_block.WIS
const monster_to_fight_stat_block_cha = monster_to_fight_stat_block.CHA

// the monster_to_fight_defeat_methods variable corresponds to the defeat methods of the monster that the player will fight. Loop over the monster_to_fight_defeat_methods array and store them in a string variable with a 'or' between them.
const monster_to_fight_defeat_methods_string = monster_to_fight_defeat_methods.join([(separator = " or ")])

// ........................................................................................................................

// Get your character detailes from the quiz

const char_desc =
  "Banun is a level 1 bugbearian Ranger. He has a background as a circus performer and maintains a lawful neutral alignment. Banun is known for his breath-taking dexterity but is not well-regarded for his wisdom, which is very low. He prefers to use the two-handed sword in battle and likes to fight in the middle of the fray."
const my_alignment = "Lawful Neutral"
const level = "1"
const hit_point = "11"
const experience_points = "0"
const proficiency_bonus = "2"
const my_class = "Ranger"
const my_species = "Bugbear"
const my_background = "Circus Performer"
const my_monster_defeat_methods = ["Arcana", "Persuasion"]

// ........................................................................................................................

//store the common strings in the monster_to_fight_defeat_methods and my_monster_defeat_methods arrays in a array called monster_defeated_method
// if monster_to_fight_defeat_methods and my_monster_defeat_methods arrays both have "Arcana" then store it in monster_defeated_method array
// if monster_to_fight_defeat_methods and my_monster_defeat_methods arrays both have "Persuasion" then store it in monster_defeated_method array
const monster_defeated_method_list = function () {
  const monster_defeated_method = []
  for (let i = 0; i < monster_to_fight_defeat_methods.length; i++) {
    for (let j = 0; j < my_monster_defeat_methods.length; j++) {
      if (monster_to_fight_defeat_methods[i] === my_monster_defeat_methods[j]) {
        monster_defeated_method.push(monster_to_fight_defeat_methods[i])
      }
    }
  }
  return monster_defeated_method
}

// based on the length of the array monster_defeated_method_list decide how grand is the victory. For example, if the length of monster_defeated_method_list is 0 then -> you lost in the backstory and there is no quest, if length of monster_defeated_method_list is 1 then -> you won but barely survived fighting the dragon in the backstory and in the quest you need to find the monster as well as cure for your wounds, if length of monster_defeated_method_list is 2 then -> you won and you are in a good shape to fight the monster in the quest.
const grand_victory = monster_defeated_method_list().length
// if grand_victory is 0 then -> you lost in the backstory and there is no quest, if grand_victory is 1 then -> you won but barely survived fighting the dragon in the backstory and in the quest you need to find the monster as well as cure for your wounds, if grand_victory is 2 then -> you won and you are in a good shape to fight the monster in the quest.
let grand_victory_string
if (grand_victory === 0) {
  grand_victory_string = "lost from monster in the backstory and there is no quest possible"
} else if (grand_victory === 1) {
  grand_victory_string =
    "won but barely survived fighting the dragon in the backstory and in the quest the player needs to find the monster as well as a cure for wounds"
} else if (grand_victory === 2) {
  grand_victory_string = "won from monster in the backstory and is in a good shape to fight the monster in the quest"
}

// the monster_defeated_method_list variable corresponds to the defeat methods of the monster that the player will fight. Loop over the monster_defeated_method_list array and store them in a string variable with a 'or' between them.
const monster_defeated_method_list_string = monster_defeated_method_list().join([(separator = " or ")])

// ........................................................................................................................

// prompt generate
const prefixDescription = `You are a Dungeon Master from a Dungeons and Dragons game. Based on a player dice roll you assigned the player a monster named ${monster_to_fight_name}. The monster description is as follows: ${monster_to_fight_description} The monster weapon is as follows: ${monster_to_fight_weapon}.The player character description is as follows: ${char_desc} `

const prompt =
  prefixDescription +
  `Based on the player character description and all the monster information, write a short backstory in 4-5 lines as a great storyteller from Dungeons and Dragons about how player ${grand_victory_string}. Also in new paragraph write 2-3 lines about the quest based on the backstory for the player to explore further in the game.`

// ........................................................................................................................

// create a function that returns prompt
const prompt_quest = function () {
  return prompt
}

module.exports = { prompt_quest }
