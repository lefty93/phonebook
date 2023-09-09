import SearchPanel from "../components/SearchPanel"
import PhoneList from "../components/PhoneList"
const Home = () => {
  return (
      <div className="flex flex-col sm:w-full w-4/5 overflow-y-hidden">
          <SearchPanel />
          <PhoneList />
    </div>
  )
}

export default Home