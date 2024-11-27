import { useNavigate } from 'react-router-dom'
import { UserDetails } from '../../types/user'
import detailsList from '../../consts/userProfileFields'
import DetailsRow from './DetailsRow'

const DetailsCard: React.FC<UserDetails> = ({ email, location, phone, role }) => {

    const navigate = useNavigate()
    const dataMap = { email, location, phone }

    const handleBookingsClick = () => {
        if (role === 'TOURIST') {
            navigate('/mis-reservas')
        } else if (role === 'PROVIDER') {
            navigate('/reservas-de-clientes')
        }
    }

    return (
        <div className="w-full">
            <ul className="divide-y divide-gray-200">
                {detailsList.map((deet, i) => {

                    const { field, icon, title } = deet
                    const data = dataMap[field as keyof typeof dataMap] || ''
                    const adjustedTitle = field === 'bookings' && role === 'PROVIDER' ? 'Reservas de Clientes' : title

                    return (
                        <li key={i}>
                            <div className="py-2">
                                <DetailsRow
                                    field={field}
                                    icon={icon}
                                    title={adjustedTitle}
                                    data={data}
                                    onClick={field === 'bookings' ? handleBookingsClick : undefined}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>


        </div>

    )
}

export default DetailsCard