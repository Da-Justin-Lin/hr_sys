import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from '../user';
import { Address } from '../address';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Component({ templateUrl: 'save.component.html' })
export class SaveComponent {
    personalStyle:string;
    addressStyle:string;
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    userType:string;
    dateOfBirth:string;
    gender:string;
    mobilePhone:string;
    annualSalary:number;
    hourlyRate:number;
    addresses:Array<Address>;

    //Initialize by getting the addresses
    ngOnInit(): void {
        this.getAddress().subscribe(data=>{
            this.addresses=data;
        })
        console.log(this.addresses);
    }

    //function to get list of addresses
    getAddress():Observable<Address[]>{
        let url="http://35.173.125.189:8080/users/";
        url+=this.id+"/address";
        return this.http.get<Address[]>(url);
    }

    //Default constructor for saving data
    constructor(private http: HttpClient, private router: Router){
        this.id=100;
        this.firstName="";
        this.lastName="";
        this.email="";
        this.userType="";
        this.dateOfBirth="";
        this.gender="";
        this.mobilePhone="";
        this.annualSalary=0;
        this.hourlyRate=this.annualSalary/2080;
        this.addresses=[];
        this.personalStyle='chosen';
        this.addressStyle='notChosen';
    }

    //Go back to the homePage
    return(){
        this.router.navigate(['/home']);
    }

    //Add address for new user isn't implemented since they should only be able to add address
    //after they have created the user already
    addAddress(){
        this.router.navigate(['/home']);
    }

    //Save the newly inputted data
    save(){
        //date is reformatting the data so that it's in "YYYY-MM-DD"
        var date = moment(this.dateOfBirth).format("YYYY-MM-DD");
        //Generate error message for users if they miss some required fields
        if (this.firstName==""){
            alert("Please enter first name")
        }else if(this.lastName==""){
            alert("Please enter last name")
        }else if(this.email==""){
            alert("Please enter E-mail address")
        }else if(this.userType=="select"||this.userType==""){
            alert("Please choose user type")
        }else if(this.gender=="select"||this.gender==""){
            alert("Please choose gender")
        }else if(this.mobilePhone==""){
            alert("Please enter phone number")
        }
        else if(this.annualSalary==null){
            alert("Please enter annualSalary")
        }else{
            //update the user information with their change
            const headers = new HttpHeaders().set('Content-Type','application/json');
            this.http.post<any>('http://35.173.125.189:8080/users', 
                JSON.stringify({
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.email,
                    "userType": this.userType.toUpperCase(),
                    "dateOfBirth": date,
                    "gender": this.gender.toUpperCase(),
                    "mobilePhone": this.mobilePhone,
                    "annualSalary": this.annualSalary
                }),
                {
                headers: headers
                }).subscribe(data => {
                    this.id = data.id;}
                )
            console.log(this.id)
            alert("User added successfully!")
            //Go back to the homepage after the information is updated
            this.router.navigate(['/home']);
        }
    }

    //Show the personal info tab and hide address tab
    changePStyle(){
        this.addressStyle="notChosen";
        this.personalStyle="chosen";
    }

    //Show the address tab and hide personal info tab
    changeAStyle(){
        this.addressStyle="chosen";
        this.personalStyle="notChosen";
    }
}