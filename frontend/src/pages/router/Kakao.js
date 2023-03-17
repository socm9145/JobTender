import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";

const Kakao = () => {
  // const location = useLocation();
  // const key = location.key;
  // // console.log(key);

  // const params = new URLSearchParams(window.location.search);
  // console.log(params);

  // const currentUrl = window.location;
  // const currentUrl = window.location.href;
  // console.log(currentUrl);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myParam = params.get("code");
  // console.log(location);
  // console.log(params);
  console.log(myParam);
  const data = {
    grant_type: "authorization_code",
    client_id: "1d00d14f1ffe2865a5b8a876c3de14da", //REST API
    // client_id: "16e141611c0dc15d1e07641489d44c46",  // JS
    redirect_uri: "http://localhost:3000/kakao",
    code: myParam,
  };

  useEffect(() => {
    console.log(data);
    axios
      .post("https://kauth.kakao.com/oauth/token", qs.stringify(data), {
        "Content-Type": "application/json",
      })

      .then(function (response) {
        console.log(response.data);
        const accessToken = response.data["access_token"];
        return accessToken;
      })
      .catch(function (error) {
        console.log(error);
        console.log("에러");
      })
      .then(function (accessToken) {
        console.log(accessToken);
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        axios
          .get("https://kapi.kakao.com/v2/user/me", { headers: headers })
          .then(function (response) {
            console.log(response);
          });
      });
  }, []);

  return <div>카카오 로그인 진행 페이지</div>;
};

export default Kakao;
