import React from 'react'

export default function Header({ setFormVisible }) {
  return (
    <div>
      <header>Grocery List</header>
      <div className="btn-header">
        <div className="btn-header__print" onClick={() => window.print()}>
          <i className="fas fa-print"></i>
        </div>
        <div type="button" className="btn-header__add" onClick={() => setFormVisible(true)}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    </div>
  )
}