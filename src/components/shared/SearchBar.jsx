import { Search } from "lucide-react"


const SearchBar = ({mobile=false}) => {

    if (mobile) {
        return (
            <div className="pt-2 relative border-t border-gray-200 dark:border-gray-700">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-3 pr-10 py-2 rounded-md text-sm focus:outline-none bg-gray-100 focus:bg-white border-gray-200 dark:bg-gray-800 dark:focus:bg-gray-700 dark:border-gray-700 border"
                />
                <Search size={16} className="absolute right-3 top-5 text-gray-400" />
            </div>
        )
    }

    return (
        <div className="hidden md:block relative">
            <input
                type="text"
                placeholder="Buscar..."
                className="pl-3 pr-10 py-2 rounded-md text-sm w-36 lg:w-48 focus:outline-none bg-gray-100 focus:bg-white border-gray-200 dark:bg-gray-800 dark:focus:bg-gray-600 dark:border-gray-600 border"
            />
            <Search size={16} className="absolute right-3 top-3 text-gray-400" />
        </div>
    )
}

export default SearchBar