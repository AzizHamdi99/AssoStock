import { LayoutDashboard, PackagePlus } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div>
                <PackagePlus />
                <p>AssoStock</p>


            </div>
            <div>
                <div>
                    <LayoutDashboard />
                    <p>Dashboard</p>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


        </div>
    )
}

export default Navbar
