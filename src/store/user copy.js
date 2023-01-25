import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';
const userDefault = {
    name: '',
    position: '',
    email: '',
    mobile: '',
    ctc: '',
    pincode: '',
    company_id: ''
}
export const useUserStore = defineStore("user", () => {
    const user = ref(Object.assign({}, userDefault))



    const admin = ref({
        name: '',
        email: '',
        user_id: '',
        company_id: '',
        usertype: ''
    })
    const userAnswers = ref({})
    const questions = ref([])
    const token = ref('')
    const loggedinname = ref('')
    const company1_id = ref('')
    const company_id = ref('')
    const category_id = ref('')
    const category1_id = ref('')
    //console.log("userstore", token, loggedinname)
    const insertUser = async (user) => {
        await api.post(`analytic/questions`, { user })

    }

    const getQuestion = async (testlog_id, candidate_id) => {
        await api.post(`analytic/questions`, { testlog_id, candidate_id },
            {
                headers: {
                    Authorization: 'Bearer ' + token.value
                }
            })
            .then(async res => {
                const data = res.data
                let userAnswer = {}
                questions.value = await data.data.map(x => {
                    userAnswer[x.question_id] = null
                    x.options = JSON.parse(x.options)
                    return x;

                })
                userAnswers.value = userAnswer
            })
    }
    const setUserDefault = () => {
        user.value = Object.assign({}, userDefault)
    }
    return {
        setUserDefault,
        user,
        questions,
        userAnswers,
        token,
        admin,
        loggedinname,
        company1_id,
        company_id,
        category_id,
        category1_id,
        getQuestion,
        insertUser
    }
})