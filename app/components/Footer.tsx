import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Icon, Text } from "../components";
import { navigate, navigationRef } from "../navigators/navigationUtilities";

export const Footer: FC<any> = observer(function Footer() {
    const getColor = (routeName) => {
        if (routeName === navigationRef?.current?.getCurrentRoute()?.name) {
            return "black";
        }
        return "#C3C3C3";
    };

    return (
        <View style={$footer}>
            <Icon icon="home" onPress={() => navigate("Home")} color={getColor('Home')} style={$footerIcon} />
            <Icon icon="room" onPress={() => navigate("Room")} color={getColor('Room')} style={$footerIcon} />
            <Icon icon="info" onPress={() => navigate("Info")} color={getColor('Info')} style={$footerIcon} />
            <Icon icon="settings" onPress={() => navigate("Settings")} color={getColor('Settings')} style={$footerIcon} />
        </View>
    );
});

const $footer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
};

const $footerIcon: ImageStyle = {
    alignSelf: "center",
    marginRight: 20,
};