import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { useStyles } from "./styles";
import i18n, { updateResources } from '../../../i18n';
import axios from 'axios';
import { API_URL_LOCALS } from "../../../environment";

const Language = (props) => {
    const { languages, restaurantSuccess,drawerOpen } = props;
    const { i18n } = useTranslation();
    const classes = useStyles();
    const [languageList, setLanguageList] = useState([]);
    const [selectedLanguageTitle, setSelectedLanguageTitle] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        console.log("language in the local Storage in language list",localStorage.getItem('language'));
        if(drawerOpen){
            return null
        }
        else{
            fetchLanguage();
        }
    }, []);

    const fetchLanguage = () => {
        props.getLanguages();
    };

    useEffect(() => {
        if (restaurantSuccess){
            setRestaurantData(restaurantSuccess.data);
        }
    }, [restaurantSuccess]);

    useEffect(() => {
        if (languages){
            setLanguageList(languages.data);
        }
    }, [languages]);

    useEffect(() => {
        if (languageList && languageList.length) {
            let defaultLanguage = null;
            if (localStorage.getItem('language')) {
                defaultLanguage = languageList.find(lang => lang._id === localStorage.getItem('language'));
            } else {
                defaultLanguage = languageList.find(lang => lang.title === 'English');
            }

            if (defaultLanguage) {
                if(restaurantData?.language_ids?.length > 2) {
                    setSelectedLanguageTitle(defaultLanguage.title);
                    setSelectedLanguage(defaultLanguage);
                } else if (restaurantData?.language_ids?.length === 2) {
                    setSelectedLanguage(defaultLanguage);
                    const filteredLanguages = languageList.filter(option => {
                        if (restaurantData?.language_ids){
                            return restaurantData.language_ids.includes(option._id);
                        } else if (restaurantData?.default_lang_id){
                            return restaurantData.default_lang_id === option._id;
                        } else {
                            return option.title === 'English';
                        }
                    });
                    const alternateLanguage = filteredLanguages.find(lang => lang._id !== defaultLanguage._id);
                    if (alternateLanguage) {
                        setSelectedLanguageTitle(alternateLanguage.title);
                    } else {
                        setSelectedLanguageTitle(defaultLanguage.title);
                    }
                }
            }
        }
    }, [languageList, restaurantData]);

    const handleChange = async (event) => {
        const selectedTitle = event.target.value;
        const selectedLanguage = props.languages.data.find(option => option.title === selectedTitle);
        setSelectedLanguageTitle(selectedTitle);
        setSelectedLanguage(selectedLanguage);
    };

    const handleToggle = () => {
        const filteredLanguages = languageList.filter(option => {
            if (restaurantData?.language_ids){
                return restaurantData.language_ids.includes(option._id);
            } else if (restaurantData?.default_lang_id){
                return restaurantData.default_lang_id === option._id;
            } else {
                return option.title === 'English';
            }
        });
        const newLanguage = filteredLanguages.find(lang => lang._id !== selectedLanguage._id);
        const alternateLanguage = filteredLanguages.find(lang => lang._id !== newLanguage._id);
        setSelectedLanguage(newLanguage);
        setSelectedLanguageTitle(alternateLanguage ? alternateLanguage.title : newLanguage.title);
    };

    useEffect(() => {
        if (selectedLanguage){
            console.log("selectedLanguage USEEFFECT", selectedLanguage);
            fetchAndSetData(selectedLanguage);
        }
    }, [selectedLanguage]);

    const fetchAndSetData = async (selectedLanguage) => {
        props.setCurrentLanguage(selectedLanguage);
        try {
            const response = await axios.post(API_URL_LOCALS + '/keyword/getDetailsOfKeywordByLangId', {
                language_id: selectedLanguage._id
            });
            setResponseData(response.data.data);
            updateResources(selectedLanguage.code, response.data.data);
            localStorage.setItem("code", selectedLanguage.code);
            i18n.changeLanguage(selectedLanguage.code);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='lang-btn-div'>
            {restaurantData?.language_ids?.length === 2 ? (
                
                    <a onClick={handleToggle} className='language-toggle-btn'>
                            <span></span>
                            <span className='language-toggle-btn-text'>
                                {selectedLanguageTitle}
                            </span>
                    </a>
                
            ) : (
                <form className={classes.root} noValidate autoComplete="off">
                    <div style={{ marginRight: "45px" }}>
                        <TextField
                            id="standard-select-language"
                            select
                            value={selectedLanguageTitle}
                            onChange={handleChange}
                            SelectProps={{
                                renderValue: (value) => value
                            }}
                        >
                            {languageList
                                ?.filter(option => {
                                    if (restaurantData?.language_ids)
                                        return restaurantData.language_ids.includes(option._id);
                                    else if (restaurantData?.default_lang_id)
                                        return restaurantData.default_lang_id === option._id;
                                    else
                                        return option.title === 'English';
                                })
                                .map((option) => (
                                    <MenuItem key={option.code} value={option.title}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </div>
                </form>
            )}
        </div>
    );
};

const mapStateToProps = ({ languageReducer, restaurantReducer }) => {
    const { loading, error, success, languages, keywords, langDetail } = languageReducer;
    const { restaurantSuccess } = restaurantReducer;
    return { loading, error, success, languages, keywords, langDetail, restaurantSuccess };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLanguages: () => dispatch(actions.fetchAllLanguagesRequest()),
        setCurrentLanguage: (languageId) => dispatch(actions.setCurrentLanguage(languageId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Language);
