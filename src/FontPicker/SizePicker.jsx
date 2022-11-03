import {motion} from 'framer-motion'
import {roundTo} from 'round-to'
import { FaTimes, FaArrowUp, FaArrowDown} from 'react-icons/fa'


const SizePicker = ({sizePickerVisibility, setSizePickerVisibility, size, setSize}) => {
  
  const PRECISION = 0.1
  const handleWheel = (event) => {
    setSize(size => roundTo(size - Math.sign(event.deltaY) * PRECISION, 2)) 
  }
  return (
    <motion.div 
      className='popup widget widget--size-picker' 
      style={{visibility: sizePickerVisibility}}
      onWheel={handleWheel}
      drag 
      dragMomentum={false}
      onDragStart={(e) => {e.target.offsetParent.classList.add('popup__dragged')}}
      onDragEnd={(e) => {e.target.offsetParent.classList.remove('popup__dragged')}}
    >
      <button className='popup__close' onClick={() => setSizePickerVisibility('hidden')}><FaTimes /></button>
      <div className='widget--size-picker__figures'>{size}em</div>
      <button className='widget--size-picker__button widget--size-picker__button--arrow-up'
      onClick={() => setSize(s => roundTo(s + 1 * PRECISION, 2))}>
        <FaArrowUp/>
      </button>
      <button className='widget--size-picker__button widget--size-picker__button--arrow-down'
      onClick={() => setSize(s => roundTo(s - 1 * PRECISION, 2))}>
        <FaArrowDown/>
      </button>
    </motion.div>

  )
}

export default SizePicker