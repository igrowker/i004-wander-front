import arrowRight from '../../assets/icons/icon-arrow-right.svg'

const DetailsRow: React.FC<{
    field: string,
    icon: string,
    title: string,
    data?: string,
    onClick?: () => void
}> = ({ field, icon, title, data, onClick }) => {

    const titleClass = field !== 'logout' ? 'font-bold' : ''

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <div className='flex flex-shrink-0 items-center w-8 h-8 justify-start'>
                    <img src={icon} className=" h-full object-contain" />
                </div>
                <div>
                    <h1 className={`${titleClass} ml-6`}>{title}</h1>
                </div>
            </div>
            <div className="flex items-center justify-start">
                {field === 'bookings' || field === 'logout' ? (
                    <img src={arrowRight} alt='ir' onClick={onClick} className='cursor-pointer' />
                ) : (
                    <>
                        <h1 className="text-gray-500">{data}</h1>
                    </>
                )
                }
            </div>
        </div>

    )
}

export default DetailsRow