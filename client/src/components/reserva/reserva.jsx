import { useState } from "react";
import { createReserva } from "../../utils/reservaFetch";


const CreateReserva = ({onCreate})=>{

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const numGuests = e.target.numGuests.value;
        const reservationDate = e.target.reservationDate.value;
        const reservationTime = e.target.reservationTime.value;
        const data = {name,numGuests,reservationDate,reservationTime };
        console.log("name",data)
        const result = await createReserva(data);
        console.log("result",result)
        onCreate();
    }
    return (
        <form action="" className="create-reserva" onSubmit={handleSubmit}>
            <label htmlFor="name" >Name</label>
            <input type="text" name="name"/>
            <label htmlFor="numGuests" >Guests Number</label>
            <input type="number" name="numGuests"/>
            <label htmlFor="reservationDate" >Reservation Date</label>
            <input type="number" name="reservationDate"/>
            <label htmlFor="reservationTime" >Hour</label>
            <input type="number" name="reservationTime"/>
            <button type="submit">Create</button>
        </form>
    )
}
export default CreateReserva;