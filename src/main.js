import setupTooltip from "./utils.js";

const init = data => 
{
    setupTooltip();
    setupCharacterSheet(data);











}

// fetch character information
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));

const setupCharacterSheet = data =>
{
    document.querySelector("#title").innerHTML = data.name;
}