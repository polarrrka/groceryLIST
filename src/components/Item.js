import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function Item({ item, id, index, handleDeleteItem, itemComplete, handleOpenModal }) {
  return(
    <>
      <Draggable 
        draggableId={id} 
        index={index}
        isDragDisabled={item.complete}>
          {provided => (
            <div
              className={item.complete ? "item-container item-complete" : "item-container"}
              ref={provided.innerRef}
              {...provided.draggableProps}>
                
                <div className="buttons-edit">
                  <div 
                    className={item.complete ? "btn-completed" : "buttons-edit__edit"} 
                    type="button" 
                    onClick={() => handleOpenModal(item.content, item.price, item.quantity, id)}>
                    <i className="fas fa-pencil-alt"></i>
                  </div>
                  <div 
                    className={item.complete ? "btn-completed" : "buttons-edit__edit"} 
                    type="button" onClick={() => handleDeleteItem(id)}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>

                <div className="item-list">
                  <div className="item-list__quantity">{item.quantity}</div>
                  <input
                    id={item.content}
                    type="checkbox"
                    className="hidden-box"
                    value={item.content}
                    checked={item.complete}
                    onChange={e => itemComplete(id)} />
                    
                  <label htmlFor={item.content} >
                    <div className="item-list__content">{item.content}</div>
                  </label>
                  <div className="item-list__price">{!item.price ? '' : `${item.price} €`}</div>

                  <div {...provided.dragHandleProps} className="item-list__dnd">
                    <i className="fas fa-grip-lines"></i>
                  </div>
                </div>
          </div>
            )}
      </Draggable>
    </>
  )
}