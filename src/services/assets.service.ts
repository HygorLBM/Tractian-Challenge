import axios from "axios";
import { CompanyDTO } from "../dtos/company.dto";
import { LocationDTO } from "../dtos/location.dto";
import { AssetDTO } from "../dtos/asset.dto";

export const getCompanies = async(): Promise<CompanyDTO[] | null> => {
    return await axios.get("https://fake-api.tractian.com/companies")
        .then(response => {
            return response.data as CompanyDTO[];
        })
        .catch((error => {
            console.error(JSON.stringify(error));
            return null;
        }))
}

export const getLocations = async(companyId: string): Promise<LocationDTO[] | null> => {
    return await axios.get(`https://fake-api.tractian.com/companies/${companyId}/locations`)
        .then(response => {
            return response.data as LocationDTO[];
        })
        .catch((error => {
            console.error(JSON.stringify(error));
            return null;
        }))
}

export const getAssets = async(companyId: string): Promise<AssetDTO[] | null> => {
    return await axios.get(`https://fake-api.tractian.com/companies/${companyId}/assets`)
        .then(response => {
            return response.data as AssetDTO[];
        })
        .catch((error => {
            console.error(JSON.stringify(error));
            return null;
        }))
}