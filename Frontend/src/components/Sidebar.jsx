import React from "react";
import styled from "@emotion/styled";

// Левый сайдбар

export const Sidebar = ({ isOpen }) => {
    // if (!isOpen) return null;
    return (
        <SidebarMenu isOpen={isOpen}>
            <nav>
                <div>Для вас</div>
                <div>Проекты</div>
                <div>О нас</div>
            </nav>
        </SidebarMenu>
    );
};

// ===== STYLES =====

const SidebarMenu = styled.div`
  display: ${props => (props.isOpen ? "block" : "none")};
  // position: relative;
  top: 0;
  left: 0;
  height: calc(100vh - 44px);
  background-color: #1f1f21;
  width: 240px;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  border-right: 0.5px solid #37373a;

  /* вот здесь мы смотрим проп isOpen */
  width: ${props => (props.isOpen ? "240px" : "0px")};
`;
