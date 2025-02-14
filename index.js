let loading=document.querySelector('#Loading');
loading.classList.add('d-none');

let bodyObj=document.querySelector('#body');

let foodDesc=document.querySelector('#foodDesc');

let heading=document.querySelector('#heading');

let search=document.querySelector("#SearchFood");
search.addEventListener('submit',(event)=>{
     event.preventDefault();
     heading.classList.add('d-none');
     let foodName=document.querySelector("#FoodName").value.trim();
     fetchAPI(foodName);
})


async function fetchAPI(foodName) {
     try{
     loading.classList.remove('d-none');
     bodyObj.classList.add('d-none');
     let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
     let obj= await data.json();
     loading.classList.add('d-none');
     bodyObj.classList.remove('d-none');
     // console.log(obj);
     displayItems(obj);
     }
     catch(e){
          alert("OM Ganeshay NAmha");
     }

}


function displayItems(obj)
{
     bodyObj.innerHTML="";
     obj.meals.forEach((meal) => {
          let card=document.createElement('button');
          card.classList.add('btn','bg-transparent');
          card.innerHTML=`
          <div class="card" style="width: 18rem;">
               <img src="${meal.strMealThumb}" class="card-img-top">
               
               <p class="fw-bold">${meal.strMeal}</p>
               <p class="fw-medium">${meal.strArea} Dish</p>
               <p class="fw-medium"> Belongs to ${meal.strCategory} Category</p>
          </div>
     `
     card.addEventListener('click',()=>{
          displayDetailes(meal);
          });
     bodyObj.appendChild(card);
     });
}

function displayDetailes(meal)
{
     foodDesc.innerHTML="";
     let details=document.createElement('div');
     details.innerHTML=`
     <div class="container border p-4 bgcolor" >
          <button class="btn btn-secondary" style="background-color: rgb(50, 50, 50);" onclick="back()">BACK</button>
          <br><br>
          <div class="row mb-4">
               <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="img-fluid border" alt="Recipe Image">
               </div>
               <div class="col-md-8">
                    <p class="border p-2">Recipe Name: <strong>${meal.strMeal}</strong></p>
                    <p class="border p-2">Country: <strong>${meal.strArea}</strong></p>
                    <p class="border p-2">Category: <strong>${meal.strCategory}</strong></p>
                    <div class="d-flex gap-3 mt-2">
                         <a href="${meal.strYoutube}" target="_blank">
                              <button class="btn btn-primary">View Recipe</button>
                         </a>
                         <a href="${meal.strSource}" target="_blank">
                              <button class="btn btn-secondary">More Info</button>
                         </a>
                    </div>
               </div>
          </div>
          <div class="row">
               <div class="col-12">
                    <div class="border p-4">
                         <p><strong>Ingredient:</strong> This is a simple pancake recipe made with basic ingredients. It’s perfect for a quick breakfast or a delightful snack!</p>
                         <ul id="Ingredient">
                         </ul>
                         <p><strong>Instructions:</strong>${meal.strInstructions}</p>
                    </div>
               </div>
          </div>
     </div>
     `
     // add Ingredient
     foodDesc.appendChild(details);
     addIngredient(meal);
     bodyObj.classList.add('d-none');
     foodDesc.classList.remove('d-none');
}


function back()
{
     bodyObj.classList.remove('d-none');
     foodDesc.classList.add('d-none');
}

function addIngredient(meal)
{
     let ul=document.querySelector('#Ingredient');

     for(let i=1;i<20;i++)
     {
          let key,values;
          key=meal[`strIngredient${i}`];
          if(key!="")
          {
               values=meal[`strMeasure${i}`];
               let li=document.createElement('li');
               li.textContent=`${key.trim()} : ${values.trim()}`;
               ul.appendChild(li);
          }    
          else break;
     }
}

