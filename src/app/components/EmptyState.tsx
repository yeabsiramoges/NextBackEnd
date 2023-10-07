const EmptyState = () => {
    return (
        <div>
            <div 
                className="
                    px-4
                    py-96
                    sm:px-6
                    lg:px-8
                    h-fit
                    flex
                    justify-center
                    bg-gray-100
            ">
                <div className="text-center items-center flex flex-col">
                    <h3 className="
                        mt-2
                        text-2xl
                        font-semibold
                        text-gray-900
                    ">
                        Choose a meeting group or create a new summary.
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default EmptyState;