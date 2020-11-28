import React from 'react'

export default function Header({ setFormVisible }) {
  return (
    <header className="header">
      Grocery List
      <div className="header__btn-container">
        <div className="btn-large-round" onClick={() => window.print()}>
          <i className="fas fa-print"></i>
        </div>
        <div type="button" className="btn-large-round" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    </header>
  )
} 