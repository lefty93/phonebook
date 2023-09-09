import { useState, useEffect } from "react"
import { AiFillSave, AiFillCloseCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";

const PhoneList = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [editedContact, setEditedContact] = useState({ name: '', number: '' })

  // GET METHOD TO RETRIEVE CONTACT FROM DATABASE
  useEffect(() => {
    fetch("http://127.0.0.1:5000/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(resp => resp.json()) // Call resp.json() to parse the JSON response
      .then(resp => setContacts(resp)) // Use 'data' instead of 'json' to log the parsed JSON data
      .catch(error => console.log(error))
  }, [])

  const handleDelete = (contactId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      // Make API request to delete contact by contactId
      fetch(`http://127.0.0.1:5000/delete/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(resp => {
        if (resp.ok) {
          // if the deletion was successful, update the contacts state
          setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId))
        } else {
          console.error("Failed to delete contact")
        }
      })
        .catch(error => console.error('Error delete contact:', error))
    } else {
      console.log("Deletion cancelled by user");
    }
    
  }

  // PUT METHOD TO EDIT DATA
  const handleEdit = (contactId) => {
    // Find the contact to edit based on contactId
    const contactToEdit = contacts.find(contact => contact.id === contactId);

    if (contactToEdit) {
      // Set the contact for editing and populate the editedContact state
      setEditContact(contactToEdit);
      setEditedContact({ name: contactToEdit.name, number: contactToEdit.number });
    }
  };


  const handleSave = () => {
    // Check both 'name' and 'number' empty or not
    if (!editedContact.name.trim() || !editedContact.number.trim()) {
      alert('Either name or number are empty.')
      return;
    }

    fetch(`http://127.0.0.1:5000/update/${editContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedContact)
    })
      .then(resp => {
        if (resp.ok) {
          // if the update is successful, update the list and reset the editing state
          const updatedContacts = contacts.map(contact => contact.id === editContact.id ? { ...contact, ...editedContact } : contact);
          setContacts(updatedContacts)
          setEditContact(null)
          setEditedContact({ name: '', number: '' })
        } else {
          console.error("Failed to update contact")
        }
      })
      .catch(error => console.error('Error updating contact:', error));
  }

  const handleCancel = () => {
    setEditedContact({ name: editContact.name, number: editContact.number })
    setEditContact(null)
  }

  return (
    <>
      <div className="flex justify-center h-[50vh] overflow-y-scroll">
        <table className="w-full h-[25%]">
          <thead className="bg-[#DDDDDD] sticky top-0">
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-1 md:px-2 w-1/3">Name</th>
              <th className="py-2 px-1 md:px-2 w-1/3">Tel.no</th>
              <th className="py-2 px-1 md:px-2 w-1/3">Action</th>
            </tr>
          </thead>

          {/* Sample Row Data */}
          <tbody className="">
            {contacts.map(contact => {
              return (
                <tr key={contacts.id} className="bg-[#F5F5F5] border border-solid">
                  <td className="py-2 px-1 md:px-2 border-r-2">{contact.name}</td>
                  <td className="py-2 px-1 md:px-2 border-r-2">{contact.number}</td>
                  <td className="py-2 px-1 md:px-2 flex flex-col md:flex-row gap-2 sm:gap-4 items-center justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                      onClick={() => handleEdit(contact.id)}><AiFillEdit /></button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                      onClick={() => handleDelete(contact.id)}
                    ><AiFillDelete /></button></td>
                </tr>
              )
            })}
          </tbody>
          
        </table>
      </div>

      {/* Render the edit form when editingContact is not null */}
      {editContact && (
        <>
        <div className='flex flex-col items-start mx-3'>
          <h1 className="text-[32px] my-1">Edit Contact</h1>
          <label className="text-[18px]">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-1 my-2 border box-border focus:outline-none focus:ring focus:border-blue-500"
            value={editedContact.name}
            onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })} />
          <label className="text-[18px]">Tel no.</label>
          <input
            type="text"
            placeholder="Number"
            className="w-full p-1 my-2 border box-border focus:outline-none focus:ring focus:border-blue-500"
            value={editedContact.number}
            onChange={(e) => setEditedContact({ ...editedContact, number: e.target.value })}
          />
          </div>
          <div className="flex justify-end mr-3 gap-1">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out" title="Save"><AiFillSave /></button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out" title="Close"><AiFillCloseCircle /></button>
          </div>
          </>
      )}
    </>
  )
}

export default PhoneList