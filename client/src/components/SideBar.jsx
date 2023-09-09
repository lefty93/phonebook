import { AiFillHome, AiFillPlusCircle, AiOutlineUsergroupDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBar = () => {
    const handleDeleteAll = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all contacts?");
        if (confirmDelete) {
            fetch("http://127.0.0.1:5000/delete", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => {
                    if (resp.ok) {
                        console.log('All contacts deleted successfully')
                    } else {
                        console.error('Failed to delete')
                    }
                })
                .catch((error) => {
                    console.error('Error deleting contacts:', error)
                })
            location.reload();
        }   
    }
    return (
        <aside className="bg-[#4c5b70] w-1/5 sm:w-1/12 flex flex-col justify-start items-center">
            <Link to="/" className="mt-5 mb-5" title="Home"><AiFillHome className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px]" /></Link>
            <Link to="/add" className="mt-5 mb-5" title="Add new contact"><AiFillPlusCircle className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px]" /></Link>
            <div className="flex-grow"></div> 
            <button title="Delete All" onClick={handleDeleteAll}><AiOutlineUsergroupDelete className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px] mb-5" /></button>
        </aside>
    )
}

export default SideBar