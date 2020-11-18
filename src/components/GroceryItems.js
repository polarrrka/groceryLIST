import React from 'react'
import Item from './Item'

import { Droppable } from 'react-beautiful-dnd'

export default function GroceryItems({ items, itemComplete, handleDeleteItem, handleOpenModal }) {
  return (
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
  )
}