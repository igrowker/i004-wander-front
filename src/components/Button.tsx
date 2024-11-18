import { ButtonProps } from '../types/button'

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {

    return (
        <button
            className="bg-brandYellow hover:bg-yellow-500 text-white py-2 px-4 rounded-full w-full"
            {...props}
        >
            {text}
        </button>
    )
}

export default Button