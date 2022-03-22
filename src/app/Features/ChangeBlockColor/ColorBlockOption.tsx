import * as React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
//import {} from '@components/Shapes';

export type ColorBlockOptionProps = {
  id: string;
  text: string
};

export const ColorBlockOption = ({
  id,
  text
}: ColorBlockOptionProps): JSX.Element => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(
    false
  );
  const [color, setColor] = React.useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });

  const handleClick = () : void => {
    setDisplayColorPicker(!displayColorPicker)
  };
  
  const handleClose = () : void => {
    setDisplayColorPicker(false)
  };

  const handleChange = (color): void => {
    setColor(color.rgb)
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { displayColorPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ color } onChange={ handleChange } />
      </div> : null }

    </div>
  );
};

/*export const ColorBlockOption = ({
  id,
  text
}: ColorBlockOptionProps): JSX.Element => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(
    false
  );

  const handleClick = () : void => {
    setDisplayColorPicker(!displayColorPicker)
  };
  
  const handleClose = () : void => {
    setDisplayColorPicker(false)
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  return (
    <div>
    <button onClick={ handleClick }>Pick Color</button>
    { displayColorPicker ? <div style={ popover }>
      <div style={ cover } onClick={ handleClose }/>
      <SketchPicker />
    </div> : null }
  </div>
  );
};*/

/*class ButtonExample extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div>
        <button onClick={ this.handleClick }>Pick Color</button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker />
        </div> : null }
      </div>
    )
  }
}

export default SketchExample*/
