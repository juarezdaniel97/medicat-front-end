
const Navigation = ({mobile=false}) => {

    const navigationItems = [
        { name: 'Inicio', href: '#' },
        { name: 'Servicios', href: '#' },
        { name: 'Sobre Nosotros', href: '#' },
        { name: 'Contacto', href: '#' },
    ];

    if (mobile) {
        return (
            <div className="flex flex-col space-y-2 pb-3">
                {navigationItems.map((item) => (
                <a 
                    key={item.name}
                    href={item.href} 
                    className="px-3 py-2 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800"
                    // className={`px-3 py-2 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-emerald-50'}`}
                >
                    {item.name}
                </a>
                ))}
            </div>
        );
    }

    return (
        <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
                <a 
                    key={item.name}
                    href={item.href} 
                    className="px-3 py-2 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 "
                    //className={`px-3 py-2 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-emerald-50'}`}
                    >
                    {item.name}
                </a>
            ))}
        </div>
    )
}

export default Navigation