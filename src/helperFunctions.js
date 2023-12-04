// Update state on change of input value
export const handleChange = (e, state, setState) => {
    const {name, value} = e.target
    setState({
        ...state,
        [name] : value
    })
}


// Get agents from db
export const getAgents = async (company, setState) => {
    try {
      const response = await fetch(
        `http://localhost:8000/agents/${company}`
      );
      const data = await response.json();
      setState(data);
    } catch (e) {
      console.error(e);
    }
  };

// Get contacts from db
export const getContacts = async (company, setState) => {
    try {
      const response = await fetch(
        `http://localhost:8000/contacts/${company}`
      );
      const data = await response.json();
      setState(data);
    } catch (e) {
      console.error(e);
    }
  };


  // Get tickets by company
  export const getTickets = async (company, setState) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tickets/${company}`
      );
      const data = await response.json();

      setState(data);
    } catch (e) {
      console.error(e);
    }
  };