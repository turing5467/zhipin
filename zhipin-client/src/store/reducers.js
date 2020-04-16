import {SHOWCITY, SELECTCITY, ADDSEARCHHISTORY, LOGIN, SETPHONE} from './action-type'

const defaultState = {
    isCityShow:false,
    city: '全国',
    searchHistory: [],
    isLogin: false,
    user: false,
    phone: ''
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case SHOWCITY:
            return {
                ...state,
                isCityShow: action.isCityShow
            }
        case SELECTCITY:
            return {
                ...state,
                city: action.city
            }
        case ADDSEARCHHISTORY: 
            return {
                ...state,
                searchHistory: [...state.searchHistory, action.item]
            }
        case LOGIN:
            return{
                ...state,
                isLogin: action.user?true:false,
                user: action.user
            }
        case SETPHONE:
            console.log(action.phone);
            
            return {
                ...state,
                phone: action.phone
            }
        default:
            return state;
    }
}