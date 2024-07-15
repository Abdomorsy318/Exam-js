/// <reference types="../@types/jquery"/>

$(function(){
    $('.loader').fadeOut(500 , function(){
        $('.loading').fadeOut(500 , function(){
            $('body').css("cssText" , `overflow:auto`)
        })
        $('.loading').remove()
    })
})

$(".open-close-icon").on("click" , function(){
    $(".menu-sidebar-parent").animate({width:"toggle" } , 500)
    $(".open-close-icon").toggleClass("fa-align-justify").toggleClass("fa-x")
})

$("#Categories").on("click" , function(){
    location.href = '../category.html'
})
$("#Area").on("click" , function(){
    location.href = '../area.html'
})
$("#Ingredients").on("click" , function(){
    location.href = '../Ingredients.html'
})
async function fetchApi(api){
    const respons = await fetch(api)
    let data = await respons.json();
    return data.meals
}


async function display(){
    let api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    let data = await fetchApi(api)
    let box = ``
    for(let i = 0 ; i < 20 ; i++)
    {
        box += 
        `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="text-white mb-5 cursor-pointer text-center" onclick="displayMealDetails('${data[i].strIngredient}')">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${data[i].strIngredient}</h3>
                    <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        `
    }
    document.getElementById('row').innerHTML = box;
}

display()



function displayMealDetails(Ingredient){
    
        location.href = `./meals-ingred.html?Ingredient=${Ingredient}`
        // console.log("ID")
}

// function mealDetails(){
//     $(".meal").on("click" , function(){
//         location.replace("../details-meal.html")
//         console.log("jshdjh")
//     })
// }