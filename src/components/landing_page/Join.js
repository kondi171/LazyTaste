import { useState } from "react";
import Modal from "../features/modals/Modal";
const Join = () => {
	const [whatClicked, setWhatClicked] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = click => {
		setWhatClicked(click);
		setIsOpen(!isOpen);
	}

	return (
		<section id="join" className="join">
			<h2 className="join__title">Join us</h2>
			<div className="join__container">
				<div className="customer">
					<h3>Join as Customer!</h3>
					<div className="btns-wrapper">
						<button onClick={() => handleClick('customerRegister')}>Register</button> <span>or</span>
						<button onClick={() => handleClick('customerLogin')}>Login</button>
					</div>
				</div>
				<div className="restaurant">
					<h3>Join as Restaurant!</h3>
					<div className="btns-wrapper">
						<button onClick={() => handleClick('restaurantRegister')}>Register</button> <span>or</span>
						<button onClick={() => handleClick('restaurantLogin')}>Login</button>
					</div>
				</div>
			</div>
			{isOpen && <Modal clicked={whatClicked} setIsOpen={setIsOpen} />}

		</section >
	);
}

export default Join;