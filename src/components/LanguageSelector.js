import React, { useState } from "react";
import britishFlag from "../img/eng_flag.png";
import sakhaFlag from "../img/sakha_flag.png";
import russianFlag from "../img/rus_flag.png";
import "./LanguageSelector.css";

export default function LanguageSelector() {
  const [languges, setLanguges] = useState([
    { name: "English", tag: "en", flag: britishFlag, selected: true },
    { name: "Саха тыла", tag: "skh", flag: sakhaFlag, selected: false },
    { name: "Русский", tag: "ru", flag: russianFlag, selected: false },
  ]);

  const selectedLanguage = languges.filter(
    (language) => language.selected === true
  );

  const selectLanguage = (tag) => {
    setLanguges(
      languges.map((language) => {
        if (language.selected === true) {
          language.selected = false;
          return language;
        }
        if (language.tag === tag) {
          language.selected = true;
          return language;
        }
        return language;
      })
    );
  };

  console.log(languges);

  const nonSelectedLanguages = languges.map((language) => {
    if (language.selected === false) {
      return (
        <div
          className='language-selector__non-selected-language'
          onClick={() => selectLanguage(language.tag)}
          key={language.name}
        >
          <img
            src={language.flag}
            alt={language.name}
            className='language-selector__flag-image'
          />
          <span className='language-selector__name'>{language.name}</span>
        </div>
      );
    } else return null;
  });

  return (
    <div className='language-selector-container'>
      <div className='language-selector__language'>
        <div className='language-selector__language-data'>
          <img
            src={selectedLanguage[0].flag}
            alt={selectedLanguage[0].name}
            className='language-selector__flag-image'
          />
          <span className='language-selector__name'>
            {selectedLanguage[0].name}
          </span>
        </div>
        <span>{"\u25BC"}</span>
      </div>
      <div className='language-selector__non-selected-languages'>
        {nonSelectedLanguages}
      </div>
    </div>
  );
}
