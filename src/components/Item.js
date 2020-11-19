import React from 'react'
import AddItemForm from './AddItemForm'
import { Draggable } from 'react-beautiful-dnd'

export default function Item({ item, id, index, handleDeleteItem, itemComplete, handleOpenModal }) {
  return(
    <>
      <AddItemForm
        id={id} />
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
                      id={item.content}
                      type="checkbox"
                      className="hidden-box"
                      value={item.content}
                      checked={item.complete}
                      onChange={e => itemComplete(id)} />
                      
                    <label htmlFor={item.content} >
                      <div className="item-content">{item.content}</div>
                    </label>
                    <div className="item-price">{!item.price ? '' : `${item.price} €`}</div>
                  </div>
                
                  <div>
                    <div 
                      className={item.complete ? "btn-completed" : "btn edit-btn"} 
                      type="button" 
                      onClick={() => handleOpenModal(item.content, item.price, item.quantity, id)}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div 
                      className={item.complete ? "btn-completed" : "btn delete-btn"} 
                      type="button" onClick={() => handleDeleteItem(id)}>
                        <i className="fas fa-times"></i>
                    </div>
                  </div>

                  <div {...provided.dragHandleProps} className="dnd">
                    <i className="fas fa-grip-lines"></i>
                  </div>

              </div>
            )}
      </Draggable>
    </>
  )
}