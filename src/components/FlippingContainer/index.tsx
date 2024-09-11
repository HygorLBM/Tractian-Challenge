import { useSelector } from 'react-redux';
import ContainerHeader from '../ContainerHeader';
import DetailsViewer from '../DetailsViewer';
import Pagination from '../Pagination';
import TextFilter from '../TextFilter';
import TreeViewer from '../TreeViewer';
import './styles.scss';
import { stateAssets } from '../../store/ducks/assets.slice';
import DetailsViewerPortrait from '../DetailsViewerPortrait';

const FlippingContainer :React.FC = () => {
    const {totalPages, isFlipped} = useSelector(stateAssets);

    return (
        <div className="whole-container">
            <ContainerHeader />
            <div className='flipping-container'>
                <div className={`flipping-wrapper ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flipping-tree-section">
                        <div className='flipping-filter-and-viewer'>
                            <TextFilter />
                            <TreeViewer />
                        </div>
                        {totalPages > 1 
                            ? <div className='flipping-pagination-section'>
                                <Pagination />
                            </div> 
                            : <></>
                        }
                    </div>
                    <div className="flipping-details-section">
                        <DetailsViewerPortrait />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default FlippingContainer;