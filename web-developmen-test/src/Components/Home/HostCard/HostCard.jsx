import { Container, Card } from "react-bootstrap"
import "./card.css"
import { useEffect, useState } from "react"

import { useHistory } from "react-router";
const UserCard = () => {
    const [loginValidation, setLoginValidation] = useState(false);

    const [userData, setUserData] = useState({})
    let history = useHistory()

    const getUserData = async () => {
        let token = "Bearer " + window.localStorage.getItem("user_Token");
        try {
            let response = await fetch(`${process.env.REACT_APP_API_HOST}/loginuser`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            if (response.ok) {
                let userData = await response.json();
                await setUserData(userData)
                console.log(userData)
                if (userData.email === undefined) {
                    setLoginValidation(true);
                    return;
                }

            } else {
                setLoginValidation(true);
            }
        } catch (e) {
            ;
            return e;
        }
    };

    useEffect(() => {
        getUserData()

    }, [])


    return (
        <>
            <Container className=" d-flex justify-content-center">


                <Card className="card mt-4 ">
                    <div className="card__image-container">
                        <img className="card__image mt-3" src={userData.picture} alt="" width="400" height="300" />
                    </div>
                    <svg className="card__svg" viewBox="0 0 800 500">

                        <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                        <path className="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                    </svg>


                    <div className="card__content">



                        <h1 className="card__title mt-3">
                            <div>{userData.first_name}
                            </div>
                            <div>{userData.last_name}</div>

                        </h1>
                        <h3>{userData.nickname}</h3>
                        <p>{userData.email}</p>

                    </div>

                </Card>


            </Container>

        </>
    )
}





export default UserCard