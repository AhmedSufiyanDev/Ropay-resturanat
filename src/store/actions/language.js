import * as actionTypes from "../actionTypes";


  
  export const fetchAllLanguagesRequest = () => ({
    type: actionTypes.FETCH_ALL_LANGUAGES_REQUEST
  });
  
  export const fetchAllLanguagesSuccess = (languages) => ({
    type: actionTypes.FETCH_ALL_LANGUAGES_SUCCESS,
    payload: languages
  });
  
  export const fetchAllLanguagesFailure = (error) => ({
    type: actionTypes.FETCH_ALL_LANGUAGES_FAILURE,
    payload: error
  });
  
  
  export const getAllKeywordStart = () => ({
    type: actionTypes.GET_ALL_KEYWORD_START
  });
    
  export const getAllKeywordSuccess = (keywords) => ({

    type: actionTypes.GET_ALL_KEYWORD_SUCCESS,
    payload: keywords
  });
  
  export const getAllKeywordFailure = (error) => ({
    type: actionTypes.GET_ALL_KEYWORD_FAILURE,
    payload: error
  });
  

  export const getAllDetailLangStart = (data) => {
    console.log("data action 1", data);
    return{
    type: actionTypes.GET_ALL_DETAIL_LANG_START,
    payload: data

  }
}
  
  export const getAllDetailLangSuccess = (data) => {
    console.log("data action 2", data);
   return{
    type: actionTypes.GET_ALL_DETAIL_LANG_SUCCESS,
    payload: data
  }
}
  export const getAllDetailLangFailure = (error) => ({
    type: actionTypes.GET_ALL_DETAIL_LANG_FAILURE,
    payload: error
  });

  export const setCurrentLanguage = (language) => ({
    type: actionTypes.SET_CURRENT_LANGUAGE,
    payload: language
  });
  