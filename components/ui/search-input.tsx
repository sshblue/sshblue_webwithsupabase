import { Input } from "@/components/ui/input"
import { LucideIcon } from "lucide-react"
import { InputHTMLAttributes, forwardRef } from "react"

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  icon?: LucideIcon
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <Input
          {...props}
          ref={ref}
          className={`${className} ${Icon ? "pl-8" : ""}`}
          type="search"
        />
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

export { SearchInput }
