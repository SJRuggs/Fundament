import setupTooltip from "./utils.js";

const init = data => 
{
    setupTooltip();
    updateSheet(data);











}

// fetch character information then start program
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));

const updateSheet = data =>
{
    console.log(`imported ${data.name} character`);
    document.querySelector("#title").innerHTML = data.name;
    updateScores(data);


    








}

const updateScores = data =>
{
    
}