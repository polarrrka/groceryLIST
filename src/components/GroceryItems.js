import React from 'react'
import Item from './Item'
import { Droppable } from 'react-beautiful-dnd'

export default function GroceryItems({ items, itemComplete, handleClearCompleted, onEdit, setEditItems, addItem, setFormVisible, handleEditItems }) {

  return (
    <Droppable 
      droppableId="droppable">
      {provided => (
        <div
          className="items-list"
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
              addItem={addItem}
              handleEditItems={handleEditItems}
              setFormVisible={setFormVisible}
              onEdit={onEdit}
              setEditItems={setEditItems}
              handleClearCompleted={handleClearCompleted} />
          )
        })}
        {provided.placeholder}
        </div>
    )}
    </Droppable>
  )
}
