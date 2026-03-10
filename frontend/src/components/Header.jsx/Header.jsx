import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between mx-9 p-4 bg-transperent">
        <div className="flex flex-1 gap-7 border-l-green-800">
          <p>Logo</p>
          <p>Location</p>
        </div>

        <div className="flex flex-1 justify-evenly ">
          <Link>Home</Link>
          <Link>Explore</Link>
          <Link>Near by</Link>
          <Link>Help</Link>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
