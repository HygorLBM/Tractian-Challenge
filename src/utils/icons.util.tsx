import { TreeNodeDTO } from "../dtos/tree-node.dto";
import bolt_icon from '../assets/bolt_icon.svg';
import green_ellipse_icon from '../assets/green_ellipse_icon.svg';
import red_ellipse_icon from '../assets/red_ellipse_icon.svg';
import location_icon from '../assets/location_icon.png';
import asset_icon from '../assets/asset_icon.png';
import component_icon from '../assets/component_icon.png';
import component_icon_white from '../assets/component_icon_white.png';
import { ReactElement } from "react";
import { ComponentDTO } from "../dtos/component.dto";

export default class IconsUtil {
    static getComponentIconFromNode(node: TreeNodeDTO):ReactElement  {
        if (node.energy === true) {
            return <img className='bolt-icon' src={bolt_icon} alt="bolt-icon" />
        } else {
            if (node.critical === true) {
                return <img className='red-ellipse-icon' src={red_ellipse_icon} alt="red-ellipse-icon" /> 
            }
            return <img className='green-ellipse-icon' src={green_ellipse_icon} alt="green-ellipse-icon" />
        }
    }

    static getIconFromComponent(component: ComponentDTO):ReactElement  {
        if (component.sensorType === 'energy') {
            return <img className='bolt-icon' src={bolt_icon} alt="bolt-icon" />
        } else {
            if (component.status === 'alert') {
                return <img className='red-ellipse-icon' src={red_ellipse_icon} alt="red-ellipse-icon" /> 
            }
            return <img className='green-ellipse-icon' src={green_ellipse_icon} alt="green-ellipse-icon" />
        }
    }

    static getIconFromNodeType(type: string, selectedNode: string, nodeId:string):ReactElement {
        switch (type) {
            case 'location':
                return <img className='location-icon' src={location_icon} alt="location-icon" />
            case 'asset':
                return <img className='asset-icon' src={asset_icon} alt="asset-icon" />
            case 'component':
                if (selectedNode === nodeId) return <img className='component-icon-white' src={component_icon_white} alt="component-icon-white" />
                return <img className='component-icon' src={component_icon} alt="component-icon" />
            default:
                return <></>
        }
    }
}