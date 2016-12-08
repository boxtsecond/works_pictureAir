/**
 * Created by meteor on 16/12/8.
 */
var productModel=require("../Model/productModel");



var  product=new  productModel();


product.basic={
    name:"一卡通",
    nameAlias:"",
    code:"001",
    sequence:01,
    description:"一卡通",
    brand:"PictureAir",
    pictures:[
        {
            url: "",
            no: ""
        }
    ],
    copywriter:"",
    createdBy:"system",
    modifiedBy:"system"

}
product.control={
    deleted:false,

}

console.log(product)

