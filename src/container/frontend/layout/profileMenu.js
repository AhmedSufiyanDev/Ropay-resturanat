import React, { useState, useEffect } from 'react'
import ReusableModal from '../../../components/modal/reuseModal';
import { useStyles } from './styles';
import { Zoom, Slide } from 'react-reveal';
import StarBorder from '@material-ui/icons/StarBorder';
import ListMenu from '../../../components/ListMenu';
import { logout, voucher, userPen, foodOrder, helpCenter } from '../../../assets/images/img'
import ProfileModal from './ProfileModal';
import theme from '../scss/ThemeStyles.scss';
import { useTranslation } from 'react-i18next'

function ProfileMenu(props) {
    const classes = useStyles();

    const { t } = useTranslation();
    const nestedListItems = [
        {
            icon: foodOrder, text: t('orderReordering'),
            // nestedItems: [{ icon: <StarBorder />, text: 'Starred' }],
        },
        {
            icon: userPen, text: t('profile'),
            // nestedItems: [{ icon: <StarBorder />, text: 'Starred' }],
        },
        {
            icon: voucher, text: t('vouchers'),
            // nestedItems: [{ icon: <StarBorder />, text: 'Starred' }],
        },
        {
            icon: helpCenter, text: t('helpCentre'),
            // nestedItems: [{ icon: <StarBorder />, text: 'Starred' }],
        },
        {
            icon: logout, text: t('logout'),
        },
    ];

    const { setOpenModalProfile,handleLogout } = props;
    const [userProfileModal, setUserProfileModal] = useState(false);


    const handleUserProfileCloseModal = () => {
        setUserProfileModal(false);
    };

    const handleUserProfileOpenModal = () => {
        setUserProfileModal(true);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedInside = event.target.closest('.profile-div');
            if (!clickedInside) {
                setOpenModalProfile(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  
    return (
        <div>
            <Slide top>
                <div className='profile-div'>
                    <ListMenu 
                        nestedListItems={nestedListItems}
                        handleLogout={handleLogout}
                        setOpenModalProfile={setOpenModalProfile}
                        handleUserProfileOpenModal={handleUserProfileOpenModal}
                    />
                </div>
            </Slide>
           {
                userProfileModal &&
                <ProfileModal 
                    userProfileModal={userProfileModal}
                />
           }
        </div>


    )
}
export default ProfileMenu