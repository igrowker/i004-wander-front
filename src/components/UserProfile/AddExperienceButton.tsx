import Button from "../Button"
import { useNavigate } from 'react-router-dom'

const AddExperienceButton = () => {

    const navigate = useNavigate()

    const handleAddExperience = () => {
        navigate('/anadir-experiencia')
    }

    return (
        <Button text="Añadir una experiencia" onClick={handleAddExperience} />
    )
}

export default AddExperienceButton