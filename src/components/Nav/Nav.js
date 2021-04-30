import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { FiSun } from "react-icons/fi"; 
import { FaToolbox } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { AiFillLinkedin } from "react-icons/ai";  

const Nav = () => (
    <div className="container bg-pink-400 w-full">
        <div className="px-4 md:px-16">
            <nav className="flex justify-between py-6 text-xl bg-pink-400">
                <Link href="/" passHref>
                    <a className="">
                        Kieran Roberts
                    </a>
                </Link>
                <ul className="flex">
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                <BsSearch />
                            </a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                <FiSun />
                            </a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                <FaToolbox />
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className="bg-pink-400 flex justify-between py-2 text-lg">
                <ul className="flex">
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                Badges
                            </a>
                        </Link>
                    </li>
                </ul>
                <ul className="flex">
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                <ImTwitter />
                            </a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/" passHref>
                            <a>
                                <AiFillLinkedin />
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
)

export default Nav;