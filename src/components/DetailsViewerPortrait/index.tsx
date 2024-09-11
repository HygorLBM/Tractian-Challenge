import { useDispatch, useSelector } from "react-redux";
import { stateAssets, toggleisFlipped } from "../../store/ducks/assets.slice";
import tree_icon from "../../assets/tree_icon.svg";
import IconsUtil from "../../utils/icons.util";
import receptor_icon from '../../assets/receptor_icon.svg';
import sensor_icon from '../../assets/sensor_icon.svg';
import { useEffect, useState } from "react";
import { FakeInfoDTO } from "../../dtos/fake-info.dto";
import { componentMocks } from "../../mocks/component.mock";
import './styles.scss';

const DetailsViewerPortrait:React.FC = () => {
    const {selectedComponent} = useSelector(stateAssets);
    const [componentInfo, setComponentinfo] = useState<FakeInfoDTO>(componentMocks[0]);
    const dispatch = useDispatch();

    const fakeInfoSelector = (componentName: string):FakeInfoDTO => {
        const infoSet = (componentName.charCodeAt(0) + componentName.charCodeAt(componentName.length -1)) % 3; //Divide in 3 possible results
        switch (infoSet) {
            case 0:
                return componentMocks[0];
            case 1:
                return componentMocks[1];
            case 2:
                return componentMocks[2];
            default:
                return componentMocks[0];
        }
    }

    useEffect(() => {
        if (selectedComponent) setComponentinfo(fakeInfoSelector(selectedComponent.name));
    },[selectedComponent])

    const renderMainInfo  = () => {
        return (
            <div className='component-main-info-portrait'>
                <div className='component-type'>
                    <div className="info-title">Tipo de equipamento</div>
                    <div className='info-content margin-right'>Motor Elétrico (Trifásico)</div>
                </div>
                <div className='component-responsible'>
                    <div className="info-title">Responsáveis</div>
                        <div className="info-content">
                            <img className='content-icon' src={componentInfo.responsibleIcon} alt="responsible-icon" />
                        <div className='content-name'> {componentInfo.responsible} </div>
                </div>
                </div>
            </div>
        )
    }
           
    return (
        <div className='details-viewer'>
            <div className="title-section">
                <div className="component-name">{selectedComponent ? selectedComponent.name : '(Selecione um componente para ver detalhes)'}</div>
                {selectedComponent && IconsUtil.getIconFromComponent(selectedComponent)}
            </div>
            {selectedComponent 
            ? <>
                <div className="main-info-section">
                    <div>
                        <img className='component-image' src={componentInfo.image} alt="component-image" />
                    </div>
                </div>
                {renderMainInfo()}
                <div className="component-secondary-info">
                    <div className='sensor-section'>
                        <div className="info-title">Sensor</div>
                        <div className="info-content">
                            <img className='content-icon' src={sensor_icon} alt="sensor-icon" />
                            <div className='content-name'> {componentInfo.sensor} </div>
                        </div>
                    </div>
                    <div className='receptor-section'>
                        <div className="info-title">Receptor</div>
                        <div className="info-content">
                            <img className='content-icon' src={receptor_icon} alt="receptor-icon" />
                            <div className='content-name'> {componentInfo.receptor} </div>
                        </div>
                    </div>
                </div>
                <div className='returning-button-section'>
                    <button 
                    className="filter-button"
                    onClick={() => dispatch(toggleisFlipped())}
                    >
                    Voltar para árvore 
                    <img
                        alt='tree_icon' 
                        className="tree-icon" 
                        src={tree_icon} 
                    />
                    </button>
                </div>
            </>
            : <></>}    
        </div>
    );
}   

export default DetailsViewerPortrait;