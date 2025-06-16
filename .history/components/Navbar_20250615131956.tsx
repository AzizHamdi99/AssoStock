import { UserButton } from '@clerk/nextjs'
import { HandCoins, LayoutDashboard, ListTree, PackagePlus, Receipt, ShoppingBasket, Warehouse } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <PackagePlus />
                <p>AssoStock</p>


            </div>
            <div className='flex items-center gap-5'>
                <div>
                    <LayoutDashboard />
                    <p>Dashboard</p>
                </div>
                <div>
                    <ShoppingBasket />
                    <p>Products</p>
                </div>
                <div>
                    <PackagePlus />
                    <p>New Product</p>
                </div>
                <div>
                    <ListTree />
                    <p>Categories</p>
                </div>
                <div>
                    <HandCoins />
                    <p>Sell</p>
                </div>
                <div>
                    <Receipt />
                    <p>Transactions</p>
                </div>
                <div>
                    <Warehouse />
                    <p>Refill Stock</p>
                </div>
                <UserButton />

            </div>


        </div>
    )
}

export default Navbar
