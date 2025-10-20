'use strict';

var React = require('react');

// Create context
const RouterContext = React.createContext(null);
function Router({ children }) {
    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
    React.useEffect(() => {
        const handlerPopstate = () => {
            setCurrentPath(currentPath);
        };
        window.addEventListener("popstate", handlerPopstate);
        return () => window.removeEventListener("popstate", handlerPopstate);
    }, []);
    const navigate = (path) => {
        window.history.pushState({}, "", path);
        setCurrentPath(window.location.pathname);
    };
    return (React.createElement(RouterContext.Provider, { value: { currentPath, navigate } }, children));
}
function Route({ path, component: Component }) {
    const context = React.useContext(RouterContext);
    if (!context) {
        throw new Error("Context is required");
    }
    const { currentPath } = context;
    if (currentPath === path) {
        return React.createElement(Component, null);
    }
    return null;
}
function Link({ to, children, className }) {
    const context = React.useContext(RouterContext);
    if (!context) {
        throw new Error("Context is required");
    }
    const { navigate } = context;
    const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
    };
    return (React.createElement("a", { href: to, onClick: handleClick, className: className }, children));
}
// custom hook useNavigate
const useNavigate = () => React.useContext(RouterContext);

exports.Link = Link;
exports.Route = Route;
exports.Router = Router;
exports.useNavigate = useNavigate;
//# sourceMappingURL=index.js.map
