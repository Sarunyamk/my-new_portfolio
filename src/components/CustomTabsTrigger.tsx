import React from 'react'
import { TabsTrigger } from "./ui/tabs"
interface Props {
    value: string;
    icon: React.ElementType;
    text: string;
}


const CustomTabsTrigger: React.FC<Props> = ({ value, icon: Icon, text }) => {
    return (
        <TabsTrigger value={value} className="gap-2 hover:scale-105 transition duration-300 ">
            <div className='cursor-pointer flex'>
                <Icon className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">{text}</span>
            </div>
        </TabsTrigger>
    )
}
export default CustomTabsTrigger