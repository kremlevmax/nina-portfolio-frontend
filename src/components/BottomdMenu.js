import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faVk,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import LanguageSelector from "./LanguageSelector";
import "./BottomdMenu.css";

export const BottomdMenu = ({ setSiteLanguage }) => {
  return (
    <div className='bottom-menu__container'>
      <div className='bottom-menu__social-links-container'>
        <FontAwesomeIcon
          icon={faVk}
          className='bottom-menu__social-link-icon'
        />
        <FontAwesomeIcon
          icon={faTelegram}
          className='bottom-menu__social-link-icon'
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className='bottom-menu__social-link-icon'
        />
        <FontAwesomeIcon
          icon={faAt}
          className='bottom-menu__social-link-icon'
        />
        <FontAwesomeIcon
          icon={faMobileRetro}
          className='bottom-menu__social-link-icon'
        />
      </div>
      <LanguageSelector setSiteLanguage={setSiteLanguage} />
    </div>
  );
};
