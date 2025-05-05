import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <div className='w-full h-full'>
      <Navbar/>
      <Manager />
      <Footer/>
      </div>
    </>
  )
}

export default App
