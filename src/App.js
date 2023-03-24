import { useEffect, useState } from "react";
import Button from "./components/Button";
import ErrorMsg from "./components/Error";

function useOutsideAlerter(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}

function App() {

  const [submitScreen, setSubmitScreen] = useState(false);
  const [widthArray, setWidthArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [selectBlock, setSelectedBlock] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [roleActive, setRoleActive] = useState("");
  const [goals, setGoals] = useState([]);
  const [searchCountryModal, setSearchCountryModal] = useState(false);
  const [searchCountryValue, setSearchCountryValue] = useState("");

  const [country, setCountry] = useState({
    name: "India",
    code: "IN",
    phone: 91,
  });

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    industry: false,
    role: false,
    goals: false,
  });

  return (
    <div className="App">
     <h1>hello</h1>
    </div>
  );
}

export default App;
