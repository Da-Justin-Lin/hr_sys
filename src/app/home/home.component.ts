import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })


export class HomeComponent implements OnInit{
    userType:String;
    userName:String;
    users:Array<User>=[];

    constructor(private http: HttpClient, private router: Router){
        this.userType=""
        this.userName="";
        this.users=[];
    }

    //Initialize with all users' data
    ngOnInit(): void {
        this.getUsers().subscribe(data=>{
            this.users=data;
        })
        console.log(this.users)
    }

    //Function to get all user data
    getUsers():Observable<User[]>{
        return this.http.get<User[]>("http://35.173.125.189:8080/users/summary");
    }

    //Go to the save user information page
    addUser(){
        this.router.navigate(['/save']);
    }

    //Function to search for the users by constricting their type and name
    search(){
        let url="http://35.173.125.189:8080/users/summary"
        if (this.userName!=="" && this.userType!=="select" && this.userType!==""){
            url+="?name="+this.userName+"&userType="+this.userType.toUpperCase();
        }
        else if (this.userName!==""){
            url+="?name="+this.userName;
        }
        else if (this.userType!=="select" && this.userType!==""){
            url+="?userType="+this.userType.toUpperCase();
        }
        this.http.get<User[]>(url).subscribe(
            data=>{
                this.users=data
            }
        )
    }

    //Go to the update page
    updateUser(userId:number){
        this.router.navigate(['/update/',userId]);
    }

    //Function to delete a user's information
    deleteUser(userId:number){
        let url="http://35.173.125.189:8080/users/"
        url+=userId;
        console.log(url)
        this.http.delete(url).subscribe({
            next: data => {
                 alert('Delete successful');
                 window.location.reload()
            },
            error: error => {
                console.error('There was an error!');
            }
        });
    }
}