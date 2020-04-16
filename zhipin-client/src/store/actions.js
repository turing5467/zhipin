import {SHOWCITY, SELECTCITY, ADDSEARCHHISTORY, LOGIN, SETPHONE} from './action-type'

export const showCity = (isCityShow) => {
    return {
        type: SHOWCITY,
        isCityShow
    }
}

export const changeCity = (city) => {
    return {
        type: SELECTCITY,
        city
    }
}

export const addSearchHistory = (item) => {
    return {
        type: ADDSEARCHHISTORY,
        item
    }
}

export const login = (user) => {
    return {
        type: LOGIN,
        user
    }
}

export const setPhone = (phone) => {
    return {
        type: SETPHONE,
        phone
    }
}
