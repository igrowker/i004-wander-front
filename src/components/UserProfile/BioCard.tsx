import { UserBio } from "../../types/user"

const BioCard: React.FC<UserBio> = ({ bio }) => {

    return (
        <div className="w-full">
            <h1 className='font-bold text-lg'>Bio</h1>
            <p className='mt-6'>{bio}</p>
        </div>

    )
}

export default BioCard