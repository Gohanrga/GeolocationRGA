<template>
    <v-container fluid>
        <div ref="map" style="height: 500px"></div>

        <v-alert
        border="left"
        color="blue lighten-2"
        dark
        v-if="textInfo!==''"
        style="margin-top:10px;"
        >
        <p v-html="textInfo"></p>
        </v-alert>
    </v-container>
</template>
<script>
export default {
    props:{
        works: {
            default:[]
        },
        zoom: {
            default: 3
        },
        current: {
            default: false
        }
    },
    data() {
        return {
            key: 'AIzaSyD04kaxs68gHGPrIrZw_uYruaRnXvfVYm8',
            googleMapApi: null,
            latitud: 0,
            longitud: 0,
            marker: {},
            textInfo: ''
        }
    },
    watch:{
        works(){
            if(this.works.length>0)
                this.inicializeMap();
        }
    },
    mounted() {
        //navigator.geolocation.getCurrentPosition(this.inicializeMap);
        this.inicializeMap();
    },
    methods: {
        inicializeMap(){
            this.latitud = parseFloat(this.works[0].latitude);
            this.longitud = parseFloat(this.works[0].longitude);
            this.googleMapApi = this.$store.getters.getGoogleMapApi();
            let map = new this.googleMapApi.maps.Map(
                this.$refs.map,{
                    center:{lat: this.latitud, lng: this.longitud},
                    zoom: this.zoom
                }
            )
            if(this.current)
                this.setMarkUserPosition(map);
            else
                this.setMarkers(map);
        },
        setMarkUserPosition(map){            
            let text = this.latitud + ' '+ this.longitud;
            let circle = new this.googleMapApi.maps.Circle({
                strokeColor: "#FF0001",
                strokeOpacity: 0.2,
                strokeWeight: 1,
                fillColor: "#CF0001",
                fillOpacity: 0.35,
                map,
                center: map.getCenter(),
                radius: 100,
            });

            const infoWindow = new this.googleMapApi.maps.InfoWindow({
                content: text,
                position: map.getCenter(),
            });

            circle.addListener("mouseover", () => {
                infoWindow.close();
                infoWindow.open(circle.getMap(), circle);
                this.textInfo = 'Your current position is: ' + text;
            })

        },
        setMarkers(map){
            const infoWindow = new this.googleMapApi.maps.InfoWindow();
            for( let i = 0; i < this.works.length; i++ ){
                let work = this.works[i];
                const contentString = '<div id="content">' + 
                                       '<div id="siteNotice">' +
                                       "</div>" +
                                       '<h1 id="firstHeading" class="firstHeading">' + work.title+' </h1>' +
                                       '<div id="bodyContent">' +
                                        "<span><b>Status: </b>" + work.status + "</span>"+
                                        "<p>" + work.description + "</p>"+
                                       "</div>" +
                                       "</div>"; 
                let jsonMarket = {
                    position: {lat: parseFloat(work.latitude), lng: parseFloat(work.longitude)},
                    map,
                    title: work.title,
                }
                if(work.icon!==undefined)
                    jsonMarket['icon'] = work.icon;

                let marker = new this.googleMapApi.maps.Marker(jsonMarket);

                this.addListenersInfo(marker, infoWindow, "click", contentString);
                this.addListenersInfo(marker, infoWindow, "mouseover", contentString);
            }
        },
        addListenersInfo(marker, infoWindow, event, contentString){
            marker.addListener(event, () => {
                infoWindow.close();
                infoWindow.setContent(contentString);
                infoWindow.open(marker.getMap(), marker);
                this.textInfo = contentString;
            });
        }
    },
}
</script>
