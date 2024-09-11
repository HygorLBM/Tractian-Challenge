export type ComponentDTO = {
    gatewayId: string;
    id: string;
    name: string;
    parentId: string | null;
    sensorId: string;
    sensorType: "vibration" | "energy";
    status: "operating" | "alert";
}