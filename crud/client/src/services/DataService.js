/**
 * %%%%%%%%%%%%%%%%%%%%% *
 * %%% DATA SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%% *
*/
/*** [IMPORT] ***/
import axios from 'axios'

class DataService {
	// [COUNT ALL] //
	static countData() {
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/data/count-all/`)
				.then((res) => {
					const data = res.data
					resolve(data)
				})
				.catch((err) => { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [CREATE] //
	static createData(content) {
		return axios.post('/api/data/create', {
			content,
		})
	}

	// [READ ALL] //
	static getAllData() {
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/data/read-all/`)
				.then((res) => {
					const data = res.data
					console.log('Returned Data:', data)
					resolve(data)
				})
				.catch((err) => { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [READ]
	static getBlockDetails(data_id) {
		let result = new Promise ((resolve, reject) => {
			return axios.get(`/api/data/read/${data_id}`)
				.then((res) => {
					const data = res.data
					console.log('RETURNED:', data)

					data.createdAt = new Date(data.createdAt)
					resolve(data)
				})
				.catch((err) => { reject(err) })
		})

		// [RETURN] //
		return result
	}
}

/*** [EXPORT] ***/
export default DataService