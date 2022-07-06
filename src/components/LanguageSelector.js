import React, { useEffect, useState } from "react";
import britishFlag from "../img/eng_flag.png";
import sakhaFlag from "../img/sakha_flag.png";
import russianFlag from "../img/rus_flag.png";
import "./LanguageSelector.css";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  open: { opacity: 1 },
  close: { opacity: 0 },
};

export default function LanguageSelector({ setSiteLanguage }) {
  const languageData = [
    { name: "English", tag: "en", flag: britishFlag, selected: false },
    { name: "Саха тыла", tag: "skh", flag: sakhaFlag, selected: false },
    { name: "Русский", tag: "ru", flag: russianFlag, selected: false },
  ];

  useEffect(() => {
    const systemLanguage = navigator.language.split("-")[0];
    setSiteLanguage(systemLanguage);
  }, [setSiteLanguage]);

  const [languges, setLanguges] = useState(
    languageData.map((language) => {
      if (language.tag === navigator.language.split("-")[0]) {
        language.selected = true;
        return language;
      } else {
        return language;
      }
    })
  );

  const [show, setShow] = useState(false);

  const selectedLanguage = languges.filter(
    (language) => language.selected === true
  );

  const selectLanguage = (tag) => {
    setShow(false);
    setSiteLanguage(tag);
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
      <div
        className='language-selector__language'
        onClick={() => setShow(!show)}
      >
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
      <AnimatePresence exitBeforeEnter>
        {show && (
          <motion.div
            initial='close'
            animate={show ? "open" : "close"}
            variants={variants}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className='language-selector__non-selected-languages'
          >
            {nonSelectedLanguages}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
