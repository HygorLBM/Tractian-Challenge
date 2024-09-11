import { TreeNodeDTO } from "../dtos/tree-node.dto";

export default class FiltersUtil {
    
    static filterEnergyNodes = (nodes: TreeNodeDTO[]):TreeNodeDTO[] => {
        return nodes.filter((node: TreeNodeDTO) => {
            if (node.children.length > 0) {
                node.children = this.filterEnergyNodes(node.children)
                return node.children.length
            }
            return (node.energy !== null && node.energy === true)
        })
    }

    static filterCriticalNodes = (nodes: TreeNodeDTO[]):TreeNodeDTO[] => {
        return nodes.filter((node: TreeNodeDTO) => {
            if (node.children.length > 0) {
                node.children = this.filterCriticalNodes(node.children)
                return node.children.length
            }
            return (node.critical !== null && node.critical === true)
        })
    }

    static filterNodesByText = (nodes: TreeNodeDTO[], text: string):TreeNodeDTO[] => {
        return nodes.filter((node: TreeNodeDTO) => {
            if (node.children.length > 0) {
                node.children = this.filterNodesByText(node.children, text)
                return node.children.length
            }
            return ((node.name.toUpperCase()).includes(text.toUpperCase()))
        })
    }

}