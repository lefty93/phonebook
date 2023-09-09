import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContactPage = () => {
    const [newContact, setNewContact] = useState({ name: '', number: '' })
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if both name and number are not empty
        if (!newContact.name.trim() || !newContact.number.trim()) {
            setError('Both Name and Tel no. are required.');
            return;
        }

        // Reset error state
        setError(null);

        fetch("http://127.0.0.1:5000/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then(resp => {
                if (resp.ok) {
                    setNewContact({ name: '', number: '' });
                    console.log('Contact added successfully');
                } else {
                    console.error('Failed to add contact');
                }
            })
            .catch(error => console.error('Error adding:', error))
        toast(newContact.name + "'s contact is added");

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewContact({ ...newContact, [name]: value });
    }

    return (
        <div className='flex justify-center items-center sm:w-full w-4/5 bg-[#f3f7f8]'>
            <div className="h-full w-full sm:h-96 sm:w-96 flex flex-col justify-start items-center sm:border bg-[#FF96AB] bg-opacity-20 sm:rounded-lg sm:shadow-lg backdrop-blur-md sm:border-[#FF96AB] border-opacity-30">
                <h1 className="text-[32px] my-10">Add New Contact</h1>
                <form action="" method="POST" onSubmit={handleSubmit} className="flex flex-col justify-center ">
                    <label className="text-[18px]">Name</label>
                    <input type="text" className="w-full p-1 my-2 border box-border focus:outline-none focus:ring focus:border-blue-500" name="name"
                        value={newContact.name} onChange={handleInputChange} />
                    <label className="text-[18px]">Tel no.</label>
                    <input type="number" className="w-full p-1 my-2 border box-border focus:outline-none focus:ring focus:border-blue-500" name="number" value={newContact.number} onChange={handleInputChange} />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full border border-blue-700 mt-4">Add</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddContactPage