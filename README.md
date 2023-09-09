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
- "name"      : string       --> the character's name 
- "inventory" : 2D array
- "profBonus" : int          --> the character's proficiency bonus
- "race"      : object
- "skills     : object array
- "scores"    : object array

### Definitions

"action" values and their meanings:
- 0 --> actionless
- 1 --> free action
- 2 --> reaction
- 3 --> bonus action
- 4 --> action

"asi" objects include:
- score : string --> the first three letters of an ability score
- value : int    --> the amount by which the associated ability score is increased

"desc" objects includes:
- "short"    : string --> abbreviated description.
- "long"     : string --> full desrciption
- "recharge" : string --> description of when the feature recharges
- "action"   : int

"inventory" objects include:
- name  : string --> item name
- count : int    --> item count

"features" objects include:
- name : string       --> name of the feature
- desc : object array
- src  : string       --> source of the feature

"saves" objects includes:
- name : string --> score name in three letters
- prof : int    --> amount by which proficiency bonus is multiplied for save

"skills" objects includes:
- name  : string --> skill name in four letters
- prof  : int    --> amount by which proficiency bonus is multiplied for skill
- score : string --> score name in three letters, representing the ability that the skill uses

"race" includes:
- "asi"      : object array
- "features" : object array

"scores" objects include:
- name  : string --> score name in three letters
- value : int    --> score value