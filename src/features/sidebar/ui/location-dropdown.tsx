import type { AppDispatch } from "@/app/providers/redux/config";
import { setLocation, type MeLocations } from "@/entities/account";
import SvgChevron from "@/shared/icons/Chevron";
import { Avatar, Button, HoverDropdown, HoverDropdownContent, HoverDropdownItemTrigger, HoverDropdownLabel, HoverDropdownTrigger } from "@/shared/ui"
import { useDispatch } from "react-redux";

interface LocationDropdownProps {
  avatar_url?: string | null;
  name: string;
  locations: MeLocations[];
  selectId?: string;
}

export const LocationDropdown = ({ avatar_url, name, locations, selectId }: LocationDropdownProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectLocation = (loc: MeLocations) => {
    dispatch(setLocation(loc));
  }

  return (
    <HoverDropdown className={"px-5"}>
      <HoverDropdownTrigger>
        <Button variant={"dropdown"} size={"none"} classNameChild={"flex flex-1 items-center !whitespace-normal"}>
          <div className="flex items-center gap-3 flex-1">
            <Avatar avatar_url={avatar_url} name={name.slice(0, 1)} />
            <p className="text-start text-md font-semibold leading-4">{name}</p>
          </div>
          <div className="rotate-90">
            <SvgChevron width={16} height={16}/>
          </div>
        </Button>
      </HoverDropdownTrigger>
      <HoverDropdownContent align={"end"} side={"top_right"} className={"px-0 w-70"}>
        <HoverDropdownLabel>Ваши локации</HoverDropdownLabel>
        {locations.map((loc, idx) => (
          <HoverDropdownItemTrigger
            key={idx} 
            className={`rounded-none ${selectId === loc.id ? "bg-primary text-white/90" : ""}`}
            onClick={() => handleSelectLocation(loc)}
          >
            <Avatar avatar_url={loc.avatar} name={loc.name.slice(0, 1)} />
            <p className="text-start text-md font-semibold leading-3">{loc.name}</p>
          </HoverDropdownItemTrigger>
        ))}
      </HoverDropdownContent>
    </HoverDropdown>
  )
}
