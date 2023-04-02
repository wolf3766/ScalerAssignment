import {useEffect, useState,Fragment} from "react"
import BookingDetails from "./bookingDetails";
import axios from "axios";

function Bookings(){
    
    const contacts=[]; 
    const [list,setlist]=useState(contacts); 

    const displaycontacts =list 
      .map((value) => { 
        return (
        <Fragment>                
        <BookingDetails list={value} /> 
        </Fragment>
        )
    })

    useEffect(()=>{ 
        axios.get("http://localhost:5000/v1/booking")
        .then(response=>{
            setlist(response.data.payload);
        })
    },[]);

   
return (
        <div >
                <table className="table table-striped overflow-auto"> 
                <thead>
                {/* table header row */}
                    <tr>
                        <th>Email</th>
                        <th>source</th>
                        <th>destination</th>
                        <th>Car Number</th>
                        <th>Driver Name</th>
                        <th>Total Cost</th>
                        <th>Time (min)</th>
                        
                    </tr>
                </thead>
                <tbody>
                {/* calling function display contacts to display latest list of contacts */}
                {displaycontacts}
                </tbody>
            </table>
           </div>
)
}

export default Bookings;