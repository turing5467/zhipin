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
            let flag = (state.searchHistory).indexOf(action.item);
            let searchHistory = state.searchHistory;
            if(flag === -1) {
                searchHistory = [action.item, ...state.searchHistory]
            }else {
                searchHistory[0] = searchHistory.splice(flag, 1, searchHistory[0])
            }
            return {
                ...state,
                searchHistory
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