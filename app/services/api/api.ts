import { loadString } from "../../utils/storage/storage";
import { navigate } from "../../navigators/navigationUtilities";

/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
  API_TOKEN: ''
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Authorization: "Bearer " + this.config.API_TOKEN,
        Accept: "application/json",
      },
    });

    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    loadString('BASE_URL').then((url) => {
      if (url) {
        console.log('BASE_URL', url);
        this.apisauce.setBaseURL(url);
      }
    });

    loadString('API_TOKEN').then((token) => {
      if (token) {
        this.apisauce.deleteHeader('Authorization');
        this.apisauce.setHeader('Authorization', 'Bearer ' + token);
      }
      else {
        console.log('NAVIGATE TO SETTINGS');
        navigate('Settings');
      }
    });
  }

}

// Singleton instance of the API for convenience
export const api = new Api()
