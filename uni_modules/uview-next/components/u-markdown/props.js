import { defineProps } from '../../libs/util/props';

export default defineProps('markdown', {
    content: {
        type: String,
        default: ''
    },
    showLine: {
        type: [Boolean, String],
        default: true
    }
})
