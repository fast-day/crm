import { PaletteIcon, SettingIcon } from "@/shared/icons"
import SvgPerson from "@/shared/icons/Person"
import { Link } from "@tanstack/react-router"

const settings = [
  {
    icon: <SettingIcon />,
    name: "Настройки системы",
    href: "/settings/system",
  },
  {
    icon: <PaletteIcon />,
    name: "Услуги",
    href: "/business/services",
  },
  {
    icon: <SvgPerson />,
    name: "Профиль",
    href: "/me",
  }
]

export const SettingsContent = () => {
  return (
    <div className="mt-8">
      <div className="grid 1100:grid-cols-3! xl:grid-cols-4! sm:grid-cols-2 grid-cols-1 gap-2.5 sm:gap-5">


        {settings.map((item, idx) => (
          <Link to={item.href} key={idx} className="bg-card rounded-2xl sm:px-10 sm:py-12 p-10">
            <div className="flex items-center flex-col gap-2.5">
              <div className="md:size-8 size-6">{item.icon}</div>
              <p className="sm:text-base text-sm">{item.name}</p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}
