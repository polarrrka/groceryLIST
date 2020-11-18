import React, { useState, useEffect } from 'react'
import AddItemForm from './components/AddItemForm'
import GroceryItems from './components/GroceryItems'
import uuid from 'uuid/dist/v4'
import { DragDropContext } from 'react-beautiful-dnd'
import Pdf from 'react-to-pdf'
import './main.scss'

const LOCAL_STORAGE_KEY = 'groceryList.items'
const ref = React.createRef()

function App() {
  const [onEdit, setOnEdit] = useState(false)
  const [isFormVisible, setFormVisible] = useState(false)
  const [items, setItems] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [editItemId, setEditItemId] = useState("")
  
 useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function handleOpenModal(editValue, editPrice, editQValue, id) {
    setOnEdit(true)
    setFormVisible(true)
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.content = editValue
    item.quantity = editQValue
    item.price = editPrice
    setName(editValue)
    setPrice(editPrice)
    setQuantity(editQValue)
    setEditItemId(id)
    setItems(newItems)
  }

  function handleSaveEdit(name, price, quantity, id) {
    setItems(
       items.map(item => {
        if(item.id === id){
          return {...item, id: id, content: name, quantity: quantity, price: price, complete: false}}
        return item;
      })
    )
  }

  function addItem(name, price, quantity) {
    setItems(prevItems => {
      const newItems = [...prevItems, {id: uuid(), content: name, quantity: quantity, price: price, complete: false}]
      newItems.sort((a,b) => a.complete - b.complete)
      return newItems
    })
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

  function handleDeleteItem(id) {
    let newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.complete = !item.complete
    newItems = items.filter(item => !item.complete)
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

      <Pdf targetRef={ref} filename="grocery-list.pdf">
        {({toPdf}) => (
          <button onClick={toPdf}>to PDF</button>
        )}
      </Pdf>

      <div ref={ref} className="container">
              <div type="button" className="add-item" onClick={() => setFormVisible(true)}>
        <i className="fas fa-plus"></i>
      </div>

        <AddItemForm 
          addItem={addItem}
          name={name}
          price={price}
          quantity={quantity}
          setName={setName}
          setPrice={setPrice}
          setQuantity={setQuantity}
          items={items}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          isFormVisible={isFormVisible}
          setFormVisible={setFormVisible}
          handleEditItems={handleEditItems}
          handleSaveEdit={handleSaveEdit}
          editItemId={editItemId} />

        <div className="dragndrop">
          <DragDropContext onDragEnd={onDragEnd}>
            <GroceryItems
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              itemComplete={itemComplete}
              items={items} />
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