import { FaTextHeight } from 'react-icons/fa'

const toggleVisibility = (visibility) => visibility === 'visible' ? 'hidden' : 'visible'

const ToolPicker = ({setFamilyPickerVisibility, setColorPickerVisibility, setSizePickerVisibility}) => {
  return (
    <div className="tool-selector">
      <button className='button tool-selector__item size' onClick={() => setSizePickerVisibility(toggleVisibility)}> <FaTextHeight /></button>
      <button className='button tool-selector__item color' onClick={() =>  setColorPickerVisibility(toggleVisibility)}>c</button>
      <button className='button tool-selector__item family' onClick={() => setFamilyPickerVisibility(toggleVisibility)}>f</button>
    </div>
  )
}

export default ToolPicker