export interface Tarjeta {
    id: number;    
    titulo: string;
    informacion: string;
    sistema: number;
    baseDatos: baseDatos;
}

export enum baseDatos {
    Facope = 1,
    Core = 2
}