import React, { useState } from 'react'
import Meal from './Meal'

const API_KEY = "11e02c7e320d49d4bc950061c0b252fc"

export default function Meals({ items }) {
  const [meals, setMeals] = useState()
  const [msg, setMsg] = useState('')
  const [mealInfo, setMealInfoVisible] = useState(false)

  function getMeals(e) {
    const ingredients = items.map(item => item.content).join(',')

    if(ingredients.trim()) {
      fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=2`)
      .then(res => res.json())
      .then(data => {
        if(data === null) {
          setMsg('No Recipes Found :( ')
        } else if(data.code === 402) {
          setMsg('Just reached your daily limit :(')
        } else {
          setMeals(data)
          console.log(data)
        }
      })
    }
    e.preventDefault()
  }

  function getMealById(id) {
    meals.filter(meal => meal.id === id)
    setMealInfoVisible(true)
  }

  return (
    <div className="meals-container">
      <button className="clear-btn" onClick={getMeals}>get meals</button>
      <p className="error-msg">{msg}</p>
      <div className="meals" style={mealInfo ? {display: "none"} : {display: 'block'}}>
        {meals ? meals.map(meal =>
          <Meal 
            key={meal.id}
            id={meal.id}
            meal={meal}
            getMealById={getMealById} /> ) : ''}
      </div>
    </div>
  
  )
}
