// import React from 'react';

import { RiSettings3Fill, RiUserAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Settings = () => {
    return (
        <div className="flex items-center gap-5">
            <Link to='/settings/platform' className="border-2 rounded-xl border-gray-200 p-5 flex gap-5 items-center w-sm">
                <RiSettings3Fill className="text-2xl text-[#FF9500]"/>
                <h1 className="text-lg font-semibold">Platform Settings</h1>
            </Link>
            <Link to='/settings/permissions' className="border-2 rounded-xl border-gray-200 p-5 flex gap-5 items-center w-sm">
                <RiUserAddFill className="text-2xl text-[#FF9500]"/>
                <h1 className="text-lg font-semibold">Admin role & permissions </h1>
            </Link>
        </div>
    );
};

export default Settings;