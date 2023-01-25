import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
    const user = ref([{
        question: 'ques1',
        options: ['option a', 2, 3, 4],
        ans: null,
        type: 'radio'
    },
        // {
        //     question: 'ques2',
        //     options: [1, 2, 3, 4],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'ques3',
        //     options: [1, 2, 3, 4],
        //     ans: null,
        //     type: 'radio'
        // },
        // {
        //     question: 'ques4',
        //     options: [1, 2, 3, 4],
        //     ans: null,
        //     type: 'radio'
        // },
    ]);

    const changename = (newname) => {
        user.value.name = newname;
    };

    return {
        user,
        changename
    }
})