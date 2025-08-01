/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { theme } from "./theme";
export const GlobalStyles = () => (
    <Global

        styles={css`
      /* Подключаем Montserrat */
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

      /* ==== Reset браузера ==== */
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* ==== Базовые глобальные стили ==== */
      html,
      body {
        width: 100%;
        height: 100%;
          /* background: linear-gradient(
    135deg,
    #def1f1 0%,
    rgba(255, 255, 255, 1) 100%
  ); потом через тему внедрим */
        
      }

      body {
        /* Теперь Montserrat будет по всей странице */
        font-family: 'Montserrat', sans-serif;
        color: #bfc1c4; // через переменую
        background-color: #1F1F21; //  ${theme.colors.black};
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Сброс стилей списков */
      ul[class],
      ol[class] {
        list-style: none;
      }

      /* Ссылки без подчёркивания */
      a {
        text-decoration: none;
        color: inherit;
      }

      /* Изображения на всю ширину контейнера */
      img {
        max-width: 100%;
        display: block;
        height: auto;
      }

      /* Наследование шрифта для form-элементов */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }
    `}
    />
);