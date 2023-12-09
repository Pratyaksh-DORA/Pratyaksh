import React from "react";
import Jharkand_logo from "../assets/jharLogo.png";
import { MdTranslate } from "react-icons/md";

const Header = () => {
    return (
        <div className="py-2 bg-background sticky w-full h-16 ">
            <div className=" flex items-center justify-between px-6">
                <img className="w-64" src={Jharkand_logo} alt="Jharkand_logo" />
                <button className="flex items-center jusstify-center border border-primary rounded-md text-primary py-1 px-4">
                    <MdTranslate />
                    Translate
                </button>
            </div>
        </div>
    );
};

export default Header;