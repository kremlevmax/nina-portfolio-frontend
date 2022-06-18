import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faVk,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import LanguageSelector from "./LanguageSelector";
//import "./SecondMenu.css";

export const SecondMenu = ({ setSiteLanguage }) => {
  return (
    <div className='menu__bottom-part'>
      <div className='menu_part social-links-container'>
        <FontAwesomeIcon icon={faVk} className='menu__social-link-icon' />
        <FontAwesomeIcon icon={faTelegram} className='menu__social-link-icon' />
        <FontAwesomeIcon
          icon={faInstagram}
          className='menu__social-link-icon'
        />
        <FontAwesomeIcon icon={faAt} className='menu__social-link-icon' />
        <FontAwesomeIcon
          icon={faMobileRetro}
          className='menu__social-link-icon'
        />
      </div>
      <LanguageSelector setSiteLanguage={setSiteLanguage} />
    </div>
  );
};
