import ProfileCard from "./ProfileCard"
import BioCard from "./BioCard"
import DetailsCard from "./DetailsCard"

const UserProfile: React.FC = () => {

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full'>
            <div className=''>
                <ProfileCard />
            </div>
            <div className=''>
                <BioCard />
            </div>
            <div className=''>
                <DetailsCard />
            </div>
        </div>
    )

}

export default UserProfile