import { Text, View, FlatList } from 'react-native'
import { ButtonMain } from './buttonMain';

type ProductItemCardProps = {
    productName: string;
    price: number;
    pcs: number;

    //btn
    titleBtn: string;
    btnColor?: "primary" | "secondary" | "danger";
    btnSize?: "small" | "medium" | "large";
    onPress: () => void;

}

export const ProductItemCardMain = ({
    productName,
    price,
    pcs,

    //btn
    titleBtn,
    btnColor = "primary",
    btnSize = "medium",
    onPress
}: ProductItemCardProps) => {

    return (
        <>

            <View className="p-4 bg-gray-300 rounded-xl mb-4">
                <Text className="text-[36px] font-bold">ชื่อสินค้า : {productName}</Text>
                <Text className="text-[16px]">ราคา : {price}</Text>
                <Text className="text-[16px]">จํานวน : {pcs}</Text>
                <ButtonMain
                    title={titleBtn}
                    btnColor={btnColor}
                    onPress={onPress}
                    btnSize={btnSize}
                />
            </View>
        </>
    )
};
