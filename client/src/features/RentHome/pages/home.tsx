import React from "react";

const Home: React.FC = () => {
	const consequence: string[] = [
		"Giá cao nhất",
		"Giá thấp nhất",
		"Điểm đánh giá",
		"Độ phổ biến",
	];
	return (
		<>
			<img
				src="https://ik.imagekit.io/tvlk/image/imageResource/2021/12/01/1638341428791-6a1768cf58f22fb6a4329ff2e5477a39.jpeg?tr=q-75"
				className="img-fluid"
			></img>
			<div className="container">
				<div className="row">
					<div className="col-3">
						<div className="p-4 shadow ">
							<div className="border-bottom pb-2">
								<div className="fw-bold">
									Sắp xếp kết quả
								</div>
								<div>Sắp xếp kết quả theo lựa chọn</div>
							</div>
							<div className="row row-cols-2 mt-3">
								{consequence.map((item) => {
									return (
										<div className="form-check col">
											<input
												className="form-check-input"
												type="radio"
												name="flexRadioDefault"
												id="flexRadioDefault1"
											/>
											<label className="form-check-label">
												{item}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="col"></div>
				</div>
			</div>
		</>
	);
};

export default Home;
