import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//Types
interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

interface RouterProps {
  children: ReactNode;
}

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string; // ? meaning optional
}

// Create context

const RouterContext = createContext<RouterContextType | null>(null);

export function Router({ children }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlerPopstate = () => {
      setCurrentPath(currentPath);
    };

    window.addEventListener("popstate", handlerPopstate);
    return () => window.removeEventListener("popstate", handlerPopstate);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(window.location.pathname);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Route({ path, component: Component }: RouteProps) {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("Context is required");
  }

  const { currentPath } = context;

  if (currentPath === path) {
    return <Component />;
  }

  return null;
}

export function Link({ to, children, className }: LinkProps) {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("Context is required");
  }

  const { navigate } = context;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// custom hook useNavigate

export const useNavigate = () => useContext(RouterContext);
