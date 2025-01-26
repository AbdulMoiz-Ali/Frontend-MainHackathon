import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../configration/firebaseconfig/firebaseconfig';

function Signup() {
  const navigate = useNavigate();
  const firstname = useRef()
  const lastname = useRef()
  const email = useRef()
  const password = useRef()
  const [loder, setloder] = useState(null)

  const signupfoam = (e) => {
    e.preventDefault();
    setloder(true)
    const userdata = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      password: password.current.value
    };
    // console.log(userdata)

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), userdata).then((userRef) => {
          // console.log("succseass")
          console.log(user.uid)

        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);
      }).finally(() => {
        setloder(false);
        navigate("/")
      });
  }






  const logingo = () => {
    // Navigate to specific path
    navigate('/login')
  }
  return (
    <>
      <section className="h-screen bg-purple-300 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex py-8 justify-center px-4 mx-auto max-w-screen-xl lg:py-12 z-10 relative">
          <div className="w-full h-full lg:max-w-xl p-5 space-y-5 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Register to Microfinance
            </h2>
            {loder ? (
              <div className="loader mx-auto mt-4"></div>
            ) : (
              <form onSubmit={signupfoam} className="mt-2 space-y-4">
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                    <input ref={firstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input ref={lastname} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CNIC No .</label>
                  <input ref={email} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>


                <div className="flex flex-col max-sm:gap-10 gap-5 items-center">
                  <button type="submit" className="bg-purple-900 w-50 px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {loder ? (
                    <div className="loader">loding................................</div>
                  ) : ("Login to your account")}</button>
                  <div className="text-sm max-sm:w-30 font-medium text-gray-900 dark:text-white">
                    Already have an account? <button onClick={logingo} className="text-blue-600 hover:underline dark:text-blue-500">Login here...</button>
                  </div>
                </div>
              </form>)}
          </div>
        </div>
      </section>

    </>
  )
}


// export default user
export default Signup