import { useState } from "react";
import Modal from "../features/Modal";
import Login from "./Login";
const Join = () => {
	const statement = false;
	// const [click, checkClick] = useState(false);
	// checkClick {
	// 	console.log('Hello World!');
	// }
	// const handleLoginCustomer = which => {
	// 	<Login name="Customer" />
	// 	console.log('Hello World!');
	// }
	return (
		<section id="join" className="join">
			<h2 className="join__title">Join us</h2>
			<div className="join__container">
				<div className="customer">
					<h3>Join as Customer!</h3>
					<div className="btns-wrapper">
						<button>Register</button> <span>or</span>
						<button onClick={() => console.log('Hello World!')}>Login</button>
					</div>
				</div>
				<div className="restaurant">
					<h3>Join as Restaurant!</h3>
					<div className="btns-wrapper">
						<button>Register</button> <span>or</span>
						<button>Login</button>
					</div>
				</div>
			</div>
			<Login />
		</section >
	);
}

export default Join;