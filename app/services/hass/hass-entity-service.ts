import { HassEntity } from "../../models/hass/hass-entity";
import { api } from "../api/api";

class HassEntityService {
    public toggle(entity: HassEntity): Promise<any> {
        console.log(`${api.apisauce.getBaseURL()}/api/services/light/toggle`);
        return api.apisauce.post(`${api.apisauce.getBaseURL()}/api/services/light/toggle`, { entity_id: entity.entity_id })
            .then((response) => { return response.data[0]; });
    }

    public getAll(): Promise<HassEntity[]> {
        return api.apisauce.get(`${api.apisauce.getBaseURL()}/api/states`).then((response) => {
            return response.data as HassEntity[];
        });
    }
}

export const hassEntityService = new HassEntityService();