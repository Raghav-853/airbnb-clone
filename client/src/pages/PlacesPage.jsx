import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuests] = useState(1);

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm"> {text} </p>
        );
    }

    function preInput(header, description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev){
        ev.preventDefault();
        await axios.post('/upload-by-link', {link: photoLink})
    }

    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add new place 
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place, should be short and catchy')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My Farmhouse"/>
                        
                        {preInput('Address', 'Address to this place')}
                        <input type="text"  value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                        {preInput('Photos', 'Photos of the place, more = better')}
                        <div className="flex gap-2">
                            <input 
                            value={photoLink}
                            onChange={ev => setPhotoLink(ev.target.value)}
                            type="text" placeholder="Add using a link (.jpeg/jpg)" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add photo</button>
                        </div>
                        <div className="my-2 grid-grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <button className="felx justify-center border bg-transparent flex rounded-2xl p-8 text-2xl text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                             Upload 
                             </button>
                        </div>
                        {preInput('Description' , 'Description of the place' )}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                        {preInput('Perks', 'What this place offers, Select all the that apply' )}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-2">
                            <Perks selected={perks} onChange={setPerks}/>

                        </div>
                        {preInput('Extra info', 'House rules, etc' )}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        
                        {preInput('Check in & out times', ' add check in and out times, have some time window for cleaning the room between accomodations ')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" 
                                value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)} 
                                placeholder="14"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" 
                                value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)} 
                                placeholder="11"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input type="number" 
                                value={maxGuest} 
                                onChange={ev => setMaxGuests(ev.target.value)}/>
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}