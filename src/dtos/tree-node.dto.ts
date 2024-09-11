export type TreeNodeDTO = {
    id: string;
    name: string;
    type: "location" | "asset" | "component";
    energy: boolean | null;
    critical: boolean | null;
    children: TreeNodeDTO[];
    isCollapsed: boolean;
}