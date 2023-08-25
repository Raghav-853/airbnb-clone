import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        });
    }, [id])

    if(!place) return '' ;
    if(showAllPhotos){
        return (
            <div className="absolute inset-0 bg-white min-w-full min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-38">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-8 top-8 flex gap-1 py-2 px-2 rounded-full shadow shadow-black bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {place?.photos?.length >0 && place.photos.map(photo => (
                        <div>
                            <img className="min-h-full min-w-full" src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                    </div>
                </div>
        );
    }
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-2 font-semibold underline" target="_blank" href={"https:/maps.google.com/?q="+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
                </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
                            </div>

                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className=" cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos?.[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className=" cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos?.[2]} alt="" />
                        )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 bg-white rounded-2xl shadow-md shadow-gray-500  right-2 py-2 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    Show more photos</button>
            </div>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-2">
                    <h2 className="text-2xl my-2 semibold">Description</h2>
                    {place.description}
                </div>
                    Check-in time: {place.checkIn}:00 <br />
                    Check-out time: {place.checkOut}:00 <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="text-2xl my-2 semibold">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}