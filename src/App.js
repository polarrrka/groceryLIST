import React, { useState, useEffect } from 'react'
import GroceryItems from './components/GroceryItems'
import Meals from './components/Meals'
import { DragDropContext } from 'react-beautiful-dnd'
import './main.scss'

const LOCAL_STORAGE_KEY = 'groceryList.items'
const API_KEY = '11e02c7e320d49d4bc950061c0b252fc'

function App() {
  const [items, setItems] = useState([])
  const [meals, setMeals] = useState()
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedItems) setItems(storedItems)
    getMeals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    getMeals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  async function getMeals() {
    const ingredients = items.map(item => item.content).join(',')

    if(ingredients.trim()) {
      const res = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=12`)
      const data = await res.json()
      if(data === null) {
        setMsg('No Recipes Found :( ')
      } else if(data.code === 402) {
        setMsg('Just reached your daily limit :(')
      } else {
        setMeals(data)
      }
      return data
    }
  }

  function onDragEnd(result) {
    const { source, destination } = result
    if(!result.destination) return
    if(result.source.index === result.destination.index) return
    const newItems = [...items]
    const [removed] = newItems.splice(source.index, 1)
    newItems.splice(destination.index, 0, removed)
    setItems(newItems)
  }
  
  return (
    <div className="app">
      <div className="dragndrop">
        <DragDropContext onDragEnd={onDragEnd}>
          <GroceryItems
            items={items}
            setItems={setItems} />
        </DragDropContext>
      </div>
      <Meals 
        meals={meals}
        msg={msg} />
    </div>
  )
}

export default App