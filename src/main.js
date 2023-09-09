import util from "./utils.js";

const init = (data) => 
{
    util.setupTooltip();
    updateSheet(data);




    





}

// fetch character information then start program
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));

const updateSheet = (data) =>
{
    console.log(`imported ${data.name} character`);
    document.querySelector("#title").innerHTML = data.name;
    updateScores(data);








}

const updateScores = (data) =>
{
    // scores
    data.scores.forEach((score) =>
    {
        document.querySelector(`#${score.name}-score`).innerHTML = score.value;
        document.querySelector(`#${score.name}-mod`).innerHTML = util.modStr(util.modInt(score.value));
    });

    // saves
    data.saves.forEach((save) =>
    {
        // ability modifier
        let bonus = util.modInt(data.scores.find((score) => score.name == save.name).value);

        // add proficiency bonus if applicable
        bonus += data.profBonus * save.prof;

        // add positive sign if applicable
        bonus = util.modStr(bonus);

        // apply to sheet
        document.querySelector(`#${save.name}-saves`).innerHTML = bonus
    });

    // skills
    data.skills.forEach((skill) =>
    {
        // ability modifier
        let bonus = util.modInt(data.scores.find((score) => score.name == skill.score).value);

        // add proficiency bonus if applicable
        bonus += data.profBonus * skill.prof;

        // add positive sign if applicable
        bonus = util.modStr(bonus);

        // apply to sheet
        document.querySelector(`#${skill.name}`).innerHTML = bonus;
    });
    
}