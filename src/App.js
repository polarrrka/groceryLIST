import React, { useState, useEffect } from 'react'
import GroceryItems from './components/GroceryItems'
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

  function totalPrice() {
    return items.reduce((total, item) => {
      return total + Number(item.price)}, 0)
  }

  function handleClearCompleted() {
    const newItems = items.filter(item => !item.complete)
    setItems(newItems)
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

      <header>Grocery List</header>

      <div className={"container"}>

        <div className="dragndrop">
          <DragDropContext onDragEnd={onDragEnd}>
            <GroceryItems
              items={items}
              setItems={setItems} />
          </DragDropContext>
        </div>

        <div className="footer">
          <div className="total-price">
            {items.find(item => item.price) ? `Total price: ${totalPrice()} €` : ''}
          </div>
          <div className="left-to-buy">
            {items.filter(item => !item.complete).length} left to buy
          </div>
        </div>

      <button className="clear-btn" onClick={handleClearCompleted}>clear bought</button>
    </div>
    </div>
  )
}

export default App