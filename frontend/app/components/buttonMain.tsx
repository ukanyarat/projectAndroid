import { Text, View, TouchableOpacity } from "react-native";

type ButtonProps = {
    title: string;
    btnColor?: "primary" | "secondary" | "danger";
    onPress: () => void;
    btnSize?: "small" | "medium" | "large" | "full";
};

export const ButtonMain = ({
    title,
    btnColor = "primary",
    onPress,
    btnSize = "medium",
}: ButtonProps) => {
    const btnColorClasses = {
        primary: "bg-blue-500 active:bg-opacity-70 hover:bg-blue-700",
        secondary: "bg-gray-500 active:bg-opacity-70 hover:bg-gray-700",
        danger: "bg-red-500 active:bg-opacity-70 hover:bg-red-700",
    };

    const btnSizeClasses = {
        small: "px-2 py-1 text-xs",
        medium: "px-4 py-2 text-sm",
        large: "px-6 py-3 text-base",
        full:"w-full"

    };

    return (
        <TouchableOpacity
            className={[
                "rounded-lg",
                "self-start",
                "px-4 py-2 mt-3", 
                btnColorClasses[btnColor],
                btnSizeClasses[btnSize],
            ].join(" ")}
            onPress={onPress}
        >
            <Text className="text-white font-bold text-center">{title}</Text>
        </TouchableOpacity>
    );
};
