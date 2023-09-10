# Json File Structure
Json character files must include the following. Any item that does not include a "-->" descriptor is defined alphabetically below.
- "name"      : string       --> name 
- "acMin"     : integer      --> unarmored armor class
- "armor"     : object
- "inventory" : 2D array
- "profBonus" : int          --> proficiency bonus
- "race"      : object
- "shield"    : object
- "skills     : object array
- "scores"    : object array

### Definitions

"action" values and their meanings:
- 1 --> action
- 2 --> bonus action
- 3 --> reaction

"armor" includes:
- "name"       : string  --> name of the armor
- "armor-type" : integer
- "base-ac"    : integer --> armor class before dexterity bonus
- "max"        : integer --> maximum dexterity bonus applicable. Use -1 for no maximum

"armor-type" values and their meanings
- 0 --> light armor
- 1 --> medium armor
- 2 --> heavy armor

"asi" objects include:
- "score" : string  --> the first three letters of an ability score
- "value" : integer --> the amount by which the associated ability score is increased

"desc" objects includes:
- "short"    : string  --> abbreviated description
- "long"     : string  --> full desrciption. Can be excluded if full description is short enough to serve as an abbreviated description.
- "recharge" : string  --> short description of when the feature recharges. Can be excluded if feature uses no resources.
- "action"   : integer --> Uses action values. Can be excluded if the feature uses no action.

"grant" objects include:
- "name" : string --> proficiency name
- "type" : string --> proficiency type in four letters

"features" objects include:
- "name"  : string       --> name of the feature
- "desc"  : object array
- "grant" : object array
- "req"   : integer      --> level requirement
- "src"   : string       --> source of the feature

"inventory" objects include:
- "name"  : string  --> item name
- "count" : integer --> item count

"race" includes:
- "asi"      : object array
- "features" : object array

"saves" objects include:
- "name" : string  --> score name in three letters
- "prof" : integer --> amount by which proficiency bonus is multiplied for save

"shield" includes:
- "name" : string  --> name of the shield
- "ac"   : integer --> ac bonus

"skills" objects includes:
- "name"  : string  --> skill name in four letters
- "prof"  : integer --> amount by which proficiency bonus is multiplied for skill
- "score" : string  --> score name in three letters, representing the ability that the skill uses

"scores" objects include:
- "name"  : string  --> score name in three letters
- "value" : integer --> score value