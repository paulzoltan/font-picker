import {motion} from 'framer-motion'
import {roundTo} from 'round-to'
import { FaTimes, FaArrowUp, FaArrowDown} from 'react-icons/fa'


const SizePicker = ({sizePickerVisibility, setSizePickerVisibility, size, setSize}) => {
  
  const PRECISION = 0.1
  const handleWheel = (event) => {
    setSize(size => roundTo(size - Math.sign(event.deltaY) * PRECISION, 2)) 
  }
  return (
    <motion.div className='popup' style={{visibility: sizePickerVisibility}}
      drag 
      // dragControls={dragControlsSize}
      dragMomentum={false}
    >
      <button className='close' onClick={() => setSizePickerVisibility('hidden')}><FaTimes /></button>
      <div className='font-sizer' onWheel={handleWheel}>
        <div className='font-sizer__figures'>{size}em</div>
        <button className='font-sizer__arrow-up' onClick={() => setSize(s => roundTo(s + 1 * PRECISION, 2))}><FaArrowUp/></button>
        <button className='font-sizer__arrow-down' onClick={() => setSize(s => roundTo(s - 1 * PRECISION, 2))}><FaArrowDown/></button>
      </div>
    </motion.div>

  )
}

export default SizePicker