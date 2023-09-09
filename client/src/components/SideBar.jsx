import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <aside className="bg-[#4c5b70] w-1/5 sm:w-1/12 flex flex-col justify-start items-center">
            <Link to="/" className="mt-5 mb-5" title="Home"><AiFillHome className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px]" /></Link>
            <Link to="/add" className="mt-5 mb-5" title="Add new contact"><AiFillPlusCircle className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px]" /></Link>
        </aside>
    )
}

export default SideBar