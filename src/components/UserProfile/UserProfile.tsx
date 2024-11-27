import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../contexts/auth.context"
import userServices from "../../services/user.services"
import { userInitialValues } from "../../consts/userInitialValues"
import { User } from "../../types/user"
import ProfileCard from "./ProfileCard"
import BioCard from "./BioCard"
import DetailsCard from "./DetailsCard"
import Logout from "../Logout"
import AddExperienceButton from "./AddExperienceButton"

const UserProfile: React.FC = () => {

    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState<User>(userInitialValues)

    const loadUserInfo = async () => {

        try {
            const response = await userServices.getOneUser(user?._id!)
            setUserInfo(response.data)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadUserInfo()
    }, [user?._id])

    const { avatar, bio, email, location, name, phone, role } = userInfo

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='w-full px-8 mb-12'>
                <ProfileCard
                    name={name}
                    avatar={avatar}
                />
            </div>
            {role === 'PROVIDER' && (
                <div className='w-full justify-center mb-12'>
                    <AddExperienceButton />
                </div>
            )}
            <div className='w-full px-8 mb-12'>
                <BioCard
                    bio={bio}
                />
            </div>
            <div className='w-full px-8 mb-12'>
                <DetailsCard
                    email={email}
                    location={location}
                    phone={phone}
                    role={role}
                />
            </div>
            <div className=' w-full px-8 mb-2 justify-end'>
                <Logout />
            </div>
        </div>
    )

}

export default UserProfile