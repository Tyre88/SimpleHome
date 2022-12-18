import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { View, ViewStyle } from "react-native";
import { Text } from "../components";
import { RoomModel } from "../models/core/RoomModel";
import { $h1, $margin } from "../theme";
import { load } from "../utils/storage";

export const EditRoomsScreen: FC<any> = observer(function EditRoomsScreen() {

    const [rooms, setRooms] = React.useState<RoomModel[]>([]);

    React.useEffect(() => {
        load('ROOMS').then((value) => {
            if (value) {
                setRooms(JSON.parse(value));
            }
        });
    }, []);

    return (
        <View style={$editRoomsWrapper}>
            <Text style={[$h1, $margin.bottom.massive]}>EDIT ROOMS</Text>
        </View>
    );
});

const $editRoomsWrapper: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
};