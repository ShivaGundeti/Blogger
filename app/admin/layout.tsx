import Image from 'next/image';
import SideBar from '../components/AdminComponents/SideBar'
import { BlogProvider } from "../components/Context/BlogProvider";

export default function Layout({children}){
    return(
        <>
      <div className='flex flex-wrap md:flex-nowrap h-screen'>
        <SideBar/>
      <div className='flex flex-col w-full overflow-y-auto h-screen'>
         <div className="flex  justify-between items-center mb-8  w-full h-10 p-3 py-6 ">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <Image
            src={`https://robohash.org/${Math.floor(Math.random() * 1000)}`}
            alt="profile"
            className="rounded-full w-10 h-10"
            width={20}
            height={20}
          />
        </div>
<BlogProvider>
        {children}
</BlogProvider>
      </div>
      </div>
    
        </>
    )
}

