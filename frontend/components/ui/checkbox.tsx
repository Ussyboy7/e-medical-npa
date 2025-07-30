import * as React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onCheckedChange, className = "", ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={e => onCheckedChange?.(e.target.checked)}
        className={`rounded border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    )
  }
)

Checkbox.displayName = "Checkbox"
