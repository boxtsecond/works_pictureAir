/**
 * Created by meteor on 16/11/24.
 */

var resTools = require('./resTools');


function filterCodebindOn(customerIds) {
    var res=[];
    if(this.customerIds.length>0){
        for(var item in this.customerIds){
            var customerIds_item=this.customerIds[item];
            if(resTools.haveOwnproperty(customerIds_item,"bindOn")) customerIds_item.bindOn=customerIds_item.bindOn.getTime();
            if(resTools.haveOwnproperty(customerIds_item,"expiredOn"))customerIds_item.expiredOn=customerIds_item.expiredOn.getTime();
            if(resTools.haveOwnproperty(customerIds_item,"soldOn"))customerIds_item=customerIds_item.soldOn.getTime();
            res.push(customerIds_item);
        }
    }
    return res;
}
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
    this.coupons = user.coupons;if(!this.coupons)this.coupons=[]; //
    this.pppCodes=user.pppCodes;if(!this.pppCodes)this.pppCodes=[];
    // if(this.pppCodes.length>0){
    //     for(var item in this.pppCodes){
    //         if(resTools.haveOwnproperty(this.pppCodes[item],"bindOn")) this.pppCodes[item].bindOn=this.pppCodes[item].bindOn.getTime();
    //         if(resTools.haveOwnproperty(this.pppCodes[item],"expiredOn"))this.pppCodes[item].expiredOn=this.pppCodes[item].expiredOn.getTime();
    //         if(resTools.haveOwnproperty(this.pppCodes[item],"soldOn"))this.pppCodes[item].soldOn=this.pppCodes[item].soldOn.getTime();
    //     }
    // }
    this.customerIds=[];
    if(user.customerIds.length>0){
        for(var item in user.customerIds){
            var customerIds_item=user.customerIds[item];
            if(resTools.haveOwnproperty(customerIds_item,"bindOn")) customerIds_item.bindOn=customerIds_item.bindOn.getTime();
            console.log(customerIds_item)
            this.customerIds.push(customerIds_item);
        }
    }
    // this.customerIds = user.customerIds;if(!this.customerIds)this.customerIds=[];//pp
    // if(this.coupons.length>0){
    //     for(var item in this.coupons){
    //         if(resTools.haveOwnproperty(this.coupons[item],"bindOn")) this.coupons[item].bindOn=this.coupons[item].bindOn.getTime();
    //     }
    // }
    //this.cart={};
    //console.log(this);
}
function filterUserToredis(user){
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
    this.birthday=resTools.convertDateToStrYYMMDD(user.birthday);
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
    this.coupons=user.coupons;
    this.pppCodes=user.pppCodes;
    if(this.pppCodes.length>0){
        for(var item in this.pppCodes){
           if(resTools.haveOwnproperty(this.pppCodes[item],"bindOn")) this.pppCodes[item].bindOn=resTools.convertDateToStr( this.pppCodes[item].bindOn);
            if(resTools.haveOwnproperty(this.pppCodes[item],"expiredOn"))this.pppCodes[item].expiredOn=resTools.convertDateToStr( this.pppCodes[item].expiredOn);
            if(resTools.haveOwnproperty(this.pppCodes[item],"soldOn"))this.pppCodes[item].soldOn=resTools.convertDateToStr( this.pppCodes[item].soldOn);
        }
    }
    if(this.customerIds.length>0){
        for(var item in this.customerIds){
            if(resTools.haveOwnproperty(this.pppCodes[item],"bindOn"))  this.customerIds[item].bindOn=resTools.convertDateToStr( this.customerIds[item].bindOn);
        }
    }
    if(this.coupons.length>0){
        for(var item in this.coupons){
            if(resTools.haveOwnproperty(this.coupons[item],"bindOn"))  this.coupons[item].bindOn=resTools.convertDateToStr( this.coupons[item].bindOn);
        }
    }
    //this.cart={};
    //console.log(this.birthday);
}
module.exports={
    filterUser:filterUser,
    filterUserRes:filterUserRes,
    filterUserToredis:filterUserToredis
}
//console.log(new Date(1970,1,1,1).getTime())