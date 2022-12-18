import { types } from "mobx-state-tree";

export interface RoomModel {
    name: string;
    filter: string;
    entityIds: string[];
    id: string;
}

export const RoomModelMobx = types.model("RoomModel").props({
    name: types.string,
    filter: types.string,
    entityIds: types.array(types.string),
    id: types.string,
});

export const RoomsStore = types.model("RoomsStore").props({
    rooms: types.array(RoomModelMobx),
    selectedRoom: types.maybe(RoomModelMobx),
}).actions((self) => ({
    addRoom(room: RoomModel) {
        self.rooms.push(room);
        console.log(self.rooms);
    }
}))
.views((self) => ({
    getRoomById(id: string): RoomModel | undefined {
        return self.rooms.find((r) => r.id === id);
    },
    getRoomByName(name: string): RoomModel | undefined {
        return self.rooms.find((r) => r.name === name);
    }
}));