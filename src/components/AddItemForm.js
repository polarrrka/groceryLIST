  import React, { useState, useEffect } from 'react'
import './addForm.styles.css'

export default function AddItemForm({ setOnEdit, onEdit, setFormVisible, handleEditItems, id, addItem, items  }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("") 
  
/*    useEffect(() => {
    const item = [...items].filter(item => item.edit)
    if(onEdit) {
      setName(item.content)
      setQuantity(item.quantity)
      setPrice(item.price)
    }
  }, [items]) */

  function changeCount(value) {
    if (value === 'increment') {
      setQuantity(prevState => Number(prevState) + 1)
    }
    else if (value === 'decrement') {
      setQuantity(quantity > 1 ? quantity - 1 : "")
    }
  }

  function handleClose() {
    if(onEdit) { 
      setOnEdit(false)
      setFormVisible(false)
    } else {
      setName("")
      setQuantity("")
      setPrice("")
      setFormVisible(false)
    }
    
  }

/*   function handleSave(id) {
    if(onEdit) {
      handleEditItems(name, quantity, price, id)
    } else {
      setName(item.content)
      setQuantity(item.quantity)
      setPrice(item.price)
    }
    setOnEdit(false)
  }  */


    function handleSubmit(e) {
    if(onEdit) {
       handleEditItems(name, quantity, price, id)
      } else if(!name) {return}
      else {
    addItem(name, price, quantity)
    setName("")
    setQuantity("")
    setPrice("")
      }
      e.preventDefault()
  }  

  return (
<>
      <form onSubmit={handleSubmit}>
        <div className="item-wrap">
          <div className="group">
            <input 
              className="form"
              name="item" 
              type="text"
              value={name}
              required
              onChange={e => setName(e.target.value)} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="item" className="form-label">item</label>
          </div>
          <div className="quantity-wrapper">
            <div className="spinner-btn" onClick={() => changeCount('decrement')}>
              <i className="fas fa-minus"></i>
            </div>
            <input
              className="quantity"
              name="quantity" 
              type="number" 
              min="1"
              placeholder="1"
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} />
            <div className="spinner-btn" onClick={() => changeCount('increment')}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
        </div>

        <div className="price-container">
          <div className="group">
            <input
              className="form price-form"
              name="price" 
              type="number" 
              min="0"
              step=".01"
              value={price}
              onChange={e => setPrice(e.target.value)} />
            <span className="highlight"></span>
            <span className="bar price-bar"></span>
            <label htmlFor="price" className="form-label">
              price €
            </label>
          </div>
        </div>

        <button type="submit" className="modal-btn">
        <i className="fas fa-plus"></i>
        </button>
      </form>
      <div className="close-container" onClick={() => handleClose}>
        <div className="leftright"></div>
        <div className="rightleft"></div>
      </div>
    </>
  )
}