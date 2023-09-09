import { AiOutlineSearch } from "react-icons/ai";
import { PiEraser } from "react-icons/pi";
const SearchPanel = () => {
  return (
    <form action="" className="flex sm:justify-end justify-start items-center bg-white shadow-lg p-2">
      <div className="flex items-center border border-gray-300 rounded-full ">
        <span className="text-gray-500 mr-1 ml-2">
          <AiOutlineSearch className="text-xl" />
        </span>
        <input
          type="text"
          className="w-40 md:w-64 lg:w-80 outline-none py-1 px-2 rounded-full"
          placeholder="Search..."
        />
        <button type="button" className="text-gray-500 ml-1 bg-gray-300 rounded-r-full px-3 py-2">
          <PiEraser className="text-xl" />
        </button>
      </div>
    </form>
  )
}

export default SearchPanel