import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          className={cn("pl-10", className)}
        />
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    )
  }
)
InputWithIcon.displayName = "InputWithIcon"

export { InputWithIcon }
