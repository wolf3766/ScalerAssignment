import axios from "axios"
import "../styles/addBooking.css"
import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Dp=(prop)=>{ 
  return (
    <div>
     <h3>Minimum Time taken is {prop.data}</h3> 
     <h3>Total Fare {prop.cab*prop.data}</h3>
    </div>
  )
}
function Booking(){

    const nav=useNavigate();
    const data=[];
    const [allVal,setAllVal]=useState(0);
    const [totalFare,setTotalFare]=useState(0);
    const [minDist,setMinDist]=useState(null);
    const [list,setList]=useState(data);
    const [formdata,setformdata]=useState({ //state variable to store data of new contact
        "email":"",
        "source":-1,
        "destination":-1,
        "cabId":""
    });
    const handlechange=(e)=>{ //function to dynamically store data on change
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        }) 
        setAllVal(allVal+1);

    }
    
    const handlesubmit =async (e)=>{ // fucntion used to add data to backend
        e.preventDefault();
          await axios.post("http://localhost:5000/v1/create/booking",{
            email:formdata.email,
            source:formdata.source,
            destination:formdata.destination,
            cabId:formdata.cabId,
          })
          .then(response=>{
              console.log("post",response);
              nav("/bookinglist");
          });
      }

    useEffect(()=>{
        axios.get("http://localhost:5000/v1/cabs")
            .then(response=>{
                console.log(response)
                setList(response.data.payload);
            })
    },[]);  

    useEffect(()=>{
      if(allVal>=4){
      setTotalFare(list.find(item=>item._id===formdata.cabId).price)
        axios.get(`http://localhost:5000/v1/minimumTime?source=${formdata.source}&destination=${formdata.destination}`)
          .then(response=>{
              setMinDist(response.data.payload)
          })
      }
    },[allVal])
    
    return( 
    <div class="main">
    <form onSubmit={handlesubmit}>
  <div class="form-row">
    <div class="form-group ">
      <label for="Email">Email</label>
      <input type="text" class="form-control" name="email" required placeholder="Email"  onChange={handlechange} />
    </div>
  </div>
  <div class="form-group">
    <label for="Source">Source</label>
    <select name="source" onChange={handlechange}>
      <option>Choose a Source</option>
      <option key={0} value={0}>0</option>
      <option key={1} value={1}>1</option>
      <option key={2} value={2}>2</option>
      <option key={3} value={3}>3</option>
      <option key={4} value={4}>4</option>
      <option key={5} value={5}>5</option>
      <option key={6} value={6}>6</option>
      <option key={7} value={7}>7</option>
      <option key={8} value={8}>8</option>
      </select>
  </div>
  
  <div className="sec">
    <div class="form-group ">
      <label for="Destination">Destination</label>
      <select name="destination" onChange={handlechange}>
      <option>Choose a destination</option>
      <option key={0} value={0}>0</option>
      <option key={1} value={1}>1</option>
      <option key={2} value={2}>2</option>
      <option key={3} value={3}>3</option>
      <option key={4} value={4}>4</option>
      <option key={5} value={5}>5</option>
      <option key={6} value={6}>6</option>
      <option key={7} value={7}>7</option>
      <option key={8} value={8}>8</option>
      </select>
    </div>
    <div class="form-group">
        <label for="Select a Cab">Cabs</label>
        <select name="cabId" onChange={handlechange}>
        <option>Choose a Cab</option>
            {list 
            ? list.map((ele)=>{
                return <option key={ele._id} value={ele._id} >{ele.carname} </option>
            }):null}
        </select>
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Book</button>
</form>
    {minDist? <Dp data={minDist} cab={totalFare} />:null }
    </div>
    )
}

export default Booking;