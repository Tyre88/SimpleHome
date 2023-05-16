import { makeAutoObservable } from "mobx";
import { flow } from "mobx-state-tree";
import { hassEntityService } from "../../services/hass/hass-entity-service";

export class HassEntity {
    entity_id: string;
    state: string;
    attributes: any;
    last_changed: string;
    last_updated: string;
    context: any;
    entity_picture: string;
    get key(): string {
        return this.entity_id;
    }
}

class HassEntityStore {
    entities: HassEntity[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addEntity(entity: HassEntity) {
        this.entities.push(entity);
    }

    removeEntity(entity: HassEntity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }

    updateEntity(entity: HassEntity) {
        const index = this.entities.findIndex((r) => r.entity_id === entity.entity_id);
        this.entities[index] = entity;
    }

    setEntities(entities: HassEntity[]) {
        this.entities = entities;
    }

    fetchEntities() {
        hassEntityService.getAll().then((entities) => {
            this.setEntities(entities);
        });
    }

    getAllEntities(): HassEntity[] {
        return this.entities;
    }

    getEntityById(id: string): HassEntity | undefined {
        return this.entities.find((r) => r.entity_id === id);
    }

    getEntityByName(name: string): HassEntity | undefined {
        return this.entities.find((r) => r.entity_id === name);
    }
}

const hassEntityStore = new HassEntityStore();
export default hassEntityStore;