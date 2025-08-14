import { defineProps } from '../../libs/util/props';

export default defineProps('statusBar', {
    bgColor: {
        type: String,
        default: 'transparent'
    }
})