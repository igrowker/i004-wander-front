import { UserProfile } from "../../types/user"
import Button from "../Button"

const ProfileCard: React.FC<UserProfile> = ({ name, avatar }) => {


    return (
        <div className="w-full">

            <h1 className='font-bold text-lg'>Perfil</h1>

            <div className='flex mt-6 px-4'>
                <div className="flex flex-shrink-0 items-center justify-center w-24 h-24 overflow-hidden relative rounded-full">
                    <img
                        className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                        src={avatar}
                        alt=''
                    />
                </div>

                <div className='flex flex-col justify-between ml-6'>
                    <h1 className='font-bold text-lg'>{name}</h1>
                    <Button text='Editar' />
                </div>

            </div>
        </div>

    )
}

export default ProfileCard