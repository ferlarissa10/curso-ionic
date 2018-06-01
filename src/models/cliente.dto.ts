export interface ClienteDto{
    id: string;
    nome: string;
    email: string;
    //com o ? o atributo se transforma em opcional
    imageUrl?: string;
}