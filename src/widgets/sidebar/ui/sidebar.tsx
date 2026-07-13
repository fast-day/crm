import { useAccount } from "@/entities/account";
import { AccountDropdown, AsideItem } from "@/features/sidebar";
import { useSelector } from "react-redux";
import { SidebarAside } from "./sidebar-aside";
import SvgSetting from "@/shared/icons/Setting";
import { Avatar } from "@/entities/user";
import { SubscribeIcon } from "@/shared/icons";
import { Link } from "@tanstack/react-router";

export const Sidebar = () => {
  const { account } = useSelector(useAccount);
  
  return (
    <div className="min-h-screen w-59 duration-200 flex flex-col bg-accent text-white fixed py-6">
      {!account ? (
        <div>ERROR</div>
      ) : (
        <>
          <div className="space-y-7.5 flex-1">
    
            <Link to={"/settings/system"} className="block">
              <div className="px-5 flex items-center gap-3">
                <Avatar id={account.company?.id ?? "none"} avatar_url={account.company?.logo} className="rounded-xl text-md" size={"md"} name={account.company?.name ?? "none"} opacity={25} />
                <div>
                  <h1 className="text-lg leading-5 font-extrabold text-start capitalize line-clamp-2 break-all">{account?.company?.name}</h1>
                  <div className="flex items-center gap-1">
                    <SubscribeIcon width={10} height={10} className="text-white/60" />
                    <p className="text-10 font-medium text-white/60">Тарифный план (демо)</p>
                  </div>
                </div>
              </div>
            </Link>
    
            {/*
              В ДАННОЙ ВЕРСИИ ЛОКАЦИИ НЕ НУЖНЫ
              ОНИ ТОЛЬКО БУДУТ ПУТАТЬ ПОЛЬЗОВАТЕЛЕЙ
            */}
            {/* {location && <LocationDropdown avatar_url={location.avatar} name={location.name} selectId={location.id} locations={account.locations} />} */}

            <SidebarAside />
          </div>
    
          <div>

            <div className="flex flex-col gap-2 px-5">
              {/* <AsideItem to="/" name="Помощь" className="hover:bg-transparent! px-0" icon={<SvgHelp width={16} height={16}/>} /> */}
              <AsideItem to="/settings" name="Настройки" className="hover:bg-transparent! px-0" icon={<SvgSetting width={20} height={20}/>} />
            </div>
    
            <AccountDropdown
              id={account.id}
              avatar_url={account.avatar}
              first_name={account.first_name}
              last_name={account.last_name}
              full_name={account.full_name}
              role={account.role}
            />
    
            <div className="px-5">
              <p className="text-10 font-medium text-white/60">© 2026 FastDay. Все права защищены.</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
