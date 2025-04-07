interface CustomButtonProps {
    onClick?: () => void;
    text: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text }) => {
    return (
        <div onClick={onClick} className="duration-500 px-6 mb-4 py-3 bg-primary text-primary-foreground rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
            {text}
        </div>
    )
}
export default CustomButton