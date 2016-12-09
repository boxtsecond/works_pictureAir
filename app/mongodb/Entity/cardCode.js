/**
 * Created by meteor on 16/12/8.
 */


var carCodeModel=require("../Model/cardCodeModel")
var item =new carCodeModel();
item.isVirtual=false;
item.PPPCode="";
item.SN="";
item.PPPType="OneDayPass";
item.oType="Gift";
item.capacity=-1;
item.days=1;
item.ownerId="";
item.userId="";
item.bindOn=1;
item.expiredDay=1;
item.expiredOn=new Date(2017,11,31,59,59,59);
item.effectiveOn=1;
item.ownOn=1;
item.soldOn=1;
item.photoCount=-1;
item.locationIds=[];
item.soldOn=1;
item.soldOn=1;
item.productIds=[];
item.parentId="";
item.createdBy="system";
item.modifiedBy="system";



console.log(item)
// item.