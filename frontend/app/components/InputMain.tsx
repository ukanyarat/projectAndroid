import { Text, View, TextInput } from "react-native";


type CustomInputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
}
export const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
}: CustomInputProps) => {

    return (
        <>
                <Text className="text-black font-bold text-left">{label}</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 bg-white"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                />
        </>
    )
};