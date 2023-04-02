import {useEffect, useState,Fragment} from "react" 
import Details from "./details"; 
import Editabledetails from "./editabledetails"; //npm package for easy pagination 
import axios from "axios";

//Primary function defined

function Cabs(){
    const [editcontactid,seteditcontactid]=useState(null); // statevariable to store variable id to be edit 
    
    const [editformdata,seteditformdata]=useState({ // state variable to store data after editing
        "_id":"",
        "drivername":"",
        "drivernumber":"",
        "carnumber":"",
        "carname":"",
        "price":0,
        "startTime":"",
        "endTime":""
    })

    const contacts=[]; // an array to store contacts
    const [list,setlist]=useState(contacts); // statevariable to store list retrieved from database 

    const handleEditclick=(e,contact)=>{  // handling edit click button press
        e.preventDefault();   // preventing refresh
        seteditcontactid(contact._id); // setting id of the contact to be updated

        const formvalues={  // saving preexisting values to a const
            _id:contact._id,
            drivername: contact.drivername,
            drivernumber: contact.drivernumber,
            carnumber:contact.carnumber,
            carname:contact.carname,
            price:contact.price,
            startTime:contact.startTime,
            endTime:contact.endTime
        }
        seteditformdata(formvalues); // saving the updated values to editformdata
    }
    
    const handleEditformData = (e)=>{ //handling editing of contacts
        seteditformdata({  //setting new values of data after updation
            ...editformdata,
            [e.target.name]:e.target.value
        });
    }
    console.log(editformdata)

    const handleEditFormSubmit=async (e)=>{ //handling data updation after editing
      await  axios.patch(`http://localhost:5000/v1/updatecab/${editformdata._id}`,{ //patch request to server with all the data   
                drivername: editformdata.drivername,
                drivernumber: editformdata.drivernumber,
                carnumber:editformdata.carnumber,
                carname:editformdata.carname,
                price:editformdata.price,
                startTime:editformdata.startTime,
                endTime:editformdata.endTime
        })
        .then(response =>{ //handling response recieved
            console.log("update",response);
           
            window.location.reload(); // forcing reload for live experience
        });
    }

    const displaycontacts =list //function to displaying whole contact list after searched keyword filter
      .map((value) => { //iterating over the array
        return (
            //to show multiple values in a single coloumn
        <Fragment>                
        {editcontactid===value._id ? <Editabledetails  //display editable form if given condition matches
        editformdata={editformdata}  // passing function editform function as a prop
        handleEditformData={handleEditformData} // passing function handlieditformdata function as a prop
        handleEditFormSubmit={handleEditFormSubmit} /> : // passing function handleeditformsubmit function as a prop

        <Details list={value}  //display original list if given condition matches
        handleEditclick={handleEditclick}  // passing function handleeditclick function as a prop
        /> //passing function handledeleteclick function as a prop
        }  
        </Fragment>
        )
    })

    useEffect(()=>{ //useeffect to get latest list of contact on every page rendring
        axios.get("http://localhost:5000/v1/cabs")
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
                        <th>Driver Name</th>
                        <th>Driver Number</th>
                        <th>Car Number</th>
                        <th>Car Name</th>
                        <th>Price</th>
                        <th>start Time</th>
                        <th>End Time</th>
                        <th>Actions</th>
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

export default Cabs;