import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import DetailsRow from "./UserProfile/DetailsRow"
import logoutIcon from "../assets/icons/icon-logout.svg"

const Logout: React.FC = () => {

    const { logout } = useContext(AuthContext)

    return (
        <DetailsRow
            field='logout'
            icon={logoutIcon}
            title='Cerrar sesión'
            onClick={logout}
        />
    )
}

export default Logout