import { motion, useDragControls } from 'framer-motion'
import { HexAlphaColorPicker } from "react-colorful"
import { FaTimes } from 'react-icons/fa'


const ColorPicker = ({colorPickerVisibility, setColorPickerVisibility, color, setColor}) => {
  
  const dragControls = useDragControls()

  return (
    <motion.div className='popup widget widget--color-picker' style={{visibility: colorPickerVisibility}}
      drag 
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={(e) => {e.target.offsetParent.classList.add('popup__dragged')}}
      onDragEnd={(e) => {e.target.offsetParent.classList.remove('popup__dragged')}}
    >
      <div className="widget__draghandle"
        onMouseDown={(e) => {
          dragControls.start(e)
        }}
      ><button className='popup__close' onClick={() => setColorPickerVisibility('hidden')}><FaTimes /></button></div>
      <HexAlphaColorPicker color={color} onChange={setColor} />
      <div className="widget--color-picker__text-display">{color}</div>
    </motion.div>
  )
}

export default ColorPicker