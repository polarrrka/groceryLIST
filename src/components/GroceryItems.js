import React, { useState } from 'react'
import Item from './Item'
import AddItemForm from './AddItemForm'
import Header from './Header'
import Footer from './Footer'
import { Droppable } from 'react-beautiful-dnd'

export default function GroceryItems({ items, setItems, addItem }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [editItemId, setEditItemId] = useState("")
  const [onEdit, setOnEdit] = useState(false)
  const [isFormVisible, setFormVisible] = useState(false)

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
        return item
      })
    )
  }

  function handleDeleteItem(id) {
    let newItems = [...items]
    newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

    function itemComplete(id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id)
    item.complete = !item.complete
    newItems.sort((a,b) => a.complete - b.complete)
    setItems(newItems)
  }

    function changeCount(value) {
    if (value === 'increment') {
      setQuantity(prevState => Number(prevState) + 1)
    }
    else if (value === 'decrement') {
      setQuantity(quantity > 1 ? quantity - 1 : "")
    }
  }

  function clearState() {
    setName("")
    setQuantity("")
    setPrice("")
  }

  function handleClose(e) {
    if(onEdit) setOnEdit(false)
    clearState()
    setFormVisible(false)
    e.preventDefault()
  }

    function handleSubmit(e) {
    if(!name) return
    else if(onEdit) {
      handleSaveEdit(name, price, quantity, editItemId)
      clearState()
      setOnEdit(false)
      setFormVisible(false)
    } else {
      addItem(name, price, quantity)
      clearState()
      setFormVisible(false)
    }
    e.preventDefault()
  }

  function handleModalClose(e) {
    if (e.target.closest(".modal")) return
    clearState()
    setOnEdit(false)
    setFormVisible(false)
  }
  
  return (
    <> 
      <Header setFormVisible={setFormVisible} />

      <div className={isFormVisible ? "modal-container show-modal" : "modal-container close-modal"}
          onClick={handleModalClose}>
        <div className="modal">
          <div className="modal__header">
            <h3>{onEdit ? "edit item" : "add item"}</h3>
          </div>
          <AddItemForm
            name={name}
            price={price}
            quantity={quantity}
            setName={setName}
            setPrice={setPrice}
            setQuantity={setQuantity}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            changeCount={changeCount} />
        </div>
      </div>
          
      <div className="container">
        <Droppable 
          droppableId="droppable">
          {provided => (
            <div
              className="container__droppable"
              {...provided.droppableProps}
              ref={provided.innerRef}>

              {items.map((item, index) => {
                return(
                  <Item 
                    index={index}
                    key={item.id}
                    id={item.id}
                    item={item}
                    itemComplete={itemComplete}
                    handleOpenModal={handleOpenModal}
                    handleDeleteItem={handleDeleteItem} />
                )
              })}
            {provided.placeholder}
            </div>
        )}
        </Droppable>
        <Footer 
            items={items}
            setItems={setItems} />
      </div>
    </>
  )
}