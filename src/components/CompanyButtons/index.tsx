import { useEffect, useState } from 'react';
import company_icon from '../../assets/company_icon.svg';
import data from '../../assets/data.json';
import './styles.scss';
import { CompanyDTO } from '../../dtos/company.dto';
import { getCompanies } from '../../services/assets.service';
import { useDispatch } from 'react-redux';
import { changeCompany } from '../../store/ducks/assets.slice';

const CompanyButtons:React.FC = () => {
    const defaultCompanyData:any = data['companies' as keyof typeof data];
    const [companies, setCompanies] = useState<CompanyDTO[]>(data.companies);
    const [current, setCurrent] = useState<CompanyDTO>({id: "662fd0ee639069143a8fc387", name: "Jaguar"});
    const dispatch = useDispatch();

    const optForOfflineData = () => {
        setCompanies(defaultCompanyData);
    }

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

    return (
        <div className='company-buttons'>
            {companies && companies.length > 0 && companies.map((company, index) => {
                return (
                    <div key={"div-company-button" + index} className="each-company-button">
                        <button 
                        key={index} 
                        className={`company-button ${current.name === company.name ? 'button-selected' : ''}`}
                        onClick={() => setCurrent(company)}
                        >
                            <img className="company-icon" src={company_icon} alt="company_icon"/>
                            {`${company.name} Unit`}
                        </button>
                    </div>
                    
                );
            })}
        </div>
    );
}

export default CompanyButtons;