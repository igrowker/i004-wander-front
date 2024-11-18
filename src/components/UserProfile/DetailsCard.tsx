import detailsList from '../../consts/userProfileFields'
import DetailsRow from './DetailsRow'

const DetailsCard: React.FC = () => {



    return (
        <div className="">
            <ul className="divide-y divide-gray-200">
                {detailsList.map((deet, i) => {
                    const { icon, title, data } = deet
                    return (
                        <li key={i}>
                            <div className="py-2 px-8 text-left">
                                <DetailsRow icon={icon} title={title} data={data} />
                            </div>
                        </li>
                    )
                })}
            </ul>


        </div>

    )
}

export default DetailsCard