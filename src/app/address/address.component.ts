import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from '../user';
import { Address } from '../address';
import { Observable } from 'rxjs';


@Component({ templateUrl: 'address.component.html' })
export class AddressComponent implements OnInit{
    userId:number;
    addrLn1:string;
    addrLn2:string;
    addrName:string;
    addrType:string;
    city:string;
    stateCode:string;
    postalCode:string;
    country:string;

    ngOnInit(): void {
        const id =Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.userId=id;
    }

    constructor(private http: HttpClient, private router: Router,private activatedRoute: ActivatedRoute){
        this.userId=0;
        this.addrLn1="";
        this.addrLn2="";
        this.addrName="";
        this.addrType="";
        this.city="";
        this.stateCode="";
        this.postalCode="";
        this.country="";
    }
    return(){
        this.router.navigate(['/update/',this.userId]);
    }
    //Function to add address to a specific user
    addAddress(){
        let url='http://35.173.125.189:8080/users/'+this.userId+'/address'
        console.log(url)
        if (this.addrName=="" || this.addrType==""||this.addrLn1==""||this.city=="select"||this.stateCode=="select"
        ||this.postalCode==""||this.country==""){
            alert("You missed some required fields. Please check and fill.")
        }
        else{const headers = new HttpHeaders().set('Content-Type','application/json');
        this.http.post<any>(url, 
        JSON.stringify({
        "userId": this.userId,
        "addrLn1": this.addrLn1,
        "addrLn2": this.addrLn2,
        "addrName": this.addrName,
        "addrType": this.addrType.toUpperCase(),
        "city": this.city,
        "stateCode": this.stateCode,
        "postalCode": this.postalCode
        }),{
            headers: headers
        }).subscribe(data => {
        this.userId = this.userId;})}
        alert("Address added successfully!")
        this.router.navigate(['/update/',this.userId]);
    }
}