import React, { useState } from "react";
import Header from "../components/header";
import "../css/billing.css";
import { MdDeleteForever } from "react-icons/md";

function Billing() {
	const [customerDetails, setCustomerDetails] = useState({ name: "", email: "", phoneNo: "" });
	const [productId, setProductId] = useState(null);
	const [ManualEntry, setManualEntry] = useState(false);
	const [scanner, setScanner] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setCustomerDetails({ ...customerDetails, [name]: value });
	}

	return (
		<div className="billing-section">
			<Header />
			<div class="billing d-flex">
				<div className="info-wrapper">
					<div className="d-c-b customer-scanner">
						<div className="customer-info">
							<h6 className="text-center">Customer Details</h6>
							<hr />
							<form>
								<div className="input-wrapper required">
									<label htmlFor="customer-name">Name:</label>
									<input type="text" id="customer-name" name="name" value={customerDetails.name} onChange={(e) => handleChange(e)} required />
								</div>
								<div className="input-wrapper required">
									<label htmlFor="phoneNo">Phone No:</label>
									<input type="tel" id="phoneNo" name="phoneNo" value={customerDetails.phoneNo} onChange={(e) => handleChange(e)} required />
								</div>
								<div className="input-wrapper required">
									<label htmlFor="customer-email">Email:</label>
									<input type="email" id="customer-email" name="email" value={customerDetails.email} onChange={(e) => handleChange(e)} required />
								</div>
							</form>
						</div>
						<div className="scanner-info">
							<h6 className="text-center">Scanner View</h6>
							<hr />
							<div className="scanner"></div>
						</div>
					</div>

					<div className="product-entry">
						<h6 className="text-center">Product Details</h6>
						<hr />
						<table>
							<thead>
								<tr>
									<th class="s-no">S.No</th>
									<th class="type">Type</th>
									<th class="size">Size</th>
									<th class="actual-price">MRP</th>
									<th class="reduced-price">Selling Price</th>
									<th class="action">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>T-shirt</td>
									<td>Medium</td>
									<td>$20</td>
									<td>$15</td>
									<td>
										<MdDeleteForever className="del-icon" />
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Jeans</td>
									<td>32</td>
									<td>$40</td>
									<td>$30</td>
									<td>
										<MdDeleteForever className="del-icon" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="entry-bar d-c-b">
						<form className="d-flex">
							<div className="input-wrapper required">
								<label htmlFor="Product-Id">Product Id:</label>
								<input type="number" id="Product-Id" name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} required />
							</div>
							<button class="btn">
								<div class="sign">
									<svg viewBox="0 0 512 512">
										<path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
									</svg>
								</div>
							</button>
						</form>
						<div className="switch-container d-v-center">
							<p>Scanner:</p>
							<div className={`toggle-switch ${scanner && "active"}`} onClick={() => setScanner(!scanner)}>
								<div className="toggle-label"> </div>
							</div>
						</div>
						<div className="switch-container  d-v-center">
							<p>Manual Entry:</p>
							<div className={`toggle-switch ${ManualEntry && "active"}`} onClick={() => setManualEntry(!ManualEntry)}>
								<div className="toggle-label"> </div>
							</div>
						</div>
					</div>
				</div>

				<div class="order-info">
					<div className="detail-wrapper d-c-b">
						<p>Total Items</p>
						<p>10</p>
					</div>

					<div className="detail-wrapper d-c-b">
						<p>Sub Total</p>
						<p>4500</p>
					</div>
					<div className="detail-wrapper d-c-b">
						<p>Tax</p>
						<p>40</p>
					</div>
					<div className="detail-wrapper d-c-b">
						<p>Sub Total</p>
						<p>10</p>
					</div>
					<div className="detail-wrapper  discount d-c-b">
						<p>Discount</p>
						<div className="d-flex">
							<input type="number" placeholder="%"></input>
							<input type="number" placeholder="₹"></input>
						</div>
					</div>
					<hr />
					<div className="detail-wrapper d-c-b">
						<p>Grant Total</p>
						<p>4000</p>
					</div>
					<div className="detail-wrapper d-c-b">
						<p>Amount Saved</p>
						<p>500</p>
					</div>

					<div className="payment-method">
                        <h6 className="text-center">Payment Method</h6>
						<div className="d-c-a">
							<div className="payment">
								<img src="assets/icons/cash.svg"></img>
								<p className="text-center">Cash</p>
							</div>
							<div className="payment">
								<img src="assets/icons/card.svg"></img>
								<p className="text-center">Card</p>
							</div>
							<div className="payment">
								<img src="assets/icons/upi.svg"></img>
								<p className="text-center">UPI</p>
							</div>
						</div>
					</div>

                    <div className="detail-wrapper box d-v-center">
						<input type="checkbox" name="receipt"/><p>Print Receipt</p>
					</div>
                    <div className="detail-wrapper box d-v-center">
						<input type="checkbox" name="send-message"/><p>Send Message</p>
					</div>

                    <div className="detail-wrapper discount d-c-b">
						<p>Salesman Id</p>
						<div className="d-flex">
							<input type="number" placeholder="Enter Id"></input>
						</div>
					</div>
                    <div className="buttons d-flex">
                        <button className="btn">Confirm</button>
                        <button className="btn btn-red">Cancel</button>
                    </div>
				</div>
			</div>
		</div>
	);
}

export default Billing;
