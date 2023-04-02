import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Navbarcomp from './components/navbar';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Booking from './components/booking';
import Cabs from './components/cabsTable';
import Bookings from './components/bookingTable';


function App() {
  return (
    <div className="App">
        <Navbarcomp />
        <BrowserRouter>
          <Routes>
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookinglist" element={<Bookings/>} />
          <Route path="/cabs" element={<Cabs />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
