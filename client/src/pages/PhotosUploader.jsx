import axios from "axios";
import { useState } from "react";
export default function PhotosUploader({addedPhotos, onChange}){
    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        onChange(prev => {
            return[...prev, filename];
        });
        setPhotoLink('');
    }
    
    function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for (let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {"Content-type":"multipart/form-data"}
        }).then(response =>{
            const {data:filenames} = response;
            onChange(prev => {
                return[...prev, ...filenames];
            })
        })
    }
    return (
        <>
        <div className="flex gap-2">
                            <input 
                            value={photoLink}
                            onChange={ev => setPhotoLink(ev.target.value)}
                            type="text" placeholder="Add using a link (.jpeg/jpg)" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="h-32 flex" key={link}>
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' +link} />
                                </div>
                            ))}
                        <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent flex rounded-2xl p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                             Upload 
                         </label>
                        </div>
        </>
    );
}