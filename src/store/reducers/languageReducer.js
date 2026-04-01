import * as actionTypes from "../actionTypes";


  const initialState = {
    languages: null,
    keywords:null,
    langDetail:null,
    currentLanguage:null,
    loading: false,
    error: null,
    success:null
  };
  
  export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_ALL_LANGUAGES_REQUEST:
        return { ...state, loading: true, success:null, error: null,languages:null, };
      case actionTypes.FETCH_ALL_LANGUAGES_SUCCESS:
        return { ...state,loading: false,languages: action.payload,success:null,error: null};
      case actionTypes.FETCH_ALL_LANGUAGES_FAILURE:
        return {  ...state,loading: false,success:null,error: action.payload};


      case actionTypes.GET_ALL_KEYWORD_START:
        return { ...state, loading: true, success:null, error: null,keywords:null, };
      case actionTypes.GET_ALL_KEYWORD_SUCCESS:
        return { ...state,loading: false,keywords: action.payload,success:null,error: null};
      case actionTypes.GET_ALL_KEYWORD_FAILURE:
        return {  ...state,loading: false,success:null,error: action.payload};


      case actionTypes.GET_ALL_DETAIL_LANG_START:
        return { ...state, loading: true, success:null, error: null,langDetail:null, };
      case actionTypes.GET_ALL_DETAIL_LANG_SUCCESS:
        return { ...state,loading: false,langDetail: action.payload,success:null,error: null};
      case actionTypes.GET_ALL_DETAIL_LANG_FAILURE:
        return {  ...state,loading: false,success:null,error: action.payload};

      case actionTypes.SET_CURRENT_LANGUAGE:
        return {  ...state, currentLanguage: action.payload};


      default:
        return state;
    }
  };
  
  export default languageReducer;
  