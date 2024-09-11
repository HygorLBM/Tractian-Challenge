import { TreeNodeDTO } from "./tree-node.dto";

export type AssetsTreeDTO = {
    companyId: string;
    root: TreeNodeDTO[];
}