<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const authRoutes = [
        {name:'register', text: 'Crear un cuenta'},
        {name:'login', text: 'Iniciar Sesión'},
        {name:'forgot-password', text: 'Olvide mi password'}
    ]
;
</script>

<template>
    <div class="mx-auto lg:w-3/5 mt-20">
        <RouterView/>

        <nav class="mt-10 flex felx-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink
                v-for="authRoutes in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name: authRoutes.name}"
                :class="{ 'hidden' : route.name === authRoutes.name }"
            >
                {{ authRoutes.text }}
            </RouterLink>
        </nav>

    </div>
</template>


