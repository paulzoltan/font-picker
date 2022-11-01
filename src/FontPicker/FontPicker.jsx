import {useState} from 'react'
import ToolPicker from './ToolPicker'
import FamilyPicker from './FamilyPicker'
import ColorPicker from './ColorPicker'
import SizePicker from './SizePicker'
import './FontPicker.css'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const FontPicker = ({children, sort, fontNumber}) => {
  const [family, setFamily] = useState("")
  const [color, setColor] = useState("#ffffffff")
  const [size, setSize] = useState(1)
  
  const [familyPickerVisibility, setFamilyPickerVisibility] = useState('visible')
  const [colorPickerVisibility, setColorPickerVisibility] = useState('visible')
  const [sizePickerVisibility, setSizePickerVisibility] = useState('visible')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  

  return (
    <>
      <div style={{fontFamily: family, color, fontSize: `${size}em`}} >{children}</div>
      <ToolPicker {...{setFamilyPickerVisibility, setColorPickerVisibility, setSizePickerVisibility}} />
      <QueryClientProvider client={queryClient}>
        <FamilyPicker {...{familyPickerVisibility, setFamilyPickerVisibility, family, setFamily, sort, fontNumber}}/>
      </QueryClientProvider>
      <ColorPicker {...{colorPickerVisibility, setColorPickerVisibility, color, setColor}}/>
      <SizePicker {...{sizePickerVisibility, setSizePickerVisibility, size, setSize}}/>
    </>
  )
}

export default FontPicker