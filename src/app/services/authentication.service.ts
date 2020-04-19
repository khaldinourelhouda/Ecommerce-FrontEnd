import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']},
  ];

  public isAuthentificated:boolean;
  public userAuthentificated;
  public token :string;

  constructor() { }

  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
        this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if(user){
      this.isAuthentificated=true;
      this.userAuthentificated=user;
    }else{
      this.isAuthentificated=false;
      this.userAuthentificated=undefined;
    }
  }


  public isAdmin(){
    if(this.userAuthentificated){
      if(this.userAuthentificated.roles.indexOf('ADMIN')>-1)
      return true;
    }
    return false;
  }

  public saveAuthenticatedUser(){
    if(this.userAuthentificated){
      localStorage.setItem('authToken',this.token);
    }
  }

  public loadUserAuthenticatedUserFromLocalStorage(){
    let t=localStorage.getItem('authToken');
    if(t){
      let user =JSON.parse(atob(t));
      console.log(user);
      this.userAuthentificated={username:user.username,roles:user.roles};
      this.isAuthentificated=true;
      this.token=t;
    }
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthentificated=undefined;
    this.token=undefined;
    this.userAuthentificated=undefined;
  }
}
