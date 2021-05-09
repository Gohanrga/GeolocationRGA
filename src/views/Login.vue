<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card
                    class="mx-auto my-12 elevation-2"
                    color="grayspace"
                    max-width="400"
                    rounded
                >
                    <v-divider class="secondary"></v-divider>
                    <v-card-title class="justify-center primary--text" primary-title>
                        <span>Sign In <v-divider class="primary"></v-divider></span>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            class="ml-2 mr-2"
                        >
                            <v-text-field
                                v-model="account.email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                                append-icon="mdi-account"
                                placeholder="Email"
                                autocomplete="off"
                            ></v-text-field>
                            <v-text-field
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                name="Password"
                                label="Password"
                                class="input-group--focused"
                                autocomplete="off"
                                @click:append="show = !show"
                                :rules="[rules.required]"
                                v-model="account.password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>  
                    <v-card-text>
                        <v-btn
                            class="mb-4"
                            color="secondary"
                            rounded
                            block
                            @click="login"
                            >
                            Login
                        </v-btn>
                    </v-card-text>  
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { ApiService } from '../ApiService.js';
const apiService = new ApiService();
import {mapActions} from 'vuex';
export default {
   data() {
        return {
            show: false,
            account: {
                email: 'anabel27@example.com',
                password: 'password'
            },
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            valid: true
        }
    },
    methods: {
        ...mapActions(['onProgress', 'offProgress','setSnackBar', 'setToken', 'setUserData']),

        login(){
            this.onProgress();
            if(this.$refs.form.validate()){
                apiService
                .login(this.account)
                .then(data=>{
                    this.setSnackBar({
                        color: 'success',
                        text: 'Welcome!!!' 
                    });
                    let token = data.data.access_token;
                    this.setToken(token);
                    this.getUserInformation();
                    this.offProgress();
                    setTimeout(() => {
                        this.$router.push({name:'ListOfWorks'});
                    }, 1000);
                })
                .catch(error=>{
                    this.setSnackBar({
                        color: 'error',
                        text: 'Incorrect User or Password'
                    });
                    this.offProgress();
                })
            }else{
                this.offProgress();
            }
        },
        getUserInformation(){
            apiService
            .getQuery('auth/me')
            .then(data=>{
                let userData = {
                    name : data.data.name,
                    email: data.data.email
                }
                this.setUserData(userData);
            })
            .catch(error=>{
                console.log(error)
            })
        },
    },
}
</script>
