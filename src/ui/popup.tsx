import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '../styles/popup.css'

class Hello extends React.Component {
  render() {
    return (
      <div className="popup-padded">
        <form>
          <div>
            <label htmlFor="inactivity">
              Tempo de inatividade em minutos:
              <br />
              <sub>Em minutos</sub>
            </label>

            <input type="number" placeholder="1" />
          </div>

          <div>
            <button>Aplicar</button>
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
