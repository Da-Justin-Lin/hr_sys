import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Address } from '../address';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent {
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

    //Get the user information and store it
    //Get the user address by their id and store it
    ngOnInit(): void {
        //Extract the UserID from URL
        const id =Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.id=id;
        this.getAddress().subscribe(data=>{
            this.addresses=data;
        })
        this.getUser().subscribe(data=>{
            this.dateOfBirth=data.dateOfBirth;
            this.firstName=data.firstName;
            this.lastName=data.lastName;
            this.email=data.email;
            this.userType=data.userType.toLowerCase();
            this.gender=data.gender.toLowerCase();
            this.mobilePhone=data.mobilePhone;
            this.annualSalary=data.annualSalary;
        })
    }

    //Function to get the user's address list
    getAddress():Observable<Address[]>{
        let url="http://35.173.125.189:8080/users/";
        url+=this.id+"/address";
        return this.http.get<Address[]>(url);
    }

    //Default constructor
    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){
        this.id=100
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


    //Function to get the user's information
    getUser():Observable<User>{
        let url="http://35.173.125.189:8080/users/";
        url+=this.id;
        return this.http.get<User>(url);
    }
    
    //Function to go back to the homepage
    return(){
        this.router.navigate(['/home']);
        console.log(this.gender)
    }

    //Function to update user information
    update(){
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
            let url='http://35.173.125.189:8080/users/'+this.id
            const headers = new HttpHeaders().set('Content-Type','application/json');
            this.http.put<any>(url, 
                JSON.stringify({
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.email,
                    "userType": this.userType.toUpperCase(),
                    "dateOfBirth": date,
                    "gender": this.gender.toUpperCase(),
                    "mobilePhone": this.mobilePhone,
                    "annualSalary": this.annualSalary
                }),{
                headers: headers
            }).subscribe(data => {
            this.id = data.id;})
            alert("User information updated successfully!")
            //Go back to the homepage after the information is updated
            this.router.navigate(['/home']);
        }
    }
    //Function to go to add address page
    addAddress(){
        this.router.navigate(['/address/',this.id]);
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