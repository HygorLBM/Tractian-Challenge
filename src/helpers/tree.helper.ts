import { MAX_CONTENT_SIZE } from '../constants/pagination.constants';
import { AssetDTO } from "../dtos/asset.dto";
import { AssetsTreeDTO } from "../dtos/assets-tree.dto";
import { LocationDTO } from "../dtos/location.dto";
import { TreeNodeDTO } from "../dtos/tree-node.dto";

export default class TreeHelper {
    static createAssetTree(companyId: string, locations: LocationDTO[], assets: AssetDTO[], 
        pagedRootLocations:LocationDTO[], pagedRootAssets: AssetDTO[], pagedRootComponents: AssetDTO[]): AssetsTreeDTO {
        let assetTree:AssetsTreeDTO = {companyId: companyId, root: []};
        
        pagedRootLocations.forEach((rootLocation) => {
            assetTree.root.push({
                id: rootLocation.id,
                name: rootLocation.name,
                type: "location",
                energy: null,
                critical: null,
                isCollapsed: false,
                children: TreeHelper.addChildrenToNode(rootLocation.id, 
                    locations.filter((location) => location.parentId !== null), 
                    assets.filter((asset) => asset.parentId !== null || asset.locationId !== null)
                )
            })
        });

        pagedRootAssets.forEach((rootAsset) => {
            assetTree.root.push({
                id: rootAsset.id,
                name: rootAsset.name,
                type: "asset",
                energy: null,
                critical: null,
                isCollapsed: false,
                children: TreeHelper.addChildrenToNode(rootAsset.id, 
                    locations.filter((location) => location.parentId !== null), 
                    assets.filter((asset) => asset.parentId !== null || asset.locationId !== null)
                )
            })
        });

        pagedRootComponents.forEach((rootComponent) => {
            assetTree.root.push({
                id: rootComponent.id,
                name: rootComponent.name,
                type: "component",
                energy: rootComponent.sensorType === "energy",
                critical: rootComponent.status === "alert",
                isCollapsed: false,
                children: []
            })
        });

        return assetTree;
    }

    static addChildrenToNode(id: string, locations: LocationDTO[], assets: AssetDTO[]):TreeNodeDTO[] {
        let childrenNodes: TreeNodeDTO[] = [];
        let childrenLocations:LocationDTO[] = locations.filter((location) => location.parentId === id);
        let childrenAssets: AssetDTO[] = assets.filter((asset) => (asset.parentId === id || asset.locationId === id) && asset.sensorType === null);
        let childrenComponents: AssetDTO[] = assets.filter((asset) => (asset.parentId === id || asset.locationId === id) && asset.sensorType !== null);
    
        childrenLocations.forEach((childLocation) => {
            childrenNodes.push({
                id: childLocation.id,
                name: childLocation.name,
                type: "location",
                energy: null,
                critical: null,
                isCollapsed: true,
                children: this.addChildrenToNode(childLocation.id, 
                    locations.filter((location) => location.parentId !== id), 
                    assets.filter((asset) => asset.parentId !== id && asset.locationId !== id)
                )
            })
        });

        childrenAssets.forEach((childAsset) => {
            childrenNodes.push({
                id: childAsset.id,
                name: childAsset.name,
                type: "asset",
                energy: null,
                critical: null,
                isCollapsed: true,
                children: this.addChildrenToNode(childAsset.id, 
                    locations.filter((location) => location.parentId !== id), 
                    assets.filter((asset) => asset.parentId !== id && asset.locationId !== id)
                )
            })
        });

        childrenComponents.forEach((childComponent) => {
            childrenNodes.push({
                id: childComponent.id,
                name: childComponent.name,
                type: "component",
                energy: childComponent.sensorType === "energy",
                critical: childComponent.status === "alert",
                isCollapsed: true,
                children: []
            })
        });
        
        return childrenNodes;
    }

    static readjustTree(assetsTree:AssetsTreeDTO, expandedRootNodes: number[], viewingNodes: number, rootNodeIndex: number):AssetsTreeDTO {
        const closestToTop = Math.min(...expandedRootNodes);
        const closestToBottom = Math.max(...expandedRootNodes);
        const extraNodes = viewingNodes - MAX_CONTENT_SIZE;
        let readjustedTree: AssetsTreeDTO = {companyId: '', root: []};
        
        if ((extraNodes > closestToTop) && (extraNodes > MAX_CONTENT_SIZE - closestToBottom)) { //Can't readjust cutting root nodes
            readjustedTree = {companyId: assetsTree.companyId, root: assetsTree.root[rootNodeIndex].children}; // traverse to next level
        } else {
            if (MAX_CONTENT_SIZE - closestToBottom > closestToTop) { //Adjust cutting bottom root nodes
                readjustedTree = {companyId: assetsTree.companyId, root: assetsTree.root.slice(0, assetsTree.root.length - extraNodes)}; 
            }
            else { //Adjust cutting top root nodes
                readjustedTree = {companyId: assetsTree.companyId, root: assetsTree.root.slice(extraNodes)};
            }
        }

        return readjustedTree;
    }
}

