import React, { useState, useEffect } from 'react'
import GroceryItems from './components/GroceryItems'
import Meals from './components/Meals'
import { DragDropContext } from 'react-beautiful-dnd'
import './main.scss'

const LOCAL_STORAGE_KEY = 'groceryList.items'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

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
      <Meals items={items} />
    </div>
  )
}

export default App