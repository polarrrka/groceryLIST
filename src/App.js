import React, { useState, useEffect } from 'react'
import AddItemForm from './components/AddItemForm'
import GroceryItems from './components/GroceryItems'
import './App.css'
import uuid from 'uuid/dist/v4'
import { DragDropContext } from 'react-beautiful-dnd'
import Pdf from 'react-to-pdf'

const LOCAL_STORAGE_KEY = 'groceryList.items'
const ref = React.createRef()

function App() {
  const [isFormVisible, setFormVisible] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [items, setItems] = useState([])  
  
 useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function setEditItems(id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.edit = !item.edit
    setItems(newItems)
    setOnEdit(true)
  }

  function addItem(name, price, quantity) {
    setItems(prevItems => {
      const newItems = [...prevItems, {id: uuid(), content: name, quantity: quantity, price: price, complete: false, edit: false}]
      newItems.sort((a,b) => a.complete - b.complete)
      return newItems
    })
    setFormVisible(false)
  }

  function totalPrice() {
    return items.reduce((total, item) => {
      return total + Number(item.price)}, 0)
  }

  function itemComplete(id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.complete = !item.complete
    newItems.sort((a,b) => a.complete - b.complete)
    setItems(newItems)
  }

  function handleClearCompleted() {
    const newItems = items.filter(item => !item.complete)
    setItems(newItems)
  }

  function handleEditItems(editValue, editQValue, editPrice, id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.content = editValue
    item.quantity = editQValue
    item.price = editPrice
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

      <div type="button" className="add-item" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus"></i>
      </div>

      <Pdf targetRef={ref} filename="grocery-list.pdf">
        {({toPdf}) => (
          <button onClick={toPdf}>to PDF</button>
        )}
      </Pdf>
      
      <div ref={ref} className="container">
        <div className={isFormVisible ? "modal-container show-modal" : "modal-container"}>
          <div className="modal">
            <div className="modal-header">
              <h3>add item</h3>
            </div>
            <AddItemForm 
              addItem={addItem}
              items={items}
              onEdit={onEdit}
              setFormVisible={setFormVisible}
              handleEditItems={handleEditItems} />
          </div>
        </div>

        <div className="dragndrop">
          <DragDropContext onDragEnd={onDragEnd}>
            <GroceryItems
              addItem={addItem}
              setFormVisible={setFormVisible}
              handleClearCompleted={handleClearCompleted}
              onEdit={onEdit}
              setEditItems={setEditItems}
              itemComplete={itemComplete}
              items={items} />
          </DragDropContext>
        </div>

        <div className="footer">
          <div className="left-to-buy">{items.filter(item => !item.complete).length} left to buy</div>
          <div className="total-price">
            {items.find(item => item.price) ? `Total price: ${totalPrice()} €` : ''}
          </div>
        </div>

        <button className="clear-btn" onClick={handleClearCompleted}>clear bought</button>

      </div>
    </div>
  )
}

export default App