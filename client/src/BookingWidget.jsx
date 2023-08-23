export default function BookingWidget(){
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                        <div className="text-2xl text-center">
                            Price:₹{place.price} / per night
                        </div>
                        <div className="border rounded-2xl">
                            <div className="flex">
                                <div className="py-3 px-4">
                                    <label>Check in:</label>
                                    <input type="date"/>
                                </div>
                                <div className="py-3 px-4 border-l">
                                    <label>Check Out:</label>
                                    <input type="date"/>
                                </div>
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Number of Guests:</label>
                                <input type="number" value={1}/>
                            </div>
                        </div>
                        <button className="primary mt-4">Book this place</button>
                    </div>
    );
}