import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import AddItemForm from './AddItemForm'

export default function Item({ item, id, index, itemComplete, onEdit, setEditItems, handleClearCompleted }) {

  if(onEdit) {
    return (
      <>
      <div className="modal-container show-modal">
      <div className="modal">
            <div className="modal-header">
              <h3>edit item</h3>
            </div>
            <AddItemForm />
          </div>
        </div>

     {/*  <div className="modal-container show-modal">
        <div className="modal">
          <div className="modal-header">
            <h3>edit item</h3>
            <div type="button" className="close-container" onClick={() => handleSave(id)}>
              <i className="fas fa-check"></i>
            </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault()
          handleSave(id)}}>
        <label htmlFor={id}>
          Item name
          <input
            id={id}
            type="text" 
            value={editValue} 
            name="editValue"
            placeholder="item"
            onChange={e => setEditValue(e.target.value)} />
        </label>
        <label htmlFor={id}>
          <i className="fas fa-weight-hanging"></i>
          <input 
            type="number"
            name="quantity"
            id="quantity"
            min="1"
            
            placeholder="quantity"
            value={editQValue} 
            onChange={e => setEditQValue(e.target.value)}/>
        </label>
        <label htmlFor={id}>
          <i className="fas fa-tag"></i>
          <input
            value={editPrice}
            type="number"
            name="price"
            min="0"
            placeholder="price"
            onChange={e => setEditPrice(e.target.value)} />
        </label>

        <input type="submit" style={{display: "none"}} />
        </form>
        </div>
      </div>
      */}
       </> 
    )
   
  } else {
    return(
    <Draggable 
      draggableId={id} 
      index={index}
      isDragDisabled={item.complete}>
        {provided => (
          <div
            className={item.complete ? "item-container item-complete" : "item-container"}
            ref={provided.innerRef}
            {...provided.draggableProps}>
                <div className="list">
                  <div className="item-quantity">{item.quantity}</div>
                  <input
                    id={id}
                    type="checkbox"
                    className="hidden-box"
                    value={item.content}
                    checked={item.complete}
                    onChange={() => itemComplete(id)} />
                    
                  <label htmlFor={id} >
                    <div className="item-content">{item.content}</div>
                  </label>

                  <div className="item-price">{!item.price ? '' : `${item.price} €`}</div>
                    

                </div>
              
                <div>
                  <div 
                    className={item.complete ? "btn-completed" : "btn edit-btn"} 
                    type="button" 
                    onClick={() => setEditItems(id)}>
                      <i className="fas fa-pencil-alt"></i>
                  </div>
                  <div 
                    className={item.complete ? "btn-completed" : "btn delete-btn"} 
                    type="button" onClick={() => {item.complete = true}}>
                      <i className="fas fa-times"></i>
                  </div>
                </div>
                <div {...provided.dragHandleProps} className="dnd">
                  <i className="fas fa-grip-lines"></i>
                </div>
            </div>
          )}
    </Draggable>
    )
  }
}