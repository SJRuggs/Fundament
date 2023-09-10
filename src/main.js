import util from "./utils.js";

let data;

const init = (json) => 
{
    data = json;
    data.defaultUpdate = [implementRace, calcAC, uploadScores, uploadTitle, compileFeatures, util.setupTooltip];
    data.update = [];
    
    setupSettings();
    restart();
    updateSheet(data);
}

// fetch character information then start program
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));

const calcAC = () =>
{
    console.log("calculating ac");

    let ac;
    // base ac
    data.records.acBonus.push(data.armor.ac);
    data.records.acSource.push(`(${data.armor.name})`);

    ac = data.armor.ac;

    // max dex bonus
    if (data.armor.max > 0)
    {
        let bonus = Math.min(data.armor.max, util.modInt(data.scores.find((score) => score.name == "dex").value));
        ac += bonus;
        data.records.acBonus.push(`+${bonus}`);
        data.records.acSource.push(`(Dexterity)`);
    }
    else
    {
        ac += util.modInt(data.scores.find((score) => score.name == "dex").value);
        data.records.acBonus.push(`+${util.modInt(data.scores.find((score) => score.name == "dex").value)}`);
        data.records.acSource.push(`(Dexterity)`);
    }

    // shield
    if (data.shield)
    {
        ac += data.shield.ac;
        data.records.acBonus.push(`+${data.shield.ac}`);
        data.records.acSource.push(`(${data.shield.name})`);
    }

    // apply ac
    document.querySelector("#ac-score").innerHTML = ac;
    document.querySelector("#ac-record-bonus").innerHTML = data.records.acBonus.join("<br>");
    document.querySelector("#ac-record-source").innerHTML = data.records.acSource.join("<br>");
}

const compileFeatures = () =>
{
    console.log("compiling features");

    let sources = {};

    data.features.forEach((feature) =>
    {
        if (sources[feature.src]) sources[feature.src].push(feature);
        else 
        {
            sources[feature.src] = [feature];
        }
    });

    // separate and construct divs
    let actions = [];
    let passives = [];
    Object.keys(sources).forEach((source) =>
    {

        sources[source].forEach((feature) =>
        {
            // construct div
            let div = document.createElement("div");
            div.classList.add("action");
            div.innerHTML = `<h4>${feature.name}</h4>${feature.desc.short}`;

            // action
            if (feature.desc.action)
            {
                // TODO: implement action
            }

            // recharge
            if (feature.desc.recharge)
            {
                // TODO: implement action
            }

            // tooltip
            feature.desc.long ? null : feature.desc.long = feature.desc.short;
            div.classList.add("hover");
            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.id = `${util.toKebabCase(feature.name)}-tooltip`;
            tooltip.innerHTML = `<h4 style="text-align : center;">${feature.name.toUpperCase()}</h4><div>${feature.desc.long}</div>`;
            div.appendChild(tooltip);

            // TODO: implement source
            // TODO: implement req

            // push
            feature.desc.action ? actions.push(div) : passives.push(div);
            feature.desc.action ? document.querySelector("#actions").appendChild(div) : document.querySelector("#passives").appendChild(div);
        });

        // upload divs
        document.querySelector("#actions").innerHTML = "<h2 class='header'>Actions</h2>";
        document.querySelector("#passives").innerHTML = "<h2 class='header'>Passives</h2>";

        let allActions = document.createElement("div");
        let allPassives = document.createElement("div");
        allActions.classList.add("scrollable");
        allPassives.classList.add("scrollable");
        allActions.id = "all-actions";
        allPassives.id = "all-passives";
        
        actions.forEach((action) => allActions.appendChild(action));
        passives.forEach((passive) => allPassives.appendChild(passive));
        document.querySelector("#actions").appendChild(allActions);
        document.querySelector("#passives").appendChild(allPassives);
    });
    
}

const implementRace = () =>
{
    console.log("implementing race");

    // apply asi
    data.race.asi.forEach((asi) =>
    {
        let score = data.scores.find((score) => score.name == asi.score);
        score.value += asi.value;
        score.value = Math.min(score.value, 20);

        data.records[`${asi.score}Bonus`].push(`+${asi.value}`);
        data.records[`${asi.score}Source`].push(`(${data.race.name})`);
    });

    // apply features
    data.race.features.forEach((feature) =>
    {
        data.features.push(feature);
    });
}

const restart = () =>
{
    // reset records
    data.features = [];
    data.records = {};
    data.records.acBonus = [];
    data.records.acSource = [];

    // apply base scores
    data.scores.forEach((score) =>
    {
       data.records[`${score.name}Bonus`] = [data.scores.find((scopedScore) => scopedScore.name == score.name).value];
       data.records[`${score.name}Source`] = ["(Base)"];
    });

    // empty features
    data.records.features = [];
}

const setupSettings = () =>
{
    // setup dark mode toggle
    let darkMode = document.querySelector("#dark-mode-toggle");
    darkMode.onclick = () => util.toggleDarkMode(darkMode);
}

const updateSheet = () =>
{
    restart();
    data.update.forEach((fn) => fn());
    data.defaultUpdate.forEach((fn) => fn());
}

const uploadScores = () =>
{
    console.log("uploading scores");

    // scores
    data.scores.forEach((score) =>
    {
        document.querySelector(`#${score.name}-score`).innerHTML = score.value;
        document.querySelector(`#${score.name}-mod`).innerHTML = util.modStr(util.modInt(score.value));
        document.querySelector(`#${score.name}-record-bonus`).innerHTML = data.records[`${score.name}Bonus`].join("<br>");
        document.querySelector(`#${score.name}-record-source`).innerHTML = data.records[`${score.name}Source`].join("<br>");
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

const uploadTitle = () =>
{
    document.querySelector("#title").innerHTML = data.name;
}
