export function initAuth() {
    const signUpBtn = document.getElementById("signUpButton");
    const signUpDiv = document.getElementById("registerInputs");
    const signUpComplete = document.getElementById("registrationComplete");
  
    if (signUpBtn && signUpDiv && signUpComplete) {
      signUpBtn.addEventListener("click", () => {
        signUpDiv.classList.add("disappear");
        signUpComplete.classList.add("appear");
      });
    }
  }