# Fundament
D&amp;D Character Sheet

# Json File Structure
Json character files must include the following. Any item that does not include a "-->" descriptor is defined alphabetically below.
- "name"      : string       --> name 
- "acMin"     : integer      --> unarmored armor class
- "armor"     : object
- "inventory" : 2D array
- "profBonus" : int          --> proficiency bonus
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

"armor" includes:
- "name"       : string  --> name of the armor
- "armor-type" : integer
- "base-ac"    : integer --> armor class before dexterity bonus
- "max-dex"    : integer --> maximum dexterity bonus applicable. Use -1 for no maximum
- "armor" can be left undefined if the character is not wearing armor.

"armor-type" values and their meanings
- 0 --> light armor
- 1 --> medium armor
- 2 --> heavy armor

"asi" objects include:
- score : string  --> the first three letters of an ability score
- value : integer --> the amount by which the associated ability score is increased

"desc" objects includes:
- "short"    : string --> abbreviated description.
- "long"     : string --> full desrciption
- "recharge" : string --> description of when the feature recharges
- "action"   : integer

"inventory" objects include:
- name  : string  --> item name
- count : integer --> item count

"features" objects include:
- name : string       --> name of the feature
- desc : object array
- src  : string       --> source of the feature

"saves" objects includes:
- name : string  --> score name in three letters
- prof : integer --> amount by which proficiency bonus is multiplied for save

"skills" objects includes:
- name  : string  --> skill name in four letters
- prof  : integer --> amount by which proficiency bonus is multiplied for skill
- score : string  --> score name in three letters, representing the ability that the skill uses

"race" includes:
- "asi"      : object array
- "features" : object array

"scores" objects include:
- name  : string  --> score name in three letters
- value : integer --> score value