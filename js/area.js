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
    let api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    let data = await fetchApi(api)
    let box = ``
    for(let i = 0 ; i < data.length ; i++)
    {
        box += 
        `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="text-white mb-5 cursor-pointer" onclick="displayMealDetails('${data[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${data[i].strArea}</h3>
                </div>
            </div>
        `
    }
    document.getElementById('row').innerHTML = box;
}

display()



function displayMealDetails(area){
    
        location.href = `../meals-area.html?area=${area}`
        // console.log("ID")
}

// function mealDetails(){
//     $(".meal").on("click" , function(){
//         location.replace("../details-meal.html")
//         console.log("jshdjh")
//     })
// }