export default {
    props: {
        content: {
            type: String,
            default: ()=> uni.$u.props.markdown.content
        },
        showLine: {
            type: [Boolean, String],
            default: ()=> uni.$u.props.markdown.showLine
        }
    }
}
