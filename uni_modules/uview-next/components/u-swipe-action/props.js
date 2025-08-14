import { defineProps } from '../../libs/util/props';

export default defineProps('swipeAction', {
    // 是否自动关闭其他swipe按钮组
    autoClose: {
        type: Boolean,
        default: true,
    }
});