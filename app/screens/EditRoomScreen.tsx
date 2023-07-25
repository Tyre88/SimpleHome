import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { Button, SafeAreaView, TextInput, View, ViewStyle } from "react-native";
import { Text } from "../components";
import { RoomModel } from "../models/core/RoomModel";
import { $h1, $margin, spacing } from "../theme";
import { load, save } from "../utils/storage";
import { ScrollView } from "react-native-gesture-handler";
import { navigate } from "../navigators";

export const EditRoomScreen: FC<any> = observer(function EditRoomScreen(nav) {

    const params = nav.route.params;

    const [room, setRoom] = React.useState<RoomModel>({
        name: "",
        filter: "",
        entityIds: [],
        id: ""
    });

    React.useEffect(() => {
        //save('ROOMS', JSON.stringify([]));
        load('ROOMS').then((value) => {
            if (value) {
                const rooms = JSON.parse(value);
                const r = rooms.find((r: RoomModel) => r.id === params?.itemId);
                setRoom(r);
            }
        });
    }, []);

    const onChangeText = (value: string, target: string) => {
        setRoom({ ...room, [target]: value });
    };

    const saveRoom = () => {
        load('ROOMS').then((value) => {
            if (value) {
                const rooms = JSON.parse(value);
                const r = rooms.find((r: RoomModel) => r.id === params?.itemId);
                const index = rooms.indexOf(r);
                rooms[index] = room;
                save('ROOMS', JSON.stringify(rooms));
                navigate("EditRooms", { lastEdited: room.id });
            }
        });
    };

    const deleteRoom = () => {
        load('ROOMS').then((value) => {
            if (value) {
                const rooms = JSON.parse(value);
                const r = rooms.find((r: RoomModel) => r.id === params?.itemId);
                const index = rooms.indexOf(r);
                rooms.splice(index, 1);
                save('ROOMS', JSON.stringify(rooms));
                navigate("EditRooms", { lastEdited: room.id });
            }
        });
    };

    return (
        <ScrollView style={$editRoomsOuterWrapper}>
            <SafeAreaView style={$editRoomsWrapper}>
                <Text style={[$h1, $margin.bottom.massive]}>EDIT ROOM</Text>
                <TextInput style={$input}
                    onChangeText={text => onChangeText(text, 'name')}
                    value={room.name}
                    placeholder="Name"
                />

                <TextInput style={$input}
                    onChangeText={text => onChangeText(text, 'filter')}
                    value={room.filter}
                    placeholder="Filter"
                />

                <View style={[$margin.top.extraLarge, $buttons]}>
                    <Button title="Save" onPress={() => { saveRoom(); }} />
                    <Button title="Delete" onPress={() => { deleteRoom(); }} />
                    <Button title="Cancel" onPress={() => { navigate("EditRooms", { lastEdited: '-1' }) }} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
});


const $editRoomsOuterWrapper: ViewStyle = {
    display: "flex",
    width: '100%'
};

const $editRoomsWrapper: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.huge,
    marginBottom: spacing.huge,
    marginLeft: spacing.huge,
    marginRight: spacing.huge,
};

const $input = {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%'
}

const $buttons: ViewStyle = {
    display: "flex",
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
};