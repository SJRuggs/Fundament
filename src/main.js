// import loadJSON from "./utils.js";

const init = data => 
{
    console.log(data);

    const button = document.querySelector(".hover");

    button.addEventListener('mouseover', (e) =>
    {
        console.log("entering mouseover area");
    })

    button.addEventListener('mouseout', () =>
    {
        console.log("exiting mouseover area");
    })

    let tooltip = document.querySelectorAll('.tooltip');

    document.addEventListener('mousemove', fn);

    function fn(e) {
        for (let i = tooltip.length; i--;)
        {
            e.pageX > window.innerWidth / 2
                ? tooltip[i].style.left = (e.pageX - parseInt(getComputedStyle(tooltip[i]).width) - 4 * parseInt(getComputedStyle(tooltip[i]).marginRight)) + 'px'
                : tooltip[i].style.left = e.pageX + 'px';
            e.pageY > window.innerHeight / 2
                ? tooltip[i].style.top = (e.pageY - parseInt(getComputedStyle(tooltip[i]).height) - 4 * parseInt(getComputedStyle(tooltip[i]).marginBottom)) + 'px'
                : tooltip[i].style.top = e.pageY + 'px';
        }
    }












}

// fetch character information
fetch("./data/character.json")
    .then((response) => response.json())
    .then((json) => init(json));