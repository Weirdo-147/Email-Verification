import React ,{useState} from "react";


const Navbar = () => {
    const [activeItem , setActiveItem]=useState(null);
    const handleItemClick=(index)=>{
        setActiveItem(index);
    };
  return (
    <div>
        <div className="bg-[#E4C5FB] bg-opacity-70 center rounded-full absolute top-0 left-0 right-0 mt-0 mb-8" style={{zIndex:1}}>
        <div className="py-4 px-6 text-sm font-medium">
            <ul className="flex justify-center space-x-3">
                <li className={` text-3xl font-medium block px-3 py-2 cursor-pointer mt-6 rounded-md ${activeItem===null ? 'bg-[#6fcca1] text-white' : 'bg-slate-300'}`} onClick={()=>handleItemClick(null)}>
                    <h1>Quantum Auth</h1>
                </li>
            </ul>
        </div>
      <br></br></div>
      
    </div>
  );
};

export default Navbar;
