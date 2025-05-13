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
        const isAlReadyFavorite = favorites.some((fav)=> fav.id === data.id);

        if (isAlReadyFavorite) {
            toast.info("Ya está en favorito");
            return;
        }

        const updateList = [ ...favorites, data];
        setFavorites(updateList);
        toast.success("Agragado a favorito")
    }

    const removeFavorite = (id) => {
        const updateList = favorites.filter((fav) => fav.id !== id );
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