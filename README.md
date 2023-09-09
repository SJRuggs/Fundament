# Fundament
D&amp;D Character Sheet

# Roadmap:
- Establish json file structure
- Import files to page
- Build Character Sheet
- Find out how to write to json

### Notes
- Everything must have a 'source' to display to user on hover

### Things that are constant:
- Senses
- Race
- Hp Maximum
- Hit Die Record
- Ability Scores
- Original Ability Scores
- Ability Score Increases
- Skill proficiencies
- Saving throw proficiencies
- Active Features
- Passive Features

### Things that are calculable
- Armor Class
- Skill mods
- Saving Throw mods
- Speed
- Ability Score Modifiers
- Attacks
- DCs

### Things that change:
- Armor
- Current Hit Points
- Hit Dice
- Resources
- Inventory
- Spell List
- Spell Slots

# Json File Structure
Json character files must include the following. Any item that does not include a "-->" descriptor is defined alphabetically below.
" "name"      : string        --> the character's name 
- "inventory" : 2D array
- "race"      : object
- "scores"    : integer array --> ordered ability scores before increases

### Definitions

"action" values and their meanings:
- 0 --> actionless
- 1 --> free action
- 2 --> reaction
- 3 --> bonus action
- 4 --> action

"asi" inner arrays include:
- string --> the first three letters of an ability score
- int    --> the amount by which the associated ability score is increased

"desc" objects includes:
- "short"    : string --> abbreviated description.
- "long"     : string --> full desrciption
- "recharge" : string --> description of when the feature recharges
- "action"   : int

"inventory" inner arrays include:
- string --> item name
- int    --> item count

"features" inner objects include:
- name : string       --> name of the feature
- desc : object array
- src  : string       --> source of the feature

"race" includes:
- "asi"      : 2D array.
- "features" : object array