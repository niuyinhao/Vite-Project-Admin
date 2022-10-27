
export interface MateProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    key?: string
}


export interface RouterObject {
    caseSensitive?: boolean;
    Children?: RouterObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
    meta?: MateProps;
    isLink?: string
}