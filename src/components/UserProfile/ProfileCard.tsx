import Button from "../Button"
import person2 from '../../assets/person2.jpg'

const ProfileCard: React.FC = () => {


    return (
        <div className="">
            <h1 className='font-bold text-xl'>Perfil</h1>
            <div className='flex my-8 space-x-4'>
                <div className="flex flex-shrink-0 items-center justify-center w-20 h-20 overflow-hidden relative rounded-full">
                    <img
                        className="w-auto h-auto min-w-full min-h-full object-cover transform scale-125"
                        src={person2}
                        alt=''
                    />
                </div>
                <div className='flex flex-col items-start space-y-4'>
                    <h1 className='font-bold text-xl'>Maria Veller Lopez</h1>
                    <Button text='Editar' />
                </div>
            </div>
        </div>

    )
}

export default ProfileCard