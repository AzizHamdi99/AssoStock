import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const page = () => {
    return (
        <div>
            <p>Create Product</p>
            <div>
                <div>
                    <input type="text" placeholder='Name' />
                    <input type="text" placeholder='Description' />
                    <input type="number" placeholder='Price' />
                    <input type="number" placeholder='Price' />


                </div>
            </div>

        </div>
    )
}

export default page
