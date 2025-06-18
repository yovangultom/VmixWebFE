import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import useBanHeroes from "@/hooks/useBanHeroes";
import usePickHeroes from "@/hooks/usePickHeroes";

type SelectHeroProps = {
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
};

const SelectHero = ({ value, setValue, options }: SelectHeroProps) => {
  const [open, setOpen] = useState(false);
  const { blueBanHeroes, redBanHeroes } = useBanHeroes();
  const { bluePickHeroes, redPickHeroes } = usePickHeroes();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value ? options.find((option) => option.value === value)?.label : "Select hero"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px]">
        <Command>
          <CommandInput placeholder="Search hero" className="" />
          <CommandList>
            <CommandEmpty>No hero found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={
                    option.value === value ||
                    blueBanHeroes.includes(option.value) ||
                    redBanHeroes.includes(option.value) ||
                    bluePickHeroes.includes(option.value) ||
                    redPickHeroes.includes(option.value)
                  }
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectHero;
