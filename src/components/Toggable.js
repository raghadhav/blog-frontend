import { render } from '@testing-library/react'
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  //if (props.offState && props.offState() === true) return null;
  return (
    <div className="toggleForm">
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility} className="btn btn-success" >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn btn-secondary" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
export default Toggable