import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';

export const useCandidateStore = defineStore("candidate", () => {
    const candidate_id = ref(null)
    const company_id = ref(null)
    const company1_id = ref(null)
    const testlog_id = ref(null)
    const category_id = ref(null)
    const category1_id = ref(null)
    const timelimit = ref(null)
    const type = ref(null)
    const candidatemail = ref(null)
    return {
        company_id,
        company1_id,
        candidate_id,
        testlog_id,
        category_id,
        category1_id,
        timelimit,
        type,
        candidatemail
    }
})