import { useNavigate } from "react-router-dom";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DETECTIONS, DRONE_PROFILES } from "@/data/mock";

import { NAV_LINKS } from "./nav-links";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search modules, detections, drone signatures…" />
      <CommandList>
        <CommandEmpty>No matching intelligence records.</CommandEmpty>
        <CommandGroup heading="Modules">
          {NAV_LINKS.map((l) => (
            <CommandItem key={l.to} value={l.label} onSelect={() => go(l.to)}>
              {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Recent Detections">
          {DETECTIONS.slice(0, 6).map((d) => (
            <CommandItem
              key={d.id}
              value={`${d.id} ${d.model} ${d.location}`}
              onSelect={() => go("/detections")}
            >
              <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
              <span className="ml-2">{d.model}</span>
              <span className="ml-auto text-xs text-muted-foreground">{d.location}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Drone Database">
          {DRONE_PROFILES.map((p) => (
            <CommandItem key={p.id} value={p.name} onSelect={() => go("/drones")}>
              {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}