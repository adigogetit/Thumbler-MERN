import { MenuIcon, XIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to='/'>
                    <img src="/logo.svg" alt="logo" className="h-8.5 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link to='/' className="hover:text-pink-500 transition">Home</Link>
                    <Link to='/generate' className="hover:text-pink-500 transition">Generate</Link>

                    {isLoggedIn ? <Link to='/my-generation' className="hover:text-pink-500 transition">My-generation</Link>
                        : ""}
                    <Link to='/#' className="hover:text-pink-500 transition">Contact Us</Link>
                </div>

                <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                        <div className="relative group">
                            {/* Avatar */}
                            <button className="size-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-pink-500/30">
                                {user?.name?.charAt(0).toUpperCase()}
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-[#171717] border border-white/10 shadow-2xl
                                            opacity-0 invisible -translate-y-2
                                            group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                            transition-all duration-200 z-50" >
                                {/* Header */}
                                <div className="px-5 py-4 border-b border-white/10">
                                    {user?.name
                                        ?.toLowerCase()
                                        .split(" ")
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")}
                                </div>

                                {/* Logout */}
                                <div className="p-3">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 hover:bg-pink-700 py-2.5 text-white font-medium transition"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full">
                            Get Started
                        </button>
                    )}

                    <button onClick={() => setIsOpen(true)} className="md:hidden">
                        <MenuIcon size={26} className="active:scale-90 transition" />
                    </button>
                </div>

            </motion.nav>


            {/* this is for mobile */}
            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Link onClick={() => setIsOpen(false)} to='/'>Home</Link>
                <Link onClick={() => setIsOpen(false)} to='/generate'>Generate</Link>

                {isLoggedIn ? <Link onClick={() => setIsOpen(false)} to='/my-generation'>My-generation</Link>
                    : ""}

                <Link onClick={() => setIsOpen(false)} to='/#'>Contact us</Link>

                {isLoggedIn ? <button onClick={() => { setIsOpen(false); logout() }}>Logout</button>
                    : <Link onClick={() => setIsOpen(false)} to='/login'>Login</Link>
                }

                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}