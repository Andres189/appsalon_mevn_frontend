<script setup>
    import AuthApi from '@/api/AuthApi'
    import { reset } from '@formkit/core'
    import { inject } from 'vue'

    const toast = inject('toast')

    const handleSubmit = async({email}) =>{
        try {
            const { data } = await AuthApi.forgotPassword({email})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('forgotPassword')
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
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
    <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

    <FormKit
        id="forgotPassword"
        type="form"
        :actions="false"
        incomplete-message="No se puedo enviar, revisa los mensajes"
        @submit="handleSubmit"
    >
    
    <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email de Usuario"
        validation="required|email"
        :validation-messages="{
            required:'El Email es obligatorio',
            email: 'Email no válido'
        }"
    />

        <FormKit type="submit">Enviar Instrucciones</FormKit> 

    </FormKit>
</template>

