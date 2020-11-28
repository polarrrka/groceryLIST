import React from 'react'

export default function Meal({ meal, id, getMealById }) {

  return (
    <>
      <div className="meal" onClick={() => getMealById(id)}>
        <img src={meal.image} alt={meal.title}/>
        <div className="meal__title">
          <h3>{meal.title}</h3>
        </div>
      </div>
    </>
  )
}
