import React, { useState } from 'react'
import Meal from './Meal'

export default function Meals({ items }) {
  const [meals, setMeals] = useState([])
      const ingredientsArr = items.map(item => item.content)

  function getMeals(e) {
    const ingredients = items.map(item => item.content).join(',')

    if(ingredients.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
      .then(res => res.json())
      .then(data => {
        if(data.meals === null) return
        setMeals(data.meals)
        console.log(data.meals)
      })
    }
    e.preventDefault()
  }
/* 
  
  function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

console.log(filterArray(ingredientsArr, meals)) */

  return (
    <>
      <button className="clear-btn" onClick={getMeals}>get meals</button>
      <div className="meals">
        {meals.map(meal => <Meal key={meal.idMeal} meal={meal} /> )}
      </div>
    </>
  )
}
