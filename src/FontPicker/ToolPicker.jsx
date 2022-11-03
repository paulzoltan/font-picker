import { FaTextHeight } from 'react-icons/fa'

const toggleVisibility = (visibility) => visibility === 'visible' ? 'hidden' : 'visible'

const ToolPicker = ({setFamilyPickerVisibility, setColorPickerVisibility, setSizePickerVisibility}) => {
  return (
    <div className="tool-picker">
      <button className='tool-picker__button tool-picker__button--size' onClick={() => setSizePickerVisibility(toggleVisibility)}> <FaTextHeight /></button>
      <button className='tool-picker__button tool-picker__button--color' onClick={() =>  setColorPickerVisibility(toggleVisibility)}>c</button>
      <button className='tool-picker__button tool-picker__button--family' onClick={() => setFamilyPickerVisibility(toggleVisibility)}>f</button>
    </div>
  )
}

export default ToolPicker