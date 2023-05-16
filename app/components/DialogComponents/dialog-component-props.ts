import { HassEntity } from "../../models/hass/hass-entity";

export interface DialogComponentProps { 
    hassEntity: HassEntity;
    toggle: (entity: HassEntity) => void;
}