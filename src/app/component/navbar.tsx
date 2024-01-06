import React from "react";

function Navbar() {
  return (
    <div className="navbar fixed bg-[#FAFBF4]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl text-[#000066]"
          >
            <li>
              <a  className="text-[#000066]" href="/GCM">GCM</a>
            </li>
            <li>
              <a href="/H_E">Bayesian</a>
            </li>
            {/* <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <a href="/" className="font-bold ml-3 p-2  text-4xl text-[#00A0F3] hover:text-[#fafbf4] hover:bg-[#00A0F3] rounded-xl">
          CCS
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl -ml-20 text-[#000066] ">
          <li >
            <a className="hover:bg-[#000066]  hover:text-[#fafbf4] mr-2" href="/GCM" >GCM</a>
          </li>
          <li>
            <a className="hover:bg-[#000066]  hover:text-[#fafbf4] mr-2" href="/H_E">Bayesian</a>
          </li>
          {/* <li>
            <a className="hover:bg-[#000066]  hover:text-[#fafbf4] mr-2">Item 3</a>
          </li> */}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
}

export default Navbar;
