const baseEndpoint = "http://www.recipepuppy.com/api";
async function fetcRecipes(query) {
    const res = fetch(`${baseEndpoint}?q=${query}`);
    console.log(res);
}

fetcRecipes('pizza');