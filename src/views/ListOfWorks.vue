<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <h1>List Of Works</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" xs="11" sm="11" md="11" lg="11">
                <WorDataTable
                    :works="works"
                    :headers="headers"
                    @openCurrentLocation="openCurrentLocation"
                    @seeAllLocations="seeAllLocations"
                    @seeLocation="seeLocation"
                ></WorDataTable>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="6">
                <v-container class="max-width">
                    <v-pagination
                        v-model="page"
                        class="my-4"
                        :length="worksData.last_page"
                        @input="getWorksByPage()"
                    ></v-pagination>
                </v-container>
            </v-col>
        </v-row>
        <!---->
        <v-dialog
            v-model="dialogMap"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card >
                <v-toolbar color="primary" @click="closeDialog()">
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="white--text"
                        >Map Location</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-btn icon color="secondary primary--text">
                        <v-icon @click="dialogMap = false" large>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <Map :key="keyMap" :works="auxWorks" :zoom="zoom" :current="currentLocation" ></Map>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Map from '../components/Map'
import { ApiService } from '../ApiService.js';
const apiService = new ApiService();
import {mapActions} from 'vuex';
import WorDataTable from '../components/WorkDataTable';
export default {
    components:{
        Map,
        WorDataTable
    },
    data() {
        return {
            works:[],
            auxWorks:[],
            worksData:{},
            headers: [
                {
                    text: 'Title',
                    align: 'center',
                    sortable: false,
                    value: 'title',
                    class:'primary white--text font-weight-bold'
                },
                {
                    text: 'Latitude',
                    align: 'center',
                    sortable: false,
                    value: 'latitude',
                    class:'primary white--text font-weight-bold'
                },
                {
                    text: 'Longitude',
                    align: 'center',
                    sortable: false,
                    value: 'longitude',
                    class:'primary white--text font-weight-bold'
                },
                {
                    text: 'Assigned To',
                    align: 'center',
                    sortable: false,
                    value: 'assigned_to',
                    class:'primary white--text font-weight-bold'
                },
                {
                    text: 'Status',
                    align: 'center',
                    sortable: false,
                    value: 'status',
                    class:'primary white--text font-weight-bold'
                },
                {
                    text: 'Date',
                    align: 'center',
                    sortable: false,
                    value: 'date',
                    class:'primary white--text font-weight-bold'
                },
                { 
                    text: 'Actions', 
                    value: 'actions', 
                    class:'primary white--text font-weight-bold',
                    sortable: false },
            ],
            page:1,
            dialogMap: false,
            keyMap : 0,
            zoom: 0, 
            currentLocation: false
        }
    },
    mounted() {
        this.getWorks();
    },
    methods: {
        ...mapActions(['onProgress', 'offProgress','setSnackBar']),
        getWorks(){
            this.onProgress();
            apiService
            .getQuery('jobs')
            .then(data=>{
                this.worksData = data.data;
                this.works = data.data.data;
                this.offProgress();
            })
            .catch(error=>{
                this.offProgress();
                this.setSnackBar({
                    color: 'error',
                    text: 'Can not be obtain the jobs'
                });
            })
        },
        getWorksByPage(){

            this.onProgress();
            let query = this.worksData.links[this.page].url;
            if(query===null){
                this.setSnackBar({
                    color: 'error',
                    text: 'Can not be obtain the jobs'
                });
                this.works = [];
                this.offProgress();
            }

            apiService
            .getQuery('',query)
            .then(data=>{
                this.works = data.data.data;
                this.offProgress();
            })
            .catch(error=>{
                this.offProgress();
                this.setSnackBar({
                    color: 'error',
                    text: 'Can not be obtain the jobs'
                });
            })
        },
        seeLocation(item){
            this.auxWorks.push(item);
            this.dialogMap = true;
            this.keyMap++;
            this.zoom = 5;
            this.currentLocation = false;
        },
        seeAllLocations(){
            this.auxWorks = this.works;
            this.dialogMap = true;
            this.keyMap++;
            this.zoom = 1;
            this.currentLocation = false;
        },
        closeDialog(){
            this.dialogMap=false;
            this.auxWorks=[];
        },
        openCurrentLocation(){
            this.onProgress();
            navigator.geolocation.getCurrentPosition((pos)=>{
                    let latitude = pos.coords.latitude;
                    let longitude = pos.coords.longitude
                    this.auxWorks.push({
                        latitude,
                        longitude    
                    });
                    this.dialogMap = true;
                    this.keyMap++;
                    this.zoom = 15;
                    this.currentLocation = true;
                    this.offProgress();
                }
            )
        }
    },
}
</script>