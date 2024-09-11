import { useEffect, useState } from 'react';
import energy_icon_white from '../../assets/energy_icon_white.svg';
import energy_icon from '../../assets/energy_icon.svg';
import critical_icon from '../../assets/critical_icon.svg';
import critical_icon_white from '../../assets/critical_icon_white.svg';
import { stateAssets, updateCriticalFilter, updateEnergyFilter } from '../../store/ducks/assets.slice';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';

const ContainerHeader:React.FC = () => {
    const [isEnergySelected, setIsEnergySelected] = useState<boolean>(false);
    const [isCriticalSelected, setIsCriticalSelected] = useState<boolean>(false);
    const { company, filters, isLandscape, isFlipped } = useSelector(stateAssets);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isEnergySelected !== filters.energy) {
            dispatch(updateEnergyFilter(isEnergySelected));
        }
    },[isEnergySelected, filters.energy, dispatch]);

    useEffect(() => {
        if (isCriticalSelected !== filters.critical) {
            dispatch(updateCriticalFilter(isCriticalSelected));
        }
    },[isCriticalSelected, filters.critical, dispatch])

    return (
        <div className="title-and-filters">
            <div className="assets-title">
                <div>Ativos</div>
                <div className='company-title'>{`/  ${company.name} Unit`}</div>
            </div>
            
                {isFlipped 
                    ? <></>
                    : <div className="assets-filters">
                        <div className='each-filter'>
                            <button 
                                className={`filter-button ${isEnergySelected ? 'filter-selected' : ''}`}
                                onClick={() => setIsEnergySelected(!isEnergySelected)}
                            >
                                <img
                                    alt='energy_icon' 
                                    className={`energy-icon ${isEnergySelected ? 'filter-selected' : ''}`} 
                                    src={!isEnergySelected ?  energy_icon : energy_icon_white} 
                                />
                                {isLandscape ? "Sensor de energia" : "Energia"}
                            </button>
                        </div>
                        <div className='each-filter'>
                            <button 
                            className={`filter-button ${isCriticalSelected ? 'filter-selected' : ''}`}
                            onClick={() => setIsCriticalSelected(!isCriticalSelected)}
                            >
                                <img
                                    alt='critical_icon' 
                                    className="critical-icon" 
                                    src={!isCriticalSelected ? critical_icon : critical_icon_white} 
                                />
                                Crítico
                            </button>
                        </div>
                    </div>
                }
            </div>
    );
}

export default ContainerHeader;