import React, { useState } from 'react'
import Item from './Item'
import AddItemForm from './AddItemForm'
import uuid from 'uuid/dist/v4'
import { Droppable } from 'react-beautiful-dnd'

export default function GroceryItems({ items, setItems }) {
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
  
  return (
    <>
      <div className="btn-header">
        <div className="btn-header__print" onClick={() => window.print()}>
          <i className="fas fa-print"></i>
        </div>
        <div type="button" className="btn-header__add" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      
      <AddItemForm 
        addItem={addItem}
        name={name}
        price={price}
        quantity={quantity}
        setName={setName}
        setPrice={setPrice}
        setQuantity={setQuantity}
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        isFormVisible={isFormVisible}
        setFormVisible={setFormVisible}
        handleEditItems={handleEditItems}
        handleSaveEdit={handleSaveEdit}
        editItemId={editItemId} />

       
      <Droppable 
        droppableId="droppable">
        {provided => (
          <div
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
      
    </>
  )
}