// form to appear when edit button is clicked

function Editabledetails({editformdata, handleEditformData,handleEditFormSubmit}){
  
  return(
          <tr>
              <td>
              <input type="text" name="drivername" placeholder="drivername" value={editformdata.drivername} onChange={handleEditformData} />
              </td>
              <td>
              <input type="text" name="drivernumber" placeholder="drivernumber" value={editformdata.drivernumber} onChange={handleEditformData} />
              </td>
              <td>
              <input type="text" name="carnumber"  placeholder="carnumber" value={editformdata.carnumber} onChange={handleEditformData}/>
              </td>
              
              <td>
              <input type="text"  name="carname"  placeholder="carname" value={editformdata.carname} onChange={handleEditformData} />
              </td>
              <td>
              <input type="Number"  name="price" placeholder="price" value={editformdata.price} onChange={handleEditformData} />
              </td>
              <td>
              <input type="text"  name="startTime" placeholder="startTime" value={editformdata.startTime} onChange={handleEditformData} />
              </td>
              <td>
              <input type="text"  name="endTime" placeholder="endTime" value={editformdata.endTime} onChange={handleEditformData} />
              </td>
              <td>
                  <button type="submit" onClick={handleEditFormSubmit}>Save</button>
              </td>
          </tr>
      
  )
}

export default Editabledetails;