export const defineProps = (type, props) => {

	for(let key in props){
		if (uni.$u && uni.$u.props && uni.$u.props[type] && uni.$u.props[type][key]) {
			props[key].default = uni.$u.props[type][key];
		}
	}
	
	return { props }
}