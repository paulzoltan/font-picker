import { motion, useDragControls } from 'framer-motion'
import { HexAlphaColorPicker } from "react-colorful"
import { FaTimes } from 'react-icons/fa'


const ColorPicker = ({colorPickerVisibility, setColorPickerVisibility, color, setColor}) => {
  
  const dragControls = useDragControls()

  return (
    <motion.div className='popup' style={{visibility: colorPickerVisibility}}
      drag 
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
    >
      <div className="draghandle"
        onMouseDown={(e) => {
          dragControls.start(e)
        }}
      ><button className='close' onClick={() => setColorPickerVisibility('hidden')}><FaTimes /></button></div>
      <div className='color-picker'>
        <HexAlphaColorPicker color={color} onChange={setColor} />
        <div className="color-text-display">{color}</div>
      </div>
    </motion.div>
  )
}

export default ColorPicker