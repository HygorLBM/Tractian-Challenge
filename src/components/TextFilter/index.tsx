import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTextFilter } from '../../store/ducks/assets.slice';
import './styles.scss';

const TextFilter:React.FC = () => {
    const [newSearchTerm, setNewSearchTerm] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        const delayStoppedTexting = setTimeout(() => {
            dispatch(updateTextFilter(newSearchTerm));
          }, 300)
      
          return () => clearTimeout(delayStoppedTexting)
    }, [newSearchTerm, dispatch])

    return (
        <input 
            type="text" 
            id="text-filter"
            className="input-text-filter" 
            onKeyUp={(event:React.SyntheticEvent) => setNewSearchTerm((event.target as HTMLInputElement).value)} 
            placeholder="Buscar Ativo ou Local"
        />
    )
}

export default TextFilter;