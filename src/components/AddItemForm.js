import React from 'react'


export default function AddItemForm({ name, price, quantity, setName, setPrice, setQuantity, id, handleSubmit, handleClose, changeCount }) {
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
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
  </>
  )
}
