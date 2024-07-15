const searchParam = location.search;
const param = new URLSearchParams(searchParam);
const id = param.get("id");
let containerData = {};

$(function () {
  $(".loader").fadeOut(500, function () {
    $(".loading").fadeOut(500, function () {
      $("body").css("cssText", `overflow:auto`);
    });
    $(".loading").remove();
  });
});

$(".open-close-icon").on("click", function () {
  $(".menu-sidebar-parent").animate({ width: "toggle" }, 500);
  $(".open-close-icon").toggleClass("fa-align-justify").toggleClass("fa-x");
});
$("#Categories").on("click", function () {
  location.href = "category.html";
});
$("#Area").on("click", function () {
  location.href = "area.html";
});
$("#Ingredients").on("click", function () {
  location.href = "Ingredients.html";
});
(async function () {
  const respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await respons.json();
  containerData = data;
  display();
  displayRecipes(containerData);
  displayTags(containerData);
})();

function display() {
  const box = `
        <div class="col-12 col-md-4">
            <div>
                <img src="${containerData.meals[0].strMealThumb}" class="w-100 rounded-2" alt="">
            </div>
            <h2 class="mt-3">${containerData.meals[0].strMeal}</h2>
        </div>
        <div class="col-12 col-md-8">
            <div>
                <h3>Instructions</h3>
                <p>
                    ${containerData.meals[0].strInstructions}
                </p>
            </div>
            <div>
                <h3>Area : ${containerData.meals[0].strArea}</h3>
                <h3>Category : ${containerData.meals[0].strCategory}</h3>
                <div>
                    <h4>Recipes :</h4>
                    <div id ="recipes" class="recipes mt-4 p-2 d-flex flex-wrap">

                    </div>
                </div>
            </div>
            <h3 class="mb-4">Tags :</h3>
            <div id="tags">
                        
            </div>
        </div>

    `;
  document.getElementById("row-details").innerHTML = box;
}

function displayRecipes(meal) {
  let box = ``;
  for (let i = 0; i < 20; i++) {
    if (meal.meals["0"][`strIngredient${i + 1}`] !== "") {
      box += `
                <span> ${meal.meals["0"][`strMeasure${i + 1}`]} ${
        meal.meals["0"][`strIngredient${i + 1}`]
      }</span>
            `;
    } else break;
  }

  document.getElementById("recipes").innerHTML = box;
}

function displayTags(meal) {
  let tags = meal.meals["0"][`strTags`];
  let box = ``;
  if (tags == null) tags = [];
  else tags = meal.meals["0"][`strTags`].split(",");

  for (let i = 0; i < tags.length; i++) {
    box += `<span class="alert alert-danger me-2">${tags[i]}</span>`;
  }
  box += `    
        <div class="btns mt-4">
            <a target="_blank" href="${
              meal.meals["0"][`strSource`]
            }" class="btn btn-success">Source</a>
            <a target="_blank" href="${
              meal.meals["0"][`strYoutube`]
            }" class="btn btn-danger">Youtube</a>
        </div>
    `;

  // console.log(meal.meals['0'][`strYoutube`])
  document.getElementById("tags").innerHTML = box;
}
