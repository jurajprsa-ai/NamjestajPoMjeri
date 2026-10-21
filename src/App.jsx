import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import KuhinjaPregled from './pages/kuhinje/KuhinjaPregled'
import KuhinjaNovi from './pages/kuhinje/KuhinjaNovi'
import KuhinjaPromjena from './pages/kuhinje/KuhinjaPromjena'



function App() {

  return (
   <Container>
    <Izbornik />
    <Container className='app'>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.KUHINJE} element={<KuhinjaPregled />} />
        <Route path={RouteNames.KUHINJE_NOVI} element={<KuhinjaNovi />} />
        <Route path={RouteNames.KUHINJE_PROMJENA} element={<KuhinjaPromjena />} />
      </Routes>
    </Container>
    <hr />
    &copy; {IME_APLIKACIJE}
   </Container>
  )
}

export default App
