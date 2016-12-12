/**
 * Created by meteor on 16/11/24.
 */

var util = require('../rq.js').util;

function  filterUser(user){
    this.name=user.name; if(!this.name)this.name="";
    this.userName=user.userName;if(!this.userName)this.userName="";
    this.password=user.password;if(!this.password)this.password="";
    this.userType=user.userType;if(!this.userType)this.userType="user";
    this.mobile=user.mobile; if(!this.mobile)this.mobile="";
    this.email=user.email; if(!this.email)this.email="";
    this.country=user.country;if(!this.country)this.country="";
    this.gender=user.gender;if(!this.gender)this.gender="";
    this.birthday=user.birthday;
    if(!this.birthday)this.birthday=new Date(1970,1,1,1).getTime();
    else this.birthday=this.birthday.getTime();
    this.address=user.address;if(!this.address)this.address=[];
    this.coverHeaderImage=user.coverHeaderImage;if(!this.coverHeaderImage)this.coverHeaderImage="";
    this.favoriteLocationIds=user.favoriteLocationIds;
    this.qq=user.qq;if(!this.qq)this.qq="";
    this.userPP=user.userPP;if(!this.userPP)this.userPP="";
    this.hiddenPPList=user.hiddenPPList;
    this.favoritePhotos=user.favoritePhotos;
    this.likePhotos=user.likePhotos;
    this.emailVerified=user.emailVerified;
    this.disabled=user.disabled;
    this.disablereason=user.disablereason;
    this.lgcode=user.lgcode;if(!this.lgcode)this.lgcode="en-US";
    this.customerIds = user.customerIds;if(!this.customerIds)this.customerIds=[];
    //this.cart={};
    //console.log(this);
}
function filterUserToredis(user,t,lg){
    this.userid=user._id;
    // this.t=t;
    // this.lgcode=lg;
    this.user=new filterUser(user);
}
function  filterUserRes(user){
    this.name=user.name;
    this.userName=user.userName;
    this.userType=user.userType;
    this.mobile=user.mobile;
    this.email=user.email;
    this.country=user.country;
    this.gender=user.gender;
    this.birthday=util.convertDateToStr(user.birthday);
    this.address=user.address;
    this.coverHeaderImage=user.coverHeaderImage;
    this.favoriteLocationIds=user.favoriteLocationIds;
    this.qq=user.qq;
    this.userPP=user.userPP;
    this.hiddenPPList=user.hiddenPPList;
    this.favoritePhotos=user.favoritePhotos;
    this.likePhotos=user.likePhotos;
    this.emailVerified=user.emailVerified;
    this.disabled=user.disabled;
    this.disablereason=user.disablereason;
    this.lgcode=user.lgcode;
    this.customerIds = user.customerIds;
    //this.cart={};
    //console.log(this);
}
module.exports={
    filterUser:filterUser,
    filterUserRes:filterUserRes,
    filterUserToredis:filterUserToredis
}
//console.log(new Date(1970,1,1,1).getTime())