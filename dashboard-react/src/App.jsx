import './App.css'
import { Dashboard } from './components/Dashboard'
import { SideBar } from './components/SideBar'

function App() {
  return (
    <div className='container'>
      <SideBar/>
      <Dashboard/>
    </div>
  )
}

export default App
