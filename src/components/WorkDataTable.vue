<template>
    <v-data-table
        :headers="headers"
        :items="dataWorks"
        :items-per-page="5"
        class="elevation-3"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        class="ma-2"
                        @click="openCurrentLocation()"
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon>mdi-tooltip-account</v-icon>
                        </v-btn>
                    </template>
                    <span>See Current Location</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        class="ma-2"
                        @click="seeAllLocations()"
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon>mdi-map-search</v-icon>
                        </v-btn>
                    </template>
                    <span>See All work Locations</span>
                </v-tooltip>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="seeLocation(item)"
            >
                mdi-map-outline
            </v-icon>
        </template>
    </v-data-table>
</template>
<script>
export default {
    data() {
        return {
            dataWorks: [],
        }
    },
    props:{
        works:{
            default:[],
        },
        headers:{
            default:[]
        }
    },
    watch:{
        works(){
            this.dataWorks = this.works;
        }
    },
    methods: {
        openCurrentLocation(){
            this.$emit('openCurrentLocation');
        },
        seeAllLocations(){
            this.$emit('seeAllLocations');
        },
        seeLocation(item){
            this.$emit('seeLocation', item);
        }  
    },

}
</script>