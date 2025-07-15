export default {
    props: {
        bgColor: {
            type: String,
            default() {
                return uni.$u.props.statusBar.bgColor
            }
        }
    }
}
