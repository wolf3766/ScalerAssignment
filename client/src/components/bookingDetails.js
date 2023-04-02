//table to display data in each row

function BookingDetails({list,handleEditclick}){
    
    return (
            <tr>
                <td>{list['email']}</td>
                <td>{list['source']}</td>
                <td> {list['destination']}</td>
                <td>{list['carnumber']}</td>
                <td>{list['drivername']}</td>
                <td>{list['fareofbooking']}</td>
                <td>{list['time']}</td>
                
            </tr>
    )
  }
  
  export default BookingDetails;