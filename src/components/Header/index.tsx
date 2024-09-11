import logo_with_color from '../../assets/logo_with_color.png';
import './styles.scss';
import CompanyButtons from '../CompanyButtons';
import { AUTHOR_LINKEDIN_URL } from '../../constants/url.constants';
import CompanySelector from '../CompanySelector';
import { useSelector } from 'react-redux';
import { stateAssets } from '../../store/ducks/assets.slice';

const Header:React.FC = () => {
    const {isLandscape} = useSelector(stateAssets);
    return (
        <div className="page-header">
                <img id='tractian-logo' src={logo_with_color} alt="logo" />
                {isLandscape ? <button id='author-button' onClick={() => window.open( AUTHOR_LINKEDIN_URL , "_blank")} /> : <></>}
                <div>
                    {isLandscape ? <CompanyButtons /> : <CompanySelector /> }
                </div>
                
        </div>
    );
}

export default Header;