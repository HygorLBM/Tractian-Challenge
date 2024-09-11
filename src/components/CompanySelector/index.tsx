import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '../../assets/data.json';
import { CompanyDTO } from '../../dtos/company.dto';
import { getCompanies } from '../../services/assets.service';
import { changeCompany, stateAssets, toggleisFlipped } from '../../store/ducks/assets.slice';
import './styles.scss';

const CompanySelector:React.FC = () => {
    const defaultCompanyData:any = data['companies' as keyof typeof data];
    const {isFlipped} = useSelector(stateAssets);
    const [companies, setCompanies] = useState<CompanyDTO[]>(data.companies);
    const [current, setCurrent] = useState<CompanyDTO>({id: "662fd0ee639069143a8fc387", name: "Jaguar"});
    const dispatch = useDispatch();

    useEffect(() => {
        getCompanies()
            .then((companies) =>{
                if (!companies || companies.length === 0) {
                    optForOfflineData();
                }
                setCompanies(companies as CompanyDTO[]);
            })
            .catch(() => {
                optForOfflineData();
            })
    },[]);

    useEffect(() => {
        dispatch(changeCompany(current));
    },[current, dispatch])

    const optForOfflineData = () => {
        setCompanies(defaultCompanyData);
    }

    const updateCompany = (event: React.SyntheticEvent) => {
        setCurrent(JSON.parse((event.target as HTMLInputElement).value));
        if (isFlipped) {
            dispatch(toggleisFlipped());
        }
        
    }

    return (
        <div className='company-selector'>
            <select className='company-select' name='company-select'
                onChange={(event:React.SyntheticEvent) => updateCompany(event)}
            >
            {companies && companies.length > 0 && companies.map((company, index) => {
                return (
                    <option key={"option-" + company.id} value={JSON.stringify(company)}> {company.name} Unit</option>
                );
            })}
            </select>
        </div>
    );
}

export default CompanySelector;