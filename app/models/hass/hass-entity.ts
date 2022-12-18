import { makeAutoObservable } from "mobx";
import { flow, types } from "mobx-state-tree";
import { HassEntityService } from "../../services/hass/hass-entity-service";

export class HassEntity {
    entity_id: string;
    state: string;
    attributes: any;
    last_changed: string;
    last_updated: string;
    context: any;
}

class HassEntityStore {
    entities: HassEntity[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addEntity(entity: HassEntity) {
        this.entities.push(entity);
    }

    setEntities(entities: HassEntity[]) {
        this.entities = entities;
    }
}

const hassEntityStore = new HassEntityStore();
export default hassEntityStore;

// export const HassEntityModel = types.model("HassEntity").props({
//     entity_id: types.string,
//     state: types.string,
//     attributes: types.frozen(),
//     last_changed: types.string,
//     last_updated: types.string,
//     context: types.frozen(),
// });

// export const HassEntitiesStore = types.model("HassEntitiesStore").props({
//     entities: types.array(HassEntityModel),
// }).actions((self) => ({
//     addEntity(entity: HassEntity) {
//         self.entities.push(entity);
//     },
//     removeEntity(entity: HassEntity) {
//         self.entities.remove(HassEntityModel.create(entity));
//     },
//     updateEntity(entity: HassEntity) {
//         const index = self.entities.findIndex((r) => r.entity_id === entity.entity_id);
//         self.entities[index] = HassEntityModel.create(entity);
//     },
//     fetchEntities: flow(function* () {
//         const hassEntityService = new HassEntityService();
//         self.entities = yield hassEntityService.getAll();
//     }),
// }))
// .views((self) => ({
//     getEntityById(id: string): HassEntity | undefined {
//         return self.entities.find((r) => r.entity_id === id);
//     },
//     getEntityByName(name: string): HassEntity | undefined {
//         return self.entities.find((r) => r.entity_id === name);
//     },
//     getAllEntities(): HassEntity[] {
//         return self.entities;
//     }
// }));