import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { ref, onMounted,computed } from "vue"
import AuthApi from "@/api/AuthApi"
import AppointmentAPI from "@/api/AppointmentAPI"

export const useUserStore = defineStore('user', () =>{

    const user = ref({})
    const router = useRouter()
    const userAppointments = ref([])
    const loading = ref(true) 

    onMounted(async() =>{
        try {
            const {data} = await AuthApi.auth()
            user.value = await data.user
            await getUserAppointments()
            
        } catch (error) {
            console.log(error)
        }finally{
            loading.value=false
        }
    })

    async function getUserAppointments(){
        const {data} = await AppointmentAPI.getUserAppointments(user.value._id)
        userAppointments.value = data
    }

    function loggout(){
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : 'Usuario')

    const noAppointments = computed(() => userAppointments.value.length === 0)

    return{
        user,
        loggout,
        getUserName,
        userAppointments,
        noAppointments,
        loading,
        getUserAppointments
    }
})