import axios from "axios";

import { sessionService } from "redux-react-session";

export const loginUser = (credentials, history, setFieldError, setSubmitting) => {

    return () => {

    axios.post("https://obscure-atoll-80604.herokuapp.com/user/signin", credentials, 
    {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //check for specific error
            if(message.includes("Email")) {
                setFieldError("email", message);
                
            } else if (message.includes("password")) {
                setFieldError("password", message);
            }

        } else if (data.status === "SUCCESS") {
            const userData = data.data;

            const token = userData._id;

            sessionService
                .saveSession(token)
                .then(() => {
                    sessionService.saveUser(userData).then(() => {
                        history.push("/dashboard");
                    }).catch(err => console.error(err))
                }).catch(err => console.error(err))
        }

        //complete submitting
        setSubmitting(false);

    }).catch(err => console.error(err))
}
};

export const signupUser = (credentials, history, setFieldError, setSubmitting) => {

    return (dispatch) => {

    axios.post("https://obscure-atoll-80604.herokuapp.com/user/signup", credentials, 
    {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //cheching for specific error
            if (message.includes("name")) {
                setFieldError("name", message);
            } else if (message.includes("email")) {
                setFieldError("email", message);
            } else if (message.includes("date")) {
                setFieldError("date", message);
            } else if (message.includes("Password")) {
                setFieldError("password", message);
            }

            //complete Submitting
            setSubmitting(false);

        } else if (data.status === "SUCCESS") {
            //Login user after successful signup
            const {email, password} = credentials;

            dispatch(
                loginUser({email, password}, history, setFieldError, setSubmitting)
            );
        }


    }).catch(err => console.error(err));
}
};

export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.push("/");
    }
};

export const getAvailableFiremans = (setList) => {
    const url = "https://obscure-atoll-80604.herokuapp.com/user/list";
    const list = true;

    axios
    .post(url, list)
    .then((response) => {
        const result = response.data;
        const { data } = result;
        
        
        let array = [...data]
        let [index0] = array;

        

        let array2 = [...index0]
        
        let Names = [];

        for(let i = 0; i < array2.length; i++) {
            Names.push(array2[i].name + "    ");
        }


        setList(Names);
        
        //setIsSubmiting(false);
             
    })
    .catch(error => {
        console.log(error.JSON());          
    });
}
