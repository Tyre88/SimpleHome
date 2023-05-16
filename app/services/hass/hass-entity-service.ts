import { HassEntity } from "../../models/hass/hass-entity";
import { api } from "../api/api";

class HassEntityService {
    private whiteListToggleDomains: string[] = [
        "light",
        "switch",
    ];

    public toggle(entity: HassEntity): Promise<any> {
        if(this.whiteListToggleDomains.includes(this.getDomain(entity))) { 
            return api.apisauce.post(`${api.apisauce.getBaseURL()}/api/services/${this.getDomain(entity)}/toggle`, { entity_id: entity.entity_id })
                .then((response) => { return response.data[0]; });
        }
        else {
            return new Promise(resolve => resolve(null));
        }
    }

    private getDomain(entity: HassEntity): string {
        return entity.entity_id.split('.')[0];
    }

    public getAll(): Promise<HassEntity[]> {
        return api.apisauce.get(`${api.apisauce.getBaseURL()}/api/states`).then((response) => {
            return response.data as HassEntity[];
        });
    }

    public setState(state: any): Promise<any> {
        return api.apisauce.post(`${api.apisauce.getBaseURL()}/api/states/${state.entity_id}`, state)
            .then((response) => { return response.data; });
    }
}

export const hassEntityService = new HassEntityService();