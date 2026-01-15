import React from 'react'

function Button({ data }) {

	// console.log(data);

	return (
		<div>
			<form>
					<button
					type="submit"
					className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-md shadow-purple-400 hover:bg-indigo-100 transition  hover:cursor-pointer"
				>
					{data}
				</button>
			</form>
		</div>
	)
}

export default Button