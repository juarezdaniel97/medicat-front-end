import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export const useFavorites = () => {
    const [favorites, setFavorites] = useState( () => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])
    
    const addFavorite = (data) => {
        const isAlReadyFavorite = favorites.some((fav)=> fav._id === data._id);

        if (isAlReadyFavorite) {
            // toast.error("Ya está en favoritos")
            toast('Ya se encuentra en favoritos!', {
            icon: '⚠️',
            });
            return;
        }

        const updateList = [ ...favorites, data];
        setFavorites(updateList);
        toast.success("Agragado a favorito")
    }

    const removeFavorite = (id) => {
        const updateList = favorites.filter((fav) => fav._id !== id );
        setFavorites(updateList);
        toast.error("Eliminado de favorito")
    }

    return{
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite
    }
}