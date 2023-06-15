import React from "react";
import {useCart,useDispatchCart} from '../componets/ContextReducer';


export default function Cart(props){
    let data =useCart();
    let dispatch= useDispatchCart();
    if(data.length === 0 ){
        return (
            <div>
                <div className="m-5 w-100 text-center fs-1">the cart is empty!</div>
            </div>
        )
    }

    // const handleRemove = (index)=>{
    //     console.log(index)
    //     dispatch({type:"REMOVE",index:index})
    //   }

    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      
      let response = await fetch("https://gofood-mjiz.onrender.com/api/OrderData", {
       
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    }
  
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >index</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food ,index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn bg-warning" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} >x</button> </td></tr>
                
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}