const baseEndpoint = "http://www.recipepuppy.com/api";
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesEl = document.querySelector('.recipes');
const ingCheckboxes = Array.from(form.querySelectorAll('[type="checkbox"]'));

async function fetcRecipes(query, ingredients) {
    const ingredientString = ingredients.join(",")
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}&i=${ingredientString}`);
    console.log(`${baseEndpoint}?q=${query}&i=${ingredientString}`)
    const data = await res.json();
    return data;
}


const handleSubmit = async event => {
    event.preventDefault();
    const el = event.currentTarget;
    console.log(el.query.value);
    fetcAndDisplay(el.query.value);
}

async function fetcAndDisplay(query) {
    // turn form off
    form.submit.disabled = true;
    // submit the search
    // handle checkbox here
    let ingredients = [];
    ingCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            ingredients.push(checkbox.name);
        }
    });
    const recipes = await fetcRecipes(query, ingredients);
    // turn the form on
    form.submit.disabled = false;
    console.log(recipes);
    displayRecipies(recipes.results);
}

function displayRecipies(recipes) {
    console.log('Creating Html');
    const html = recipes.map(recipe => {
        return `<div class="recipe">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.ingredients}</p>
                    ${recipe.thumbnail && 
                        `<img src="${recipe.thumbnail}" 
                        alt="${recipe.title}">`}
                    <a href="${recipe.href}">View Recipe →</a>
            </div>
        `;
    }).join("");
    recipesEl.innerHTML = html;
}

form.addEventListener('submit', handleSubmit);
fetcAndDisplay('pizza');