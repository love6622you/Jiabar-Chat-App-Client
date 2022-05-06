import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Avatar from "./common/Avatar";
import { useStore } from "@/store";

function Navbar({ title }) {
  const clearPersistedAuth = useStore((state) => state["clearPersistedAuth"]);
  const getUserName = useStore.getState().getUserName();

  const linkList = [
    {
      to: "/",
      text: "Home"
    },
    {
      to: "/about",
      text: "About"
    },
    {
      to: "/login",
      text: "Log out",
      action: () => {
        clearPersistedAuth();
      }
    }
  ];
  return (
    <header className="fixed top-0 flex min-h-[5rem] w-full items-center justify-between bg-neutral px-4 text-neutral-content shadow-lg">
      <div className="mx-2 px-2">
        <Link to="/" className="align-middle text-3xl font-bold">
          {title}
        </Link>
      </div>

      <div className="mx-2 flex items-center justify-center px-2">
        <div
          className="mr-6 h-6 w-6 cursor-pointer"
          onClick={() => {
            window.open("https://github.com/love6622you");
          }}
        >
          <img src="/img/github-icon.png" alt="github" />
        </div>
        <div className="dropdown-hover dropdown-end dropdown">
          <div className="flex items-center">
            <Avatar isOnline={true} />

            <span tabIndex={Number("0")} className="m-4">
              {getUserName}
            </span>

            <ChevronDownIcon className="h-5 w-5" />
          </div>

          <ul
            tabIndex={Number("0")}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            {linkList.map((item) => {
              return (
                <li key={item.text} onClick={item.action}>
                  <Link to={item.to}>{item.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

Navbar.defaultProps = {
  title: "JiaBar Live"
};

Navbar.propTypes = {
  title: PropTypes.string
};

export default Navbar;
