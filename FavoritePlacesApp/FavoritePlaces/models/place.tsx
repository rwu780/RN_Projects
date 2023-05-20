class Place {

    id: string
    title: string
    imageUri: string
    address: string
    location: Coordinates


    constructor(title: string, imageUri: string, address: string, location: Coordinates) {
        this.title = title
        this.imageUri = imageUri
        this.address = address
        this.location = location
        this.id = new Date().toString() + Math.random().toString();
    }
}


type Coordinates = {lat: number, lng: number}