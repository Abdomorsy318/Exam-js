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
  location.href = "./category.html";
});
$("#Area").on("click", function () {
  location.href = "./area.html";
});

$("#Ingredients").on("click", function () {
  location.href = "./Ingredients.html";
});
$("#Search").on("click", function () {
  location.href = "./search.html.html";
});

let nameMeal, letter;
$("#name").on("keyup", function () {
  nameMeal = this.value;
  //    display(nameMeal)
  console.log(nameMeal);
});
$("#letter").on("keyup", function () {
  letter = this.value;
});

async function fetchApi(api) {
  const respons = await fetch(api);
  let data = await respons.json();
  return data.meals;
}

async function display(nameMeal) {
  let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`;
  let data = await fetchApi(api);
  let box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-4">
                <div class="mb-4 position-relative overflow-hidden meal" onclick="displayMealDetails(${data[i].idMeal})" >
                    <img src=${data[i].strMealThumb} class="w-100 rounded-3" alt="">
                    <div class="layer-img rounded-3 d-flex align-items-center p-2">
                        <h2>${data[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
  }
  document.getElementById("row").innerHTML += box;
}

function displayMealDetails(ID) {
  location.href = `../details-meal.html?id=${ID}`;
  // console.log(ID)
}

// function mealDetails(){
//     $(".meal").on("click" , function(){
//         location.replace("../details-meal.html")
//         console.log("jshdjh")
//     })
// }
