import React from 'react'

import axios from "axios";

const RazorPay = () => {

    const payment = async () => {
        const res = await axios.post("http://localhost:1337/api/payu/initiate", {
            amount: 50,
            userId: 4,
            email: "aadi@543.com",
            phone: 600604055
        });

        if (res.data.status === "success") {
            const payuData = res.data.payuData;

            console.log(payuData);

            // PayU Money payment URL
            const payuURL = `https://secure.payu.in/_payment`;

            // Create a form and auto-submit
            const form = document.createElement("form");
            form.method = "POST";
            form.action = payuURL;

            for (const key in payuData) {
                if (payuData.hasOwnProperty(key)) {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = payuData[key];
                    form.appendChild(input);
                    console.log(form);

                }
            }

            document.body.appendChild(form);
            form.submit(); // Redirects the user
        }
    };


    return (

        <>
            <button onClick={() => payment()}>Click here</button>

        </>
    )
}

export default RazorPay