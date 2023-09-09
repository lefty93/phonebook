import { AiFillPhone, AiOutlineQuestion } from "react-icons/ai";

const Header = () => {
  return (
    <header className="flex items-center bg-[#FF96AB] w-full gap-3 p-4">
      <AiFillPhone className="w-[32px] h-[32px]" />
      <span className="text-white text-[32px]">Phonebook</span>
      <button className="cursor-pointer w-[28px] h-[28px] rounded-[5px] shadow-md border-none bg-white flex items-center justify-center"><AiOutlineQuestion /></button>
    </header>
  )
}

export default Header