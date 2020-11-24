import React from 'react'

export default function Meal({ meal, id, getMealById }) {
  return (
    <>
      <div className="meal" onClick={() => getMealById(id)}>
        <img src={meal.image} alt={meal.title}/>
        <div className="meal-info">
          <h3>{meal.title}</h3>
        </div>
      </div>

      <div className="single-meal">
        <h1>{meal.title}</h1>
        <img src={meal.image} alt={meal.title}/>
        <div className="single-meal-info">  </div>
        <div className="main">
          <h2>Ingredients</h2>
          <ul>
            
          </ul>
          <p></p>
        </div>
      </div>
    </>
  )
}
