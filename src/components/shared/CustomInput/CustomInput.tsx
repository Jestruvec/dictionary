import { CustomMessage } from "../CustomMessage/CustomMessage";

export type Variant = "outlined" | "underlined";
export type Size = "sm" | "md" | "lg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  setValue: (value: string) => void;
  error: string | null;
  hint?: string | null;
  placeholder?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const CustomInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  setValue,
  className,
  disabled,
  error,
  hint,
  icon,
  ...rest
}: Props) => {
  const basicClasses =
    "focus:outline-none w-full focus:ring-2 focus:ring-purple-500 px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded-xl";
  const disabledClasses = disabled ? "opacity-50" : "";
  const inputClasses = `${basicClasses}  ${className} ${disabledClasses}`;

  return (
    <div className="flex flex-col gap-1 ">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...rest}
        />
        <div className="absolute right-0 top-0 bottom-0 flex items-center p-2">
          {icon}
        </div>
      </div>
      {error && <CustomMessage message={error} type="error" size="xs" />}
      {hint && <CustomMessage message={hint} type="info" size="xs" />}
    </div>
  );
};
