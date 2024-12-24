import React from "react";
import IconSearch from "./searchIcon"
const Searchbar =()=>{
    return (
        <div className="absolute top-40 left-0 right-0 mt-16 mb-0 ">
            <ul className="flex justify-center space-x-2">
                <li>
                    <input className="opacity-90 w-64 h-10 p-2 rounded-xl" type="search" id="searchid" placeholder="  Search for Peace" ></input>
                </li>
                <li>
                    <div className="mr-4 mt-1 bg-[#f783d8] w-8 rounded-xl flex items-center justify-center cursor-pointer opacity-80">
                        <IconSearch className=" h-8 w-5 text-black-500 " />
                    </div>
                </li>
            </ul>
            
            
        </div>
    );
}
export default Searchbar;