import React, { useCallback, useEffect, useState } from "react";
import './styles.scss';
import Header from "../../components/Header";
import Container from "../../components/Container";
import { useDispatch } from "react-redux";
import { updateIsLandscape } from "../../store/ducks/assets.slice";
import FlippingContainer from "../../components/FlippingContainer";

const AssetTree: React.FC = () => {
    const [isLandscape, setisLandscape] = useState<boolean>(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (window.screen.height > window.screen.width) {
            setisLandscape(false);
        }
    },[])
    
    const handleWindowResize = useCallback(() => {
        if (window.screen.width > window.screen.height) {
            setisLandscape(true);
        } else {
            setisLandscape(false);
        }
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    useEffect(()=>{
        dispatch(updateIsLandscape(isLandscape));
    },[isLandscape, dispatch])
    

    return (
        <div className='whole-page'> 
            <Header />
            {isLandscape ? <Container /> : <FlippingContainer />}
        </div>
    );
};

export default AssetTree;