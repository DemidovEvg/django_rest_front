import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom'
import { urls } from '../App';

interface MenuProps {
  isAuthenticated: boolean;
  logout: () => void;
}

function Menu({ isAuthenticated, logout }: MenuProps) {
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname)
  }, [location,])

  function isActive(link: string) {
    return link === location.pathname
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to={urls.main}
          className={`navbar-nav me-2 nav-link ${isActive(urls.main) ? 'active' : ''}`}>
          Главная
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={urls.userList}
              className={`nav-link ${isActive(urls.userList) ? 'active' : ''}`}>
              Работники
            </Link>
            <Link to={urls.projectList}
              className={`nav-link ${isActive(urls.projectList) ? 'active' : ''}`}>
              Проекты
            </Link>
            {
              isAuthenticated
                ? <Link to={urls.login}
                  onClick={logout}
                  className={`nav-link ${isActive(urls.login) ? 'active' : ''}`}>
                  Выйти
                </Link>
                : <Link to={urls.login}
                  className={`nav-link ${isActive(urls.login) ? 'active' : ''}`}>
                  Войти
                </Link>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;