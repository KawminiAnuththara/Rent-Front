import { useState } from "react"
import { loadCart } from "../../utils/Cart"

export default function BookingPage(){

    const [cart,setCart] = useState(loadCart());
    
    function reloadCart(){
        setCart(loadCart());
    }

    return(
        <div className="w-full h-full flex flex-col items-center">
            <h1>Create Booking</h1>
            <div className="w-full flex flex-col items-center">
                {
                    
                }
            </div>
        </div>
    )
}