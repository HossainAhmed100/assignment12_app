import axios from "../axios";
import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoding, setAdminLoding] = useState(true);
  useEffect(() => {
    if (email) {
      axios
        .get(`users/admin/${email}`)
        .then((res) => {
          if (res.data.isAdmin) {
            setAdminLoding(false);
          }
          setIsAdmin(res.data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [email]);
  return [isAdmin, adminLoding];
};

export default useAdmin;
