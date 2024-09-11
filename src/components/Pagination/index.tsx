import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateAssets, updateCurrentPage } from "../../store/ducks/assets.slice";
import './styles.scss';

const Pagination:React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const {totalPages} = useSelector(stateAssets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCurrentPage(currentPage));
    },[currentPage, dispatch])


    return (
        <div className='pagination-container'>
            <button
                className='page-button'
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
            > 
                {`<`} 
            </button>
            <div> 
                Visualizando página {currentPage + 1} / {totalPages}
            </div>
            <button
                className='page-button'
                disabled={currentPage + 1 === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            > 
                {`>`}
            </button>
        </div>
    )
}

export default Pagination;