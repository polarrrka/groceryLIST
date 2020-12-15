import React, { useState } from 'react'
import axios from 'axios'
import Meal from './Meal'

const API_KEY = "11e02c7e320d49d4bc950061c0b252fc"

export default function Meals({ meals, msg, items, setItems, addItem }) {
  const [mealInfo, setMealInfo] = useState(false)
  const [ingredients, setIngredients] = useState()
  const [instructions, setInstructions] = useState()
  const [title, setTitle] = useState('')
  const [missedIngredients, setMissedIngredients] = useState()

  function getMealById (id) {
    setMealInfo(true)
    setTitle(meals
      .filter(meal => meal.id === id)
      .map(meal => meal.title))
    
    setMissedIngredients(meals
      .filter(meal => meal.id === id)
      .map(meal => meal.missedIngredients))

      setIngredients(meals
      .filter(meal => meal.id === id)
      .map(meal => meal.usedIngredients)) 

    const ingredientAPI = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    const instructionAPI = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`

    const getIngredients = axios.get(ingredientAPI)
    const getInstructions = axios.get(instructionAPI)

    axios.all([getIngredients, getInstructions]).then(
      axios.spread((...allData) => {
        if(allData) {
          const allIngredientsData = allData[0].data.extendedIngredients
          const allInstructionsData = allData[1].data[0].steps
          // setIngredients(allIngredientsData)
          setInstructions(allInstructionsData)
        }
        }
      )
    )
  }

  function closeMealInfo(e) {
    if (e.target.closest(".modal")) return
    setInstructions()
    setIngredients()
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
            getMealById={getMealById} /> ) : ''}
      </div>
        <div className={mealInfo ? "modal-container show-modal" : "modal-container close-modal"}
          onClick={closeMealInfo}>
        <div className="modal modal--meal">
        <h1 className="modal__header">{title}</h1>
          <div className="recipe">
            <div className="ingredients">
              <ul className="ingredients__list">

                { ingredients ? 
                    ingredients[0].map(ingredient => {
                      return (
                        <li className="ingredients__item" key={ingredient.id}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>) }
                )
                :
                ''
                }

                { missedIngredients ? 
                    missedIngredients[0].map(ingredient => {
                      return (
                        <li onClick={() => addItem(ingredient.name, '', ingredient.amount)} className="ingredients__item--missed" key={ingredient.id}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>) }
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
                        <li className="instructions__item" key={instruction.number}>&gt; {instruction.step}</li>) }
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
  )
}
