import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import barLogo from "../assets/images/BarLogo.svg";
import profileLogo from "../assets/images/ProfileLogo.svg"
import { theme } from "../theme";



const Header = ({ toggleSidebar, toggleProfilebar }) => {

    return (
        <StyledHeader>
            {/* <Container> */}
            <Menu>
                <MenuLeft>
                    <ButtonBar onClick={toggleSidebar}>
                        <img src={barLogo} alt="Toggle sidebar" />
                    </ButtonBar>
                </MenuLeft>

                {/* <div>
                            serch в дальнейшем 
                        </div> */}

                <ButtonBar onClick={toggleProfilebar}>
                    <ImageLogo src={profileLogo} alt="Profile Bar" />
                </ButtonBar>
            </Menu>

            {/* </Container> */}
        </StyledHeader>
    )
}
export default Header;
// ===== STYLES =====
const ImageLogo = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`

const MenuLeft = styled.div`
    display: flex;
`

const ButtonBar = styled.button`
    background: none;
    border: none;
    display: flex;
    padding: 0;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
        box-shadow: 0px 0px 10px 3px rgba(88, 90, 92, 0.74);
    }
`

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #1F1F21; // сделать через переменые
    color: #bfc1c4;  // сделать через переменые
    height: 44px;
    padding: 0rem 1rem;
    border-bottom: 0.5px solid #37373a;
    z-index: 1000;

    `
const Container = styled.div`
        margin: 0 auto;
        width: 100%;

        
    `

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
    `


