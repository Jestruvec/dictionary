export type MessageType = "success" | "warning" | "info" | "error";
export type MessageSize = "lg" | "md" | "sm" | "xs";
export type MessageWeight = "bold" | "semibold" | "normal" | "light";

interface Props {
  message: string;
  size?: MessageSize;
  type?: MessageType;
  weight?: MessageWeight;
  className?: string;
}

export const CustomMessage = ({
  message,
  size = "md",
  type = "info",
  weight = "normal",
  className,
}: Props) => {
  const typeClasses = {
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
    info: "text-purple-500",
  };

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const weightClasses = {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
    light: "font-light",
  };

  const messageClasses = `${typeClasses[type]} ${sizeClasses[size]} ${weightClasses[weight]} ${className}`;

  return <p className={messageClasses}>{message}</p>;
};
