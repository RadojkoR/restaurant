import { NavLink, useNavigate } from "react-router-dom";
import cartItemModel from "../../Interfaces/cartItemModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import userModel from "../../Interfaces/userModel";
import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";

let logo = require("../../Assets/Images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }))
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container-fluid d-flex align-items-center">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img
              src={logo}
              style={{ height: "40px" }}
              className="m-1"
              alt="Restaurant Logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            ata-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item d-flex align-items-center">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {userData.role === SD_Roles.ADMIN ? (
                <li className="nav-item dropdown d-flex align-items-center">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("order/myorders")}
                    >
                      My Orders
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("order/allOrders")}
                    >
                      All Orders
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/order/myorders"
                  >
                    Orders
                  </NavLink>
                </li>
              )}

              <div
                className="d-flex d-flex align-items-center"
                style={{ marginLeft: "auto" }}
              >
                {userData.id && (
                  <li className="nav-item">
                    <button
                      className="nav-link active mx-2 d-flex justify-content-center"
                      style={{
                        cursor: "pinter",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      Welcome, {userData.fullName}
                    </button>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex justify-content-center lign-items-center position-relative"
                    aria-current="page"
                    to="/shoppingCart"
                  >
                    <i className="bi bi-cart" style={{ fontSize: "2rem" }}></i>
                    <p
                      className="text-danger fw-bold m-0 position-absolute"
                      style={{ top: "19px", left: "auto" }}
                    >
                      {userData.id && `${shoppingCartFromStore.length}`}
                    </p>
                  </NavLink>
                </li>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="btn btn-success button-outline rounded-pill text-white mx-2 d-flex justify-content-center"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/register"
                      >
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success button-outline rounded-pill text-white mx-2 d-flex justify-content-center"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        aria-current="page"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
