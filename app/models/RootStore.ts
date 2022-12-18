import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { load } from "../utils/storage";
import { RoomModel, RoomModelMobx, RoomsStore } from "./core/RoomModel"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    // roomsStore: types.maybe(RoomsStore),
    // entitiesStore: types.maybe(HassEntitiesStore)
});

// .actions((self) => ({
//     addRoom(room: RoomModel) {
//         self.roomsStore.addRoom(room);
//     },
//     removeRoom(room: RoomModel) {
//         self.roomsStore.rooms.remove(RoomModelMobx.create(room));
//     },
//     updateRoom(room: RoomModel) {
//         const index = self.roomsStore.rooms.findIndex((r) => r.id === room.id);
//         self.roomsStore.rooms[index] = RoomModelMobx.create(room);
//     },
// })).views((self) => ({
//     getRoomById(id: string): RoomModel | undefined {
//         return self.roomsStore.getRoomById(id);
//     },
//     getRoomByName(name: string): RoomModel | undefined {
//         return self.roomsStore.getRoomByName(name);
//     },
//     getAllRooms(): RoomModel[] {
//         if(self.roomsStore.rooms.length === 0)
//         {
//             load("rooms").then((rooms) => {
//                 if (rooms) {
//                     self.roomsStore.rooms = rooms;
//                 }
//             });
//         }

//         return self.roomsStore.rooms;
//     }
// }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
