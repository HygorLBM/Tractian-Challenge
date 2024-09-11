export type AssetDTO = {
    gatewayId: string;
    id: string;
    name: string;
    locationId: string | null;
    parentId: string | null;
    sensorId: string;
    sensorType: string | null;
    status: string;
}