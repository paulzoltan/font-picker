import FontPicker from './FontPicker/FontPicker'
import './index.css'

function App() {
  const config = {
    //sort: 'date',
    //sort: 'style',
    sort: 'trending',
    fontNumber: 100
  }
  return (
    <FontPicker {...config}>Task Tracker4</FontPicker>
  )
}
export default App;
