"use client";
import { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { BoxesIcon, GaugeIcon, LayoutIcon, PackageSearchIcon, SettingsIcon, ShoppingCartIcon, TicketPlusIcon, UserRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SideNav() {
  const { user } = useKindeBrowserClient();
  const [isEntradasOpen, setIsEntradasOpen] = useState(false);
  const path = usePathname();

  const menuList = [
    { id: 1, name: 'Dashboard', icon: GaugeIcon, path: '/dashboard' },
    { id: 2, name: 'Ventas', icon: ShoppingCartIcon, path: '/dashboard/ventas' },
    { id: 3, name: 'Clientes', icon: UserRoundIcon, path: '/dashboard/clientes' },
    { id: 4, name: 'Entradas', icon: TicketPlusIcon, path: '/dashboard/entradas' },
    { id: 5, name: 'Productos', icon: PackageSearchIcon, path: '/dashboard/productos' },
    { id: 6, name: 'Categorias', icon: BoxesIcon, path: '/dashboard/categorias' },
    { id: 7, name: 'Configuración', icon: SettingsIcon, path: '/dashboard/configuracion' },
  ];

  const toggleEntradas = () => setIsEntradasOpen(!isEntradasOpen);

  return (
    <div className='border shadow-md h-screen p-5'>
      <Image src='/logo.svg' width={180} height={50} alt='logo' />

      <hr className='my-5' />

      {menuList.map((menu, index) => (
        <div key={menu.id}>
          {menu.name === 'Entradas' ? (
            <>
              <div
                className={`flex items-center gap-3 text-md p-4
                text-slate-500
                hover:bg-primary 
                hover:text-white
                cursor-pointer
                rounded-lg
                my-2
                ${path.includes(menu.path) ? 'bg-primary text-white' : ''}
                `}
                onClick={toggleEntradas}
              >
                <menu.icon />
                {menu.name}
              </div>
              {isEntradasOpen && (
                <div className='ml-4'>
                  <Link href='/dashboard/entradas/nueva'>
                    <h2 className={`text-md p-2 rounded-lg ${path === '/dashboard/entradas/nueva' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-primary hover:text-white'}`}>
                      Nueva Entrada
                    </h2>
                  </Link>
                  <Link href='/dashboard/entradas/todas'>
                    <h2 className={`text-md p-2 rounded-lg ${path === '/dashboard/entradas/todas' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-primary hover:text-white'}`}>
                      Todas las Entradas
                    </h2>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link href={menu.path} key={menu.id}>
              <h2 className={`flex items-center gap-3 text-md p-4
                text-slate-500
                hover:bg-primary 
                hover:text-white
                cursor-pointer
                rounded-lg
                my-2
                ${path === menu.path ? 'bg-primary text-white' : ''}
                `}>
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          )}
        </div>
      ))}

      <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        <Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full' />
        <div>
          <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-xs text-slate-400'>{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
