import { Link, useNavigate } from 'react-router-dom';
import FiberyLogo from "../images/logo.png";

const AppBar = () => {
    const navigate = useNavigate();  // Initialize navigate hook

    const NavbarItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/Dashboard" },
    ];

    return (
        <div>
            <div className="flex gap-1 md:gap-4 p-4 items-center justify-between ">
                <div className="flex gap-8 items-center">
                    <div className="text-2xl font-bold flex gap-2">
                        <img
                            src={FiberyLogo}
                            width="30"
                            height="30"
                            alt="company logo"
                            className="hidden md:block"
                        />
                        SyncUp
                    </div>

                    <div className='flex justify-between items-center  '>
                        <div>
                            <div className="flex gap-4">

                                {NavbarItems.map((item) => (
                                    <Link
                                        to={item.path}
                                        key={item.name}
                                        className="text-gray-700 hover:text-blue-500"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                      
                    </div>
                </div>
                <div className='flex gap-2'>
                            <div
                                className="border-2 cursor-pointer p-2 border-black rounded-sm hover:bg-gray-200"
                                onClick={() => navigate("/schedule")} // Use navigate here
                            >
                                Start a New Meeting
                            </div>

                            <div className="border-2 cursor-pointer p-2 border-black bg-black text-white rounded-sm">
                                Signup
                            </div>
                        </div>
            </div>
        </div>
    );
};

export default AppBar;
