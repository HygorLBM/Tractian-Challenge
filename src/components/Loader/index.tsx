import './styles.scss'

const Loader:React.FC = () => {
    return (
        <div className='loader-section'>
            <div className="loader-text">Carregando ... </div>
            <div className="loader-icon"></div> 
        </div>
    )
}

export default Loader;