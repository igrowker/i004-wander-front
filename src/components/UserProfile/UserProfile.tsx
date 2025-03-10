import { useState, useEffect, useContext } from "react"

import userServices from "../../services/user.services"
import { userInitialValues } from "../../consts/userInitialValues"
import { User } from "../../types/user"
import ProfileCard from "./ProfileCard"
import DetailsCard from "./DetailsCard"
import Logout from "../Logout"
import AddExperienceButton from "./AddExperienceButton"
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context"

const UserProfile: React.FC = () => {

    const path = useLocation();

    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState<User>(userInitialValues)

    const loadUserInfo = async () => {

        try {
            const response = await userServices.getUser()
            setUserInfo(response.data.profile)
            console.log(userInfo)
            

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if(path.pathname === "/user-profile"){
            loadUserInfo()
        }
    }, [])

    const {  email, location, name, phone, role } = userInfo
    const userImage = "https://medvirturials.com/img/default-image.png"
    console.log(userInfo)

    return (
        <div className='flex flex-col items-center mt-4'>
            <div className='w-full px-8 mb-12'>
                <ProfileCard
                    name={name}
                    avatar={user?.avatar || userImage}
                />
            </div>
            {role.toUpperCase() === 'PROVIDER' && (
                <div className='justify-center w-full mb-12'>
                    <AddExperienceButton />
                </div>
            )}
            <div className='w-full px-8 mb-12'>
              
            </div>
            <div className='w-full px-8 mb-12'>
                <DetailsCard
                    email={email}
                    location={location}
                    phone={phone}
                    role={role}
                />
            </div>
            <div className='justify-end w-full px-8 mb-2 '>
                <Logout />
            </div>
        </div>
    )

}

export default UserProfile