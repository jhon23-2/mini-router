import React, { ReactNode } from "react";
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
    className?: string;
}
export declare function Router({ children }: RouterProps): React.JSX.Element;
export declare function Route({ path, component: Component }: RouteProps): React.JSX.Element | null;
export declare function Link({ to, children, className }: LinkProps): React.JSX.Element;
export declare const useNavigate: () => RouterContextType | null;
export {};
//# sourceMappingURL=index.d.ts.map