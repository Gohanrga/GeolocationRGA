<template>
    <v-snackbar
        v-model="$store.state.snackBar.snackBar"
        :color="$store.state.snackBar.color"
        multi-line
        :timeout="$store.state.snackBar.timeout"
        vertical
        top
        >
        {{ $store.state.snackBar.text }}
        <template v-slot:action="{ attrs }">
            <v-btn v-bind="attrs" text @click="$store.state.snackBar.snackBar = false">Cerrar</v-btn>
        </template>
    </v-snackbar>
</template>