/// <reference types="../@types/jquery"/>

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
async function fetchApi(api) {
  const respons = await fetch(api);
  let data = await respons.json();
  return data.categories;
}

async function display() {
  let api = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  let data = await fetchApi(api);
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="mb-4 position-relative overflow-hidden meal" onclick="displayMealDetails('${
                  data[i].strCategory
                }')" >
                    <img src=${
                      data[i].strCategoryThumb
                    } class="w-100 rounded-3" alt="">
                    <div class="layer-img rounded-3 text-center p-2">
                        <h2>${data[i].strCategory}</h2>
                        <p>${data[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        `;
  }
  document.getElementById("row").innerHTML = box;
}

display();

function displayMealDetails(category) {
  location.href = `./meal-category.html?cate=${category}`;
  // console.log(id)
}

// function mealDetails(){
//     $(".meal").on("click" , function(){
//         location.replace("../details-meal.html")
//         console.log("jshdjh")
//     })
// }
