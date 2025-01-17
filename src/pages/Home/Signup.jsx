import "../../mediaquery/mediaquery.scss";
import LOGO from "../../assets/logo.svg";
import { MdLightMode } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import useScreenWidth from "../../helper/screenWidth";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import SignupForm from "../../components/SignupForm";

import { useEffect, useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../db/index";
import { Switch, notification } from "antd";
import { useTranslation } from "react-i18next";

function SignupPage({ login }) {
  const { t, i18n } = useTranslation();

  const handleChange = (checked) => {
    const newLanguage = checked ? "ur" : "en";
    i18n.changeLanguage(newLanguage);
  };
  const registerUser = (values) => {
    // console.log(values.email);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        notification.success({
          message: "Registered Successfully",
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notification.error({
          message: "Error Occured",
          description: `Sorry, ${errorMessage}`,
          duration: 2.5,
        });
        console.log(errorMessage);
      });
  };

  const { theme, toggleTheme, isDark } = useTheme();
  const screenWidth = useScreenWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={`container ${isDark ? "dark" : " "}`}>
      <div className="header-bar">
        <div className="logo">
          <Link to={"/"}>
            <img src={LOGO} alt="" />
          </Link>
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <Link
                to="/how-it-works"
                style={{
                  textDecoration: "none",
                  color: isDark ? "#fff" : "#000",
                }}
              >
                How it works
              </Link>

              <li className={isDark ? "dark-text" : " "}>
                <Link
                  to={"/feedback"}
                  style={{
                    textDecoration: "none",
                    color: isDark ? "#fff" : "#000",
                  }}
                >
                  {t("Feedback")}
                </Link>
              </li>
              {login ? (
                <li className="menu-btn" onClick={logoutUser}>
                  {t("Logout")}
                </li>
              ) : (
                <li className="menu-btn">
                  <span>
                    {" "}
                    <Link
                      className="menu-btn"
                      style={{ textDecoration: "none" }}
                      to={"/login"}
                    >
                      {" "}
                      Login{" "}
                    </Link>
                  </span>
                  /{" "}
                  <span>
                    {" "}
                    <Link
                      className="menu-btn"
                      to={"/signup"}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      Register{" "}
                    </Link>
                  </span>
                </li>
              )}
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ margin: "0px 8px" }}>En</span>
                  <Switch
                    size="small"
                    defaultChecked={i18n.language === "ur"}
                    onChange={handleChange}
                  />
                  <span style={{ margin: "0px 8px" }}>Ur</span>
                </div>
              </li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={toggleMenu}>
                <FiMenu size={30} />
              </li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          )}
          {isMenuOpen ? (
            <div className="mobile-menu">
              <ul>
                <li className={isDark ? "dark" : " "}>How it works</li>
                <li className={isDark ? "dark" : " "}> Download</li>
                <li className={isDark ? "dark" : " "}>Upgrade</li>
                <li className={isDark ? "dark" : " "}>Feedback</li>
                <li className={isDark ? "dark" : "menu-btn"}>
                  Login / Register
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className="main-card"
        style={{ backgroundColor: theme === "dark" ? "rgb(20 23 30)" : "" }}
      >
        <SignupForm registerUser={registerUser} />{" "}
      </div>
    </div>
  );
}
export default SignupPage;
