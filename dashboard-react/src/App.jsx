import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { SideBar } from './components/sidebar/SideBar'

function App() {
  return (
    <div className='container'>
      <SideBar/>
      <Dashboard/>
    </div>
  )
}

export default App
