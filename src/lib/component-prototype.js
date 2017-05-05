export default {
    init(){
        this.mapsGeocoder = new window.google.maps.Geocoder();
        this.find = this.mapsGeocoder.geocode;
        return this;
    },
    promise(q){
        return new Promise((resolve, reject) => {
            this.find({ address: q }, (res, status) => {
                if(status !== google.maps.GeocoderStatus.OK) return reject(`Google Maps API status: ${status.split('_').join(' ').toLowerCase()}`);
                resolve(res);
            });
        });
    }
};