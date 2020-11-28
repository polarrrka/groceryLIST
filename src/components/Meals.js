import React, { useState } from 'react'
import Meal from './Meal'

const API_KEY = "11e02c7e320d49d4bc950061c0b252fc"

export default function Meals({ meals, msg }) {
  const [mealInfo, setMealInfo] = useState(false)
  const [recipeInfo, setRecipe] = useState('')

  async function getMealById(id) {
    setMealInfo(true)
/*     const recipe = meals.find(meal => meal.id === id)
    setRecipe(recipe) */
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data)
      })
  }


  function closeMealInfo(e) {
    if (e.target.closest(".modal")) return
    setMealInfo(false)
  }

  console.log(mealInfo.extendedIngredients)


  return (
    <div className="meals"> 
      <h3 className="meals__header">...and now what to cook?</h3>
      <p className="meals__error-msg">{msg}</p>
      <div className="meals__grid" >
        {meals ? meals.map(meal =>
          <Meal 
            key={meal.id}
            id={meal.id}
            meal={meal}
            mealInfo={mealInfo}
            recipeInfo={recipeInfo}
            closeMealInfo={closeMealInfo}
            getMealById={getMealById} /> ) : ''}
      </div>
        <div className={mealInfo ? "modal-container show-modal" : "modal-container close-modal"}
          onClick={closeMealInfo}>
        <div className="modal modal--meal">
          <h1 className="modal__header">{recipeInfo.title}</h1>
          <div className="recipe">
            <img 
              src={recipeInfo.image} 
              alt={recipeInfo.title}
              className="recipe__img"/>
            <div className="ingredients">
              <ul className="ingredients__list">

{/*                 {mealInfo.extendedIngredients.map(ingredient => {
                  return (
                    <li className="ingredients__item"><a href="#" className="ingredients__link">{ingredient.name}</a></li>
                  )
                  
                })} 
                https://stackoverflow.com/questions/59700070/react-expected-an-assignment-or-function-call-and-instead-saw-an-expression
                */}
 
              </ul>
             </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
