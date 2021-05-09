<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="320"
        offset-x
        v-if="$store.getters.getToken()!==''"
        >
        <template v-slot:activator="{ on }">
            <v-btn
                icon
                large
                color="green"
                v-on="on"
                @click="setInformation()"
            >
                <v-avatar
                size="45px"
                item
                >
                    <v-icon large color="white">mdi-account-circle</v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-list >
                <v-list-item >
                    <v-list-item-content>
                        <v-list-item-title>{{userInformation.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{userInformation.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-list-item-avatar>  
                        <v-icon @click="menu = false">mdi-close-circle</v-icon>
                    </v-list-item-avatar>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions class="primary">
                <v-spacer></v-spacer>
                <v-btn color="secondary" 
                    text 
                    outlined
                    @click="endSession()"
                    >
                    Close Session
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            menu:false,
            userInformation: {
                name:'',
                email:''
            }
        }
    },
    methods: {
        ...mapActions(['closeSession']),
        setInformation(){
            this.userInformation = this.$store.getters.getUserData();
        },
        endSession(){
            this.closeSession();
            this.$router.push({name:'Login'});
        }
    },
}
</script>