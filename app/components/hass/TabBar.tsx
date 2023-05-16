import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { Icon, Text } from "../../components";
import { View } from "react-native";
import { spacing } from "../../theme";

export const TabBar: FC<any> = observer(function TabBar(props: any) {
    const getColor = (index: number) => {
        if (props.navigationState.index === index) {
            return 'black';
        }
        return 'gray';
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", 
            paddingBottom: spacing.medium,
            paddingTop: spacing.medium }}>
            { props.navigationState.routes.map((route: any, index: number) => <Icon size={16} onPress={e => {
                props.jumpTo(route.key);
            }} icon='dot' color={getColor(index)}></Icon> ) }
        </View>
    );
});