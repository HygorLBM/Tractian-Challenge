import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import data from '../../assets/data.json';
import expand_arrow_icon from '../../assets/expand_arrow.svg';
import { ASSETS_PAGE_SIZE, COMPONENT_PAGE_SIZE, LOCATIONS_PAGE_SIZE, MAX_CONTENT_SIZE, TOTAL_PAGE_SIZE } from '../../constants/pagination.constants';
import { AssetDTO } from '../../dtos/asset.dto';
import { AssetsTreeDTO } from '../../dtos/assets-tree.dto';
import { ComponentDTO } from '../../dtos/component.dto';
import { LocationDTO } from '../../dtos/location.dto';
import { TreeNodeDTO } from '../../dtos/tree-node.dto';
import TreeHelper from '../../helpers/tree.helper';
import { getAssets, getLocations } from '../../services/assets.service';
import { initialState, stateAssets, toggleisFlipped, updateExtraAssets, updateExtraComponents, updateSelectedComponent, updateTotalPages } from "../../store/ducks/assets.slice";
import FiltersUtil from '../../utils/filters.util';
import IconsUtil from '../../utils/icons.util';
import Loader from '../Loader';
import './styles.scss';

const TreeViewer:React.FC = () => {
    const { company, currentPage, filters, extraAssetsInFinalPages, extraComponentsInFinalPages, isLandscape } = useSelector(stateAssets);
    const defaultCompanyData:any = data[company.id as keyof typeof data];
    const locations:MutableRefObject<LocationDTO[]> = useRef([]);
    const assets:MutableRefObject<AssetDTO[]> = useRef([]);
    const unfilteredTree: MutableRefObject<AssetsTreeDTO> = useRef({companyId: company.id , root: []});
    const readjustStackNodes: MutableRefObject<TreeNodeDTO[]> = useRef([]);
    const [assetsTree, setAssetsTree] = useState<AssetsTreeDTO>({companyId: company.id, root: []});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<string>('');
    const [isShowingAllNodes, setIsShowingAllNodes]  = useState<boolean>(false);
    let rootNodeIndex: number = -1;
    let expandedRootNodes: number[] = [];
    let viewingNodes: number = 0;
    const dispatch = useDispatch();

    const fetchData:() => void = () => {
        setIsLoading(true);
        Promise.all([getLocations(company.id), getAssets(company.id)])
            .then((results) => {
                if (results[0] && results[1]) {
                    locations.current = results[0];
                    assets.current = results[1];
                    prepareFetchedDataToTreeBuilding(results[0], results[1]);
                } else {
                    optForOfflineData();
                }
            })
            .catch(() => {
                optForOfflineData();
            })
            .finally(() =>{
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        // Tree is being filtered
        if (JSON.stringify(filters) !== JSON.stringify(initialState.filters)) {
            setIsShowingAllNodes(true);
            if (unfilteredTree.current.root.length === 0) {
                unfilteredTree.current = JSON.parse(JSON.stringify(assetsTree)); //Better to save the unfiltered than fetch again;
            }
            //Always filters text before energy/critical
            if (filters.text) {
                let assetsToBeTextFiltered = JSON.parse(JSON.stringify(unfilteredTree.current.root)); //Can't modify unfilteredTree;
                setAssetsTree({
                    companyId: assetsTree.companyId,
                    root: FiltersUtil.filterNodesByText(assetsToBeTextFiltered, filters.text)
                });
            }
            
            if (filters.energy) {
                setAssetsTree({
                    companyId: assetsTree.companyId,
                    root: FiltersUtil.filterEnergyNodes(assetsTree.root)
                });
            } else if (filters.critical) { 
                setAssetsTree({
                    companyId: assetsTree.companyId,
                    root: FiltersUtil.filterCriticalNodes(assetsTree.root)
                });
            } 
        } else { //Tree is returning to unfiltered state or first mounting
            setIsShowingAllNodes(false);
            if (unfilteredTree.current.root.length > 0) {
                setAssetsTree(unfilteredTree.current);
            }
        }
    },[filters, assetsTree])

    useEffect(() => {
        assets.current = [];
        unfilteredTree.current = {companyId: company.id , root: []}
        dispatch(updateSelectedComponent(null));
        fetchData();
    },[company, currentPage, dispatch]);

    

    const optForOfflineData = () => {
        locations.current = defaultCompanyData.locations as LocationDTO[];
        assets.current = defaultCompanyData.assets as AssetDTO[];
        prepareFetchedDataToTreeBuilding(locations.current, assets.current);
    }

    const prepareFetchedDataToTreeBuilding = (locations: LocationDTO[], assets: AssetDTO[]) => {
        const allRootLocations:LocationDTO[] = locations.filter((location) => location.parentId === null);
        const allRootAssets:AssetDTO[] = assets.filter((asset) => (asset.parentId === null && asset.locationId === null) && asset.sensorType === null);
        const allRootComponents:AssetDTO[] = assets.filter((asset) => (asset.parentId === null && asset.locationId === null) && asset.sensorType !== null);

        const totalRootNodes = allRootLocations.length + allRootAssets.length + allRootComponents.length;
        let totalPages = Math.floor(totalRootNodes / TOTAL_PAGE_SIZE);
        if (totalRootNodes % TOTAL_PAGE_SIZE !== 0) {
            totalPages++; //Page with less than total size
        }
        dispatch(updateTotalPages(totalPages));

        let pagedRootLocations = allRootLocations.slice(currentPage * LOCATIONS_PAGE_SIZE, (currentPage + 1) * LOCATIONS_PAGE_SIZE);
        let pagedRootAssets:AssetDTO[]  = allRootAssets;
        let pagedRootComponents:AssetDTO[] = allRootComponents;
        if (pagedRootLocations.length === LOCATIONS_PAGE_SIZE) {
            pagedRootAssets = pagedRootAssets.slice(currentPage * ASSETS_PAGE_SIZE , (currentPage + 1) * ASSETS_PAGE_SIZE);
            pagedRootComponents = pagedRootComponents.slice(currentPage * COMPONENT_PAGE_SIZE, (currentPage +1) * COMPONENT_PAGE_SIZE); 
        } else {
            addExtraAssetsToLastPages(pagedRootLocations.length, pagedRootAssets, pagedRootComponents);
        }
        setAssetsTree(TreeHelper.createAssetTree(company.id, locations, assets, pagedRootLocations, pagedRootAssets, pagedRootComponents));
    }

    const addExtraAssetsToLastPages = (rootLocationsInPage: number, rootAssets: AssetDTO[], rootComponentes: AssetDTO[]) => {
        let extraAssetsOrComponentsToInsert = TOTAL_PAGE_SIZE - rootLocationsInPage;
        let extraAssetsInserting:number = 0;
        let extraComponentsInserting:number = 0;
        
        const portion = Math.floor(extraAssetsOrComponentsToInsert / 3);
        extraAssetsInserting = Math.min(portion * 2, rootAssets.length - (currentPage * ASSETS_PAGE_SIZE) - extraAssetsInFinalPages);
        extraComponentsInserting = extraAssetsOrComponentsToInsert - extraAssetsInserting;
        
        rootAssets = rootAssets.slice(currentPage * ASSETS_PAGE_SIZE, ((currentPage + 1) * ASSETS_PAGE_SIZE) + extraAssetsInserting);
        rootComponentes = rootComponentes.slice(currentPage * COMPONENT_PAGE_SIZE, ((currentPage + 1) * COMPONENT_PAGE_SIZE) + extraComponentsInserting);
        
        dispatch(updateExtraAssets(extraAssetsInserting + extraAssetsInFinalPages));
        dispatch(updateExtraComponents(extraComponentsInserting + extraComponentsInFinalPages));
    }

    const loadComponentToDetails = (node: TreeNodeDTO) => {
        if (node.type === 'component') {
            let foundAsset = assets.current.find((asset) => asset.id === node.id) as AssetDTO; //casting is safe cause won't be undefined
            dispatch(updateSelectedComponent(foundAsset as ComponentDTO)); //since node.type === 'component' is a prior condition
            setSelectedNode(node.id);
            if(!isLandscape) {
                dispatch(toggleisFlipped());
            }
        }
    }

    const checkTreeReadjustment = (node: TreeNodeDTO, rootNodeIndex: number, e:React.MouseEvent) => {
        e.stopPropagation();
        node.children.forEach((childNode) => childNode.isCollapsed = !childNode.isCollapsed);
        if (!node.children[0].isCollapsed) {
            viewingNodes+= node.children.length;
            expandedRootNodes.push(rootNodeIndex);
            if (viewingNodes > MAX_CONTENT_SIZE) {
                readjustStackNodes.current = assetsTree.root.slice(assetsTree.root.length - (viewingNodes - MAX_CONTENT_SIZE));
                setAssetsTree(TreeHelper.readjustTree(assetsTree, expandedRootNodes, viewingNodes, rootNodeIndex));
            } 
        } else {
            viewingNodes-= node.children.length;
            expandedRootNodes = [...expandedRootNodes.slice(0, expandedRootNodes.indexOf(rootNodeIndex)), 
                                ...expandedRootNodes.slice(expandedRootNodes.indexOf(rootNodeIndex) + 1)];
            if (readjustStackNodes.current.length !== 0) {
                setAssetsTree({companyId: company.id, root:[...assetsTree.root, ...readjustStackNodes.current]});
                readjustStackNodes.current = []; 
            }
        }
    }

    const renderParentNode = (node: TreeNodeDTO, isShowingAllNodes: boolean, rootNodeIndex: number) => {
        if (!node.isCollapsed || isShowingAllNodes) viewingNodes++;
        if (viewingNodes <= MAX_CONTENT_SIZE) {
            return (
                <details id={"details-" + node.id} key={"details-" + node.id} open={isShowingAllNodes} 
                    onClick={(e) => !isShowingAllNodes && checkTreeReadjustment(node, rootNodeIndex, e)}>
                    <summary key={"summary-" + node.id}>
                        <div key={"div-" + node.id}className='each-node'>
                            <div><img className='expand-arrow-icon' src={expand_arrow_icon} alt='expand-arrow-icon' /> </div>
                            {IconsUtil.getIconFromNodeType(node.type, selectedNode, node.id)}
                            <div className='node-name'>{node.name}</div>
                        </div>
                    </summary>
                    <ul key={"ul-" + node.id}>
                        {node.children.map((eachChildren: TreeNodeDTO) => {
                            return(
                                <li key={"li-" + eachChildren.id} className={eachChildren.children.length > 0 ? 'not-final-node' : 'final-node'}>
                                    {eachChildren.children.length > 0 
                                        ? renderParentNode(eachChildren, isShowingAllNodes, rootNodeIndex) 
                                        : renderFinalNode(eachChildren)
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </details>
            )
        } else {
            return <></>
        }
    }

    const renderFinalNode = (node: TreeNodeDTO) => {
        if (!node.isCollapsed || isShowingAllNodes) viewingNodes++;
        if (viewingNodes <= MAX_CONTENT_SIZE) { 
            return (
                <div 
                    className={`each-node 
                            ${node.type === 'component' ? 'detailable-node': ''} 
                            ${selectedNode === node.id ? 'node-selected' : ''}`}
                    key={"div-" + node.id}
                    onClick={() => loadComponentToDetails(node)}
                >
                    <div className='not-expandable-padding'></div>   
                    {IconsUtil.getIconFromNodeType(node.type, selectedNode, node.id)}
                    <div className='node-name'>{node.name}</div>
                    {(node.type === 'component') && IconsUtil.getComponentIconFromNode(node)}
                </div>
            )
        } else {
            return <></>
        } 
    }

    return (
        <ul className="tree">
            {isLoading 
                ? <Loader /> 
                : assetsTree.root.map((eachRootNode) => {        
                    rootNodeIndex++;
                    return (
                    <li key={"li-" + eachRootNode.id}>
                        {eachRootNode.children.length > 0 
                            ? renderParentNode(eachRootNode, isShowingAllNodes, rootNodeIndex) 
                            : renderFinalNode(eachRootNode)}
                    </li>
                )
                
            })}
        </ul>
    )
}

export default TreeViewer;