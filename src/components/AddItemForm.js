import React from 'react'


export default function AddItemForm({ setOnEdit, name, price, quantity, setName, setPrice, setQuantity, onEdit, isFormVisible, setFormVisible, id, addItem, handleSaveEdit, editItemId }) {

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
      <div 
        className={isFormVisible ? "modal-container show-modal" : "modal-container close-modal"}
        onClick={handleModalClose}>
        <div className="modal">
          <div className="modal-header">
            <h3>{onEdit ? "edit item" : "add item"}</h3>
          </div>

          <form 
            onSubmit={handleSubmit}>
              <div className="group">
                <div>
                  <input
                    id={id}
                    className="form"
                    name="item" 
                    type="text"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)} />
                  <span className="bar"></span>
                  <label htmlFor="item" className="form-label">item</label>
                </div>

                <div className="quantity-form">
                  <div className="quantity-form__spinner-btn" onClick={() => changeCount('decrement')}>
                    <i className="fas fa-minus"></i>
                  </div>
                  <input
                    className="quantity-form__input"
                    name="quantity" 
                    type="number" 
                    min="1"
                    placeholder="1"
                    value={quantity} 
                    onChange={e => setQuantity(e.target.value)} />
                  <div className="quantity-form__spinner-btn" onClick={() => changeCount('increment')}>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>

              <input
                className="form"
                name="price" 
                type="number" 
                min="0"
                step=".01"
                value={price}
                onChange={e => setPrice(e.target.value)} />
              <span className="bar"></span>
              <label htmlFor="price" className="form-label">
                price €
              </label>

            <button type="submit" className="modal-btn">submit</button>
          </form>
    
          <div className="close-btn" onClick={handleClose}>
            <div className="close-btn__leftright"></div>
            <div className="close-btn__rightleft"></div>
          </div>

        </div>
      </div>
  </>
  )
}
