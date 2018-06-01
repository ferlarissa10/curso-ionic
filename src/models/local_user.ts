//model para o localUser
//para conseguirmos remover o email direto do token retornado, nao guardando pelo login:
//baixamos a dependencia angular2-jwt pelo npm

export interface LocalUser{
    token: string
    email:string
}