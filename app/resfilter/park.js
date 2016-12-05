/**
 * Created by xueting-bo on 16/12/5.
 */

exports.filterPark = function (park){
    this._id=park._id; if(!this._id)this._id="";
    this.name=park.name; if(!this.name)this.name="";
    this.siteId=park.siteId;if(!this.siteId)this.siteId="";
    this.version=park.version;if(!this.version)this.version="";
    this.isDel=park.isDel; if(!this.isDel)this.isDel="";
    this.modifiedOn=park.modifiedOn;if(!this.modifiedOn)this.country="";
    this.createdOn=park.createdOn;if(!this.createdOn)this.createdOn="";

    var locations = [];
    if(park.locations && park.locations.length > 0){
        for(var i = 0; i < park.locations.length; i++){
            var loc = {};
            loc.location = park.locations[i].location;
            loc.locationId = park.locations[i].locationId;
            loc.location_EN = park.locations[i].location_EN;
            loc.visibility = park.locations[i].visibility;
            loc.isAd = park.locations[i].isAd;
            loc.outlets = park.locations[i].outlets;
            loc.GPS = park.locations[i].GPS;
            loc.parentId = park.locations[i].parentId;
            loc.orderNo = park.locations[i].orderNo;
            loc.locationType = park.locations[i].locationType;
            loc.shootType = park.locations[i].shootType;
            loc.cameralPrefixes = park.locations[i].cameralPrefixes;
            loc.favoriteCount = park.locations[i].favoriteCount;
            loc.description = park.locations[i].description;
            loc.description_EN = park.locations[i].description_EN;
            loc.outlets = park.locations[i].outlets;
            loc.characters = park.locations[i].characters;
            locations.push(loc);
        }
        this.locations = locations;
    }
}
