import { useEffect } from "react";


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
  return (
    <div className="App">
     <h1>hello</h1>
    </div>
  );
}

export default App;
