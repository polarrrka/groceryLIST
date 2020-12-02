import React, { useState } from 'react'
import Meal from './Meal'

const API_KEY = "11e02c7e320d49d4bc950061c0b252fc"

export default function Meals({ meals, msg }) {
  const [mealInfo, setMealInfo] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  async function getMealById(id) {
    setMealInfo(true)

    await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setIngredients(data)
      })
      
    await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => setInstructions(data[0].steps))
  }

  function closeMealInfo(e) {
    if (e.target.closest(".modal")) return
    setMealInfo(false)
  }

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
            recipeInfo={ingredients}
            closeMealInfo={closeMealInfo}
            getMealById={getMealById} /> ) : ''}
      </div>
        <div className={mealInfo ? "modal-container show-modal" : "modal-container close-modal"}
          onClick={closeMealInfo}>
        <div className="modal modal--meal">
          <h1 className="modal__header">{ingredients.title}</h1>
          <div className="recipe">

            <img 
              src={ingredients.image} 
              alt={ingredients.title}
              className="recipe__img"/> 
            <div className="recipe-instructions">
            <div className="ingredients">
              <ul className="ingredients__list">

                { ingredients ? 
                    ingredients.extendedIngredients.map(ingredient => {
                      return (
                        <li className="ingredients__item" key={ingredient.id}>{ingredient.name}</li>) }
                )
                :
                ''
                }
              </ul>
            </div> 

            <div className="instructions">
              <ul className="instructions__list">
                { instructions ? 
                    instructions.map(instruction => {
                      return (
                        <li className="ingredients__item" key={instruction.number}>&gt;{instruction.step}</li>) }
                )
                :
                ''
                }
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
