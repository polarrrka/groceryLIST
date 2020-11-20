import React from 'react'

export default function Footer({ items, setItems }) {
  function totalPrice() {
    const itemsTotalPrice = items.filter(item => !item.complete)
    return itemsTotalPrice.reduce((total, item) => {
      return total + Number(item.price)}, 0)
  }

  function handleClearCompleted() {
    const newItems = items.filter(item => !item.complete)
    setItems(newItems)
  }
  return (
    <div>
      <div className="footer">
        <div className="total-price">
          {items.find(item => item.price) ? `Total price: ${totalPrice()} €` : ''}
        </div>
        <div className="left-to-buy">
          {items.filter(item => !item.complete).length} left to buy
        </div>
      </div>
      <button className="clear-btn" onClick={handleClearCompleted}>clear bought</button>
    </div>
  )
}