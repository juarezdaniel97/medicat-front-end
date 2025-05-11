

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center dark:bg-emerald-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-300"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-300"> MediCat </span>
        </div>
    )
}

export default Logo