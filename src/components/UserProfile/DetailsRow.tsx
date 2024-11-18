const DetailsRow: React.FC<{ icon: string, title: string, data: string }> = ({ icon, title, data }) => {


    return (
        <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center space-x-2">
                <img src={icon} />
                <h1 className="font-bold">{title}</h1>
            </div>
            <div>
                <h1 className="text-gray-500">{data}</h1>
            </div>
        </div>

    )
}

export default DetailsRow