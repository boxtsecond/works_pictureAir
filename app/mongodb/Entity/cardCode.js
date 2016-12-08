/**
 * Created by meteor on 16/12/8.
 */
var carCodeModel=require("../Model/cardCodeModel")

var item =new carCodeModel();
item.isVirtual=false;
item.PPPCode=false;
item.SN=false;
item.PPPType="OneDayPass";
item.oType="Gift";
item.capacity=-1;
item.days=1;
item.ownerId="";
item.userId="";
item.bindOn=1;
item.expiredDay=new Date(2017/12/31);
item.expiredOn=1;
item.effectiveOn=1;
item.ownOn=1;
item.soldOn=1;
item.photoCount=1;
item.locationIds=[];
item.soldOn=1;
item.soldOn=1;
item.productIds=[];
item.parentId="";
item.createdBy="system";
item.modifiedBy="system";



console.log(item)
// item.