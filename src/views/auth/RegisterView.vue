<script setup>
    import AuthApi from '@/api/AuthApi';
    import { inject } from 'vue';
    import { reset } from '@formkit/vue';

    const toast = inject('toast')
    

    const handleSubmit = async ({password_confirm, ...formData}) =>{
        try {
            const { data } = await AuthApi.register(formData)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })


        }
    }
;
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se puedo enviar, revisa los mensajes"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:3"
            :validation-messages="{
                required:'El Nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />

        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Registro"
            validation="required|email"
            :validation-messages="{
                required:'El Email es obligatorio',
                email: 'Email no valido'
            }"
        />

        <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de usuario - Min 8 caracteres"
            validation="required|length:8"
            :validation-messages="{
                required:'El password es obligatorio',
                length: 'El password es muy corto'
            }"
        />

        <FormKit
            type="password"
            label="Repetir Password"
            name="password_confirm"
            placeholder="repite el password"
            validation="required|confirm"
            :validation-messages="{
                required:'El password es obligatorio',
                confirm: 'Los passwords no son iguales'
            }"
        />

        <FormKit type="submit">Crear Cuenta</FormKit>
    </FormKit>


</template>