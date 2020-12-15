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
    <div className="footer">
      <div className="footer__info">
        <div className="footer__left-to-buy">
          {items.filter(item => !item.complete).length} left to buy
        </div>
        <div className="footer__price">
          {items.find(item => item.price) ? `Total price: ${totalPrice()} €` : ''}
        </div>
      </div>
      <button className="btn-large" onClick={handleClearCompleted}>clear bought</button>
    </div>
  )
}