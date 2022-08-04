//Interface for address including all fields needed
export interface Address{
    id:number;
    userId:number;
    addrLn1:string;
    addrLn2:string;
    addrName:string;
    addrType:string;
    city:string;
    stateCode:string;
    postalCode:string;
    country:string;
}