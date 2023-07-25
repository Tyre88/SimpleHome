import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { Button, View, ViewStyle } from "react-native";
import { Text } from "../components";
import { RoomModel } from "../models/core/RoomModel";
import { $h1, $margin, spacing } from "../theme";
import { load, save } from "../utils/storage";
import { ScrollView } from "react-native-gesture-handler";
import { navigate, resetRoot } from "../navigators";

export const EditRoomsScreen: FC<any> = observer(function EditRoomsScreen(route) {

    const [rooms, setRooms] = React.useState<RoomModel[]>([]);

    React.useEffect(() => {
        //save('ROOMS', JSON.stringify([]));
        load('ROOMS').then((value) => {
            if (value) {
                setRooms(JSON.parse(value));
                console.log("ROOMS", JSON.parse(value));
            }
        });
    }, [route]);

    const addRoom = () => {
        const room: RoomModel = {
            name: "",
            filter: "",
            entityIds: [],
            id: Math.random().toString(36).substring(7)
        };

        let r = rooms;
        if(r === undefined) {
            r = [];
        }
        const newRooms = [...r, room];

        setRooms(newRooms);

        save('ROOMS', JSON.stringify(newRooms));

        resetRoot();

        navigate("EditRoom", { itemId: room.id });
    };

    return (
        <ScrollView style={$editRoomsOuterWrapper}>
            <View style={$editRoomsWrapper}>
                <Text style={[$h1, $margin.bottom.massive]}>EDIT ROOMS</Text>
                {rooms.map((room: RoomModel, i: number) => 
                    <Text nativeID={room.id} style={[$roomText, $evenOdd[i % 2]]} onPress={() => {navigate("EditRoom", { itemId: room.id })}}>{room.name}</Text>
                )}
                <View style={[$margin.top.extraLarge]}>
                    <Button title="Add room" onPress={() => { addRoom(); }} />
                </View>
            </View>
        </ScrollView>
    );
});

const $evenOdd = [
    { backgroundColor: "#CECECE" },
    { backgroundColor: "#FFFFFF" },
];

const $editRoomsOuterWrapper: ViewStyle = {
    display: "flex",
};

const $editRoomsWrapper: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.huge,
    marginBottom: spacing.huge,
};

const $roomText: ViewStyle = {
    alignContent: "flex-start",
    flex: 1,
    paddingLeft: spacing.large,
    backgroundColor: "#CECECE",
    width: "100%",
    paddingTop: spacing.extraSmall,
    paddingBottom: spacing.extraSmall,
};