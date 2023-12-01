let otpCode = '123456'; 
let otpExpirationTime = 10 * 1000; 

function expireOTP() {
  otpCode = null; 
  console.log('کد OTP منقضی شد.');
}

const otpTimer = setTimeout(expireOTP, otpExpirationTime);

function checkOTP(userOTP) {
  if (userOTP === otpCode) {
    console.log('کد OTP معتبر است.');
    clearTimeout(otpTimer); 
  } else {
    console.log('کد OTP نامعتبر است.');
  }
}


