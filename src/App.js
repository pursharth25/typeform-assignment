import { useEffect, useState } from "react";
import Button from "./components/Button";
import ErrorMsg from "./components/Error";
import { industriesData } from "./data/industries";
import { countriesData } from "./data/countries";

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

  useEffect(() => {
    let tmpArr = [...widthArray];
    if (formValues.firstName !== "") {
      tmpArr[0] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[0] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.lastName !== "") {
      tmpArr[1] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[1] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.email !== "") {
      tmpArr[2] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[2] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.phone !== "") {
      tmpArr[3] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[3] = 0;
      setWidthArray(tmpArr);
    }
    if (searchInput !== "") {
      tmpArr[4] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[4] = 0;
      setWidthArray(tmpArr);
    }
    if (roleActive !== "") {
      tmpArr[5] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[5] = 0;
      setWidthArray(tmpArr);
    }
    if (goals.length !== 0) {
      tmpArr[6] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[6] = 0;
      setWidthArray(tmpArr);
    }
  }, [formValues, searchInput, roleActive, goals]);

  const topWidthBar = widthArray.reduce((partialSum, a) => partialSum + a, 0);

  const requestData = {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    phone: formValues.phone,
    industry: searchInput,
    roleActive: roleActive,
    goals: goals,
  };

  const inputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const roleRef = useRef(null);
  const goalsRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchCountryModalRef = useRef(null);
  useOutsideAlerter(searchCountryModalRef, setSearchCountryModal);

  function handleSelectBlockClick(item) {
    setSelectedBlock(false);
    setSearchInput(item);
    roleRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const rolesData = [
    {
      id: "A",
      name: "Founder or CXO",
    },
    {
      id: "B",
      name: "Product Team",
    },
    {
      id: "C",
      name: "Marketing Team",
    },
    {
      id: "D",
      name: "VC",
    },
    {
      id: "E",
      name: "Other",
    },
  ];

  const goalData = [
    {
      id: "A",
      name: "Get hired",
    },
    {
      id: "B",
      name: "Get promoted",
    },
    {
      id: "C",
      name: "Connect with like-minded people",
    },
    {
      id: "D",
      name: "Structured approach to growth",
    },
    {
      id: "E",
      name: "Build a growth team",
    },
  ];

  const goalCount =
    goals.length === 2 ? false : goals.length === 1 ? "1 more" : "2";

  const handleSubmit = () => {
    if (formValues.firstName === "") {
      setErrorMsg({ ...errorMsg, firstName: true });
      firstNameInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstNameInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.lastName === "") {
      setErrorMsg({ ...errorMsg, lastName: true });
      lastNameInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      lastNameInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.email === "") {
      setErrorMsg({ ...errorMsg, email: true });
      emailInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      emailInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.phone === "") {
      setErrorMsg({ ...errorMsg, phone: true });
      phoneInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      phoneInputRef.current.focus({
        preventScroll: true,
      });
    } else if (searchInput === "") {
      setErrorMsg({ ...errorMsg, industry: true });
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      inputRef.current.focus({
        preventScroll: true,
      });
    } else if (roleActive === "") {
      setErrorMsg({ ...errorMsg, role: true });
      roleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      roleRef.current.focus({
        preventScroll: true,
      });
    } else if (goals.length === 0) {
      setErrorMsg({ ...errorMsg, goals: true });
      goalsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      goalsRef.current.focus({
        preventScroll: true,
      });
    } else {
      fetch("https://eo3oi83n1j77wgp.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setSubmitScreen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="App">
     <h1>hello</h1>
    </div>
  );
}

export default App;
