import { Search } from "lucide-react";
import { useFavoriteContext } from "../../contexts/FavoriteContext"
import CardFavorite from "../../components/ui/CardFavorite";

const Favorite = () => {

    const {favorites} = useFavoriteContext(); 
    console.log('favorites ->', favorites);
    
    return (
        <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
            <div className='bg-white dark:bg-gray-700 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-md p-6'>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Medicos Favoritos</h2>
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Buscar médico..." 
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-400 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Lista de Médicos */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        favorites.length > 0 ? (
                            favorites.map((medico) => <CardFavorite medico={medico} key={medico._id} />)
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center h-full w-full py-16">
                                <span className="text-gray-500 dark:text-gray-300 text-lg">No hay médicos en favoritos</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Favorite