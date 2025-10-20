import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const RouterContext = createContext(null);
function Router({ children }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
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
    const context = useContext(RouterContext);
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
    const context = useContext(RouterContext);
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
const useNavigate = () => useContext(RouterContext);

export { Link, Route, Router, useNavigate };
//# sourceMappingURL=index.esm.js.map
