import { useAccount } from "@/entities/account";
import { AccountDropdown, LocationDropdown } from "@/features/sidebar";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { account, location } = useSelector(useAccount);
  
  return (
    <div className="min-h-screen w-59 duration-200 flex flex-col bg-accent text-white fixed py-6">
      {!account ? (
        <div>ERROR</div>
      ) : (
        <>
          <div className="space-y-7.5 flex-1">
    
            <div className="px-5">
              <h1 className="text-lg leading-5 font-extrabold">{account?.company?.name}</h1>
              <span className="text-xss leading-3 text-white/70">G CRM</span>
            </div>
    
            <LocationDropdown avatar_url={location?.avatar} name={location?.name ?? ""} selectId={location?.id} locations={account.locations} />
    
            <aside className="px-5">
              aside
            </aside>
          </div>
    
          <div>
    
            <AccountDropdown
              avatar_url={account.avatar}
              first_name={account.first_name}
              last_name={account.last_name}
              name={account.name}
              role={account.role}
            />
    
            <div className="px-5">
              <p className="text-10 font-medium text-white/60">© 2025 CRM. Все права защищены.</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
