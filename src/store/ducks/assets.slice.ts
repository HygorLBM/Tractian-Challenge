import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CompanyDTO } from "../../dtos/company.dto";
import { ComponentDTO } from "../../dtos/component.dto";

export type AssetsState = {
    company: CompanyDTO;
    filters: {
        energy: boolean,
        critical: boolean,
        text: ''
    }
    selectedComponent: ComponentDTO | null;
    totalPages: number;
    currentPage: number;
    extraAssetsInFinalPages:number;
    extraComponentsInFinalPages: number;
    isLandscape: boolean,
    isFlipped: boolean,
}

export const initialState: AssetsState = {
    company: {id: "662fd0ee639069143a8fc387", name: 'Jaguar'},
    filters: {
        energy: false,
        critical: false,
        text: ''
    },
    selectedComponent: null,
    totalPages: 0,
    currentPage: 0,
    extraAssetsInFinalPages: 0,
    extraComponentsInFinalPages: 0,
    isLandscape: true,
    isFlipped: false
}

export const assets = createSlice({
    name: "assets",
    initialState,
    reducers:{
        changeCompany: (state, action) => {
            return {
                ...state,
                company: action.payload
            }
        },
        updateTextFilter: (state, action) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: action.payload
                }
            }
        },
        updateEnergyFilter: (state, action) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    energy: action.payload
                }
            }
        },
        updateCriticalFilter: (state, action) => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    critical: action.payload
                }
            }
        },
        updateSelectedComponent: (state, action) => {
            return {
                ...state,
                selectedComponent: action.payload
            }
        },
        updateTotalPages: (state, action) => {
            return {
                ...state,
                totalPages: action.payload
            }
        },
        updateCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload
            }
        },
        updateExtraAssets: (state, action) => {
            return {
                ...state,
                extraAssetsInFinalPages: action.payload
            }
        },
        updateExtraComponents: (state, action) => {
            return {
                ...state,
                extraComponentsInFinalPages: action.payload
            }
        },
        updateIsLandscape: (state, action) => {
            return {
                ...state,
                isLandscape: action.payload
            }
        },
        toggleisFlipped: (state) => {
            return {
                ...state,
                isFlipped: !state.isFlipped
            }
        }
    }
});

export const stateAssets = (state: RootState): AssetsState => state.assets;
export const {
    updateTextFilter,
    updateCriticalFilter,
    updateEnergyFilter,
    changeCompany,
    updateSelectedComponent,
    updateTotalPages,
    updateCurrentPage,
    updateExtraAssets,
    updateExtraComponents,
    updateIsLandscape,
    toggleisFlipped
} = assets.actions;

export default assets.reducer;