export type CardProps = {
    id: number|string;
    width?: number | string;
    height?: number | string;
    img: any ;
    title?: string;
    size?: number;
    contentPreview?: string;
    content?: string;
    date: string;
    preview?: boolean,
    route: ()=> void,
    isPLaying?: boolean
  };