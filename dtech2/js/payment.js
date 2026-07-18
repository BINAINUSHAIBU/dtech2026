pay()
payDemo()
Paystack
PayPal Demo
Package Selection
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/payment.js
=================================== */

/*
=====================================
PAYMENT CONFIGURATION
=====================================
*/

const PAYMENT = {

    publicKey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx",

    currency: "NGN",

    amount: 10000,

    company: "BTECH-TV WORLD PRO MAX"

};


/*
=====================================
GET CUSTOMER DETAILS
=====================================
*/

function getCustomerDetails(){

    return {

        fullName:
            document.getElementById("fullName")?.value || "",

        email:
            document.getElementById("email")?.value || "",

        phone:
            document.getElementById("phone")?.value || "",

        info:
            document.getElementById("otherInfo")?.value || "",

        package:
            document.getElementById("package")?.value || ""

    };

}


/*
=====================================
VALIDATE FORM
=====================================
*/

function validatePayment(){

    const customer = getCustomerDetails();

    if(customer.fullName === ""){

        alert("Enter your Full Name.");

        return false;

    }

    if(customer.email === ""){

        alert("Enter your Email Address.");

        return false;

    }

    if(customer.phone === ""){

        alert("Enter your Phone Number.");

        return false;

    }

    return true;

}


/*
=====================================
PAYSTACK PAYMENT
=====================================
*/

function pay(){

    if(!validatePayment()){

        return;

    }

    const customer = getCustomerDetails();

    const handler = PaystackPop.setup({

        key: PAYMENT.publicKey,

        email: customer.email,

        amount: PAYMENT.amount,

        currency: PAYMENT.currency,

        ref: "BTECHTV-" + Date.now(),

        metadata: {

            custom_fields: [

                {

                    display_name: "Full Name",

                    variable_name: "full_name",

                    value: customer.fullName

                },

                {

                    display_name: "Phone",

                    variable_name: "phone",

                    value: customer.phone

                },

                {

                    display_name: "Package",

                    variable_name: "package",

                    value: customer.package

                }

            ]

        },

        callback:function(response){

            paymentSuccess(response.reference);

        },

        onClose:function(){

            paymentCancelled();

        }

    });

    handler.openIframe();

}


/*
=====================================
PAYMENT SUCCESS
=====================================
*/

function paymentSuccess(reference){

    alert(

        "Payment Successful\n\nReference:\n" +

        reference

    );

    unlockPlayer();

    hideTrialOverlay();

    activateSubscription();

}


/*
=====================================
PAYMENT CANCELLED
=====================================
*/

function paymentCancelled(){

    alert("Payment Cancelled.");

}


/*
=====================================
DEMO PAYMENT
=====================================
*/

function demoPayment(){

    setTimeout(function(){

        paymentSuccess(

            "DEMO-" + Date.now()

        );

    },2000);

}


/*
=====================================
SUBSCRIPTION
=====================================
*/

function activateSubscription(){

    console.log("Subscription Activated");

    clearInterval(TRIAL.timer);

}


/*
=====================================
REDIRECT PACKAGE
=====================================
*/

function openPackage(){

    const pkg =

        document.getElementById("package");

    if(!pkg) return;

    if(pkg.value !== ""){

        window.location.href = pkg.value;

    }

}


/*
=====================================
DOWNLOAD RECEIPT
=====================================
*/

function downloadReceipt(reference){

    const receipt = `

BTECH-TV WORLD PRO MAX

----------------------------

Payment Successful

Reference:

${reference}

Status:

PAID

Thank You.

`;

    const blob =

        new Blob(

            [receipt],

            {

                type:"text/plain"

            }

        );

    const url =

        URL.createObjectURL(blob);

    const a =

        document.createElement("a");

    a.href = url;

    a.download = "receipt.txt";

    a.click();

}


/*
=====================================
VERIFY PAYMENT
=====================================
*/

function verifyPayment(reference){

    console.log(

        "Verifying Payment:",

        reference

    );

    return true;

}


/*
=====================================
PAYMENT STATUS
=====================================
*/

function paymentStatus(){

    return {

        company: PAYMENT.company,

        amount: PAYMENT.amount,

        currency: PAYMENT.currency

    };

}


/*
=====================================
PAYMENT METHODS
=====================================
*/

<!-- Paystack -->
<script src="https://js.paystack.co/v1/inline.js"></script>

<script>

let trialTime = 120;

const timer = setInterval(function(){

    let min = Math.floor(trialTime / 60);
    let sec = trialTime % 60;

    document.getElementById("timer").innerHTML =
    "Trial expires in : " +
    min + "m " +
    sec + "s";

    trialTime--;

    if(trialTime < 0){

        clearInterval(timer);

        if(typeof video !== "undefined"){
            video.pause();
        }

        document.getElementById("timer").innerHTML =
        "Trial Expired";

        document.getElementById("paymentArea").style.display =
        "block";

    }

},1000);


function payDemo(){

    let method =
    document.getElementById("paymentMethod").value;

    if(method==""){

        alert("Please select a payment method.");

        return;

    }

    /* ===================
       PAYSTACK DEMO
    ==================== */

    if(method=="paystack"){

        let handler = PaystackPop.setup({

            key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx",

            email:
            document.getElementById("email").value,

            amount:10000,

            currency:"NGN",

            ref:"BTECHTV-"+Date.now(),

            callback:function(response){

                alert(
                "Paystack Demo Payment Successful\n\nReference : "
                + response.reference
                );

            },

            onClose:function(){

                alert("Payment Cancelled");

            }

        });

        handler.openIframe();

    }

    /* ===================
       PAYPAL DEMO
    ==================== */

    else if(method=="paypal"){

        alert(
        "Opening PayPal Sandbox Demo..."
        );

        window.open(
        "https://www.sandbox.paypal.com/",
        "_blank"
        );

    }

}

</script>


const paymentMethods = [

    "Paystack",

    "Flutterwave",

    "Bank Transfer",

    "USSD",

    "Card Payment"

];

console.table(paymentMethods);


/*
=====================================
MODULE READY
=====================================
*/

console.log("Payment Module Loaded");