//table to display data in each row

function Details({list,handleEditclick}){
    
  return (
          <tr>
              <td>{list['drivername']}</td>
              <td>{list['drivernumber']}</td>
              <td> {list['carnumber']}</td>
              <td>{list['carname']}</td>
              <td>{list['price']}</td>
              <td>{list['startTime']}</td>
              <td>{list['endTime']}</td>
              <td>
              <button type="button" onClick={(e)=>handleEditclick(e,list)}>EDIT </button>
             
              </td>
          </tr>
  )
}

export default Details;