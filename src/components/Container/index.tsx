import { useSelector } from 'react-redux';
import ContainerHeader from '../ContainerHeader';
import DetailsViewer from '../DetailsViewer';
import Pagination from '../Pagination';
import TextFilter from '../TextFilter';
import TreeViewer from '../TreeViewer';
import './styles.scss';
import { stateAssets } from '../../store/ducks/assets.slice';

const Container:React.FC = () => {
    const {totalPages} = useSelector(stateAssets);

    return (
        <div className="whole-container">
            <ContainerHeader />
            <div className='container-content'>
                <div className="tree-section">
                    <div className='filter-and-viewer'>
                        <TextFilter />
                        <TreeViewer />
                    </div>
                    {totalPages > 1 
                        ? <div className='pagination-section'>
                            <Pagination />
                        </div> 
                        : <></>
                    }
                </div>
                <div className="details-section">
                    <DetailsViewer />
                </div>
            </div>
        </div>
    )
}

export default Container;