export default {
    props: {
        content: {
            type: String,
            default() {
                return uni.$u.props.markdown.content
            }
        },
        showLine: {
            type: [Boolean, String],
            default() {
                return uni.$u.props.markdown.showLine
            }
        }
    }
}
