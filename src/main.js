import util from "./utils.js";

let defaultUpdate = [];
let update = [];
let data;
let records = {};

const init = (json) => 
{
    data = json;

    util.setupTooltip();
    setupSettings();

    // setup default update
    defaultUpdate = [updateTitle, updateScores, updateAC];

    updateSheet(data);

}

// fetch character information then start program
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));

const setupSettings = () =>
{
    // setup dark mode toggle
    let darkMode = document.querySelector("#dark-mode-toggle");
    darkMode.onclick = () => util.toggleDarkMode(darkMode);
}

const restart = () =>
{
    // reset records
    records = {};

    records.ac = [];
}

const updateAC = () =>
{
    // armor
    if (data.armor)

    // unarmored
    records.ac.push(`${data.acMin} (unarmored)`);
    let ac = data.acMin + util.modInt(data.scores.find((score) => score.name == "dex").value);


    // apply ac
    document.querySelector("#ac-score").innerHTML = ac;
    console.log(records.ac);
}

const updateScores = () =>
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

const updateSheet = () =>
{
    restart();
    update.forEach((fn) => fn());
    defaultUpdate.forEach((fn) => fn());
}

const updateTitle = () =>
{
    document.querySelector("#title").innerHTML = data.name;
}
