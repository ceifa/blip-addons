import * as React from 'react'

export type BlipsButtonProps = {
  onClick: () => void
}

export const BlipsButton = ({ onClick }: BlipsButtonProps) => (
  <div className="tooltip-button cursor-pointer">
    <button onClick={onClick}>
      <div>
        <i className="icon icon-favorite-on"></i>
      </div>
    </button>

    <div className="text-container">
      <span className="fw3">Blips</span>
    </div>
  </div>
)
