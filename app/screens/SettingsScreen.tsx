import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { View, ViewStyle } from "react-native";
import { Button, Text, TextField } from "../components";
import { $button, $margin } from "../theme";
import { $h1 } from "../theme/texts";
import { loadString, saveString } from "../utils/storage";
import { api } from "../services/api/api";
import { navigate } from "../navigators";

export const SettingsScreen: FC<any> = observer(function SettingsScreen() {

    const [baseURL, setBaseURL] = React.useState<string>("");
    const [token, setToken] = React.useState<string>("");

    const save = () => {
        saveString('BASE_URL', baseURL);
        saveString('API_TOKEN', token);

        api.loadLocalStorageData();
    }

    React.useEffect(() => {
        loadString('BASE_URL').then((value) => {
            setBaseURL(value);
        });

        loadString('API_TOKEN').then((value) => {
            setToken(value);
        });
    }, []);

    return (
        <View style={$settingsWrapper}>
            <Text style={[$h1, $margin.bottom.massive]}>SETTINGS</Text>

            <TextField value={baseURL} 
                onChangeText={(value) => setBaseURL(value)}
                style={$settingsTextField} 
                label="Base URL to HASS"
                placeholder="Base URL to HASS" 
                containerStyle={$settingsContainerStyle} />

            <TextField value={token} 
                onChangeText={(value) => setToken(value)}
                style={$settingsTextField} 
                label="HASS TOKEN"
                placeholder="HASS TOKEN" 
                containerStyle={$settingsContainerStyle} />

            <View style={$settingsContainerStyle}>
                <Button text="Save" 
                    onPress={() => save()}
                    style={[$button.primary, { width: "100%" }]} />
            </View>

            <View style={$settingsContainerStyle}>
                <Button text="Edit rooms" 
                    onPress={() => navigate("EditRooms")}
                    style={[$button.secondary, { width: "100%" }]} />
            </View>
        </View>
    );
});

const $settingsWrapper: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
};

const $settingsTextField: ViewStyle = {
    
};

const $settingsContainerStyle: ViewStyle = {
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
};