export class User{
    id : number ;
    nom :String ;
    email: String ;
    password: String ;
    role:Role[];
}
export class Role{
    id : number ;
    role :String ;
} 