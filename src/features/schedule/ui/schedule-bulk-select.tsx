import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select/ui/select-custom";
import { PRESETS } from "../model/lib/bulk-select.util";

interface IScheduleBulkSelectProps {
  isFlexMode: boolean;
  viewYear: number;
  viewMonthIndex: number;
  onPreset: (preset: { value: string }) => void;
}

export const ScheduleBulkSelect = ({ isFlexMode, viewYear, viewMonthIndex, onPreset }: IScheduleBulkSelectProps) => {
  return (
    <Select
      key={`${isFlexMode}-${viewYear}-${viewMonthIndex}`}
      onValueChange={onPreset}
    >
      <SelectTrigger variant="white" size="size_40" className="text-sm font-medium px-4">
        <span>Быстрый выбор</span>
      </SelectTrigger>
      <SelectContent className="p-0 min-w-45">
        {PRESETS.map((p) => (
          <SelectItem
            key={p.value}
            value={{ value: p.value, label: p.label }}
            className="text-sm font-normal py-2.5 px-3.5 hover:bg-border rounded-none"
          >
            {p.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
