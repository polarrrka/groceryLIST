import React from 'react'

export default function Meal({ meal }) {
  return (
    <>
      <div className="meal">
        <img src={meal.strMealThumb} alt={meal.strMeal}/>
        <div className="meal-info">
          <h3>{meal.strMeal}</h3>
        </div>
      </div>
    </>
  )
}
