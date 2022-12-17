export interface HassConfig {
    latitude: number;
    longitude: number;
    elevation: number;
    unit_system: {
        length: string;
        mass: string;
        temperature: string;
        volume: string;
    }
    location_name: string;
    time_zone: string;
    components: string[];
    config_dir: string;
    version: string;
    config_source: string;
    safe_mode: boolean;
    state: string;
    external_url: string;
    internal_url: string;
    language: string;
    country: string;    
}