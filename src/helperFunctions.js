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

  // Get ticket by id
  export const getTicketById = async (id, setState) => {
    try {
      const response = await fetch(`http://localhost:8000/get-ticket/${id}`);

      const data = await response.json();
      setState(data)
    } catch (e) {
      console.error(e);
    }
  };

  // Add response 
  export const addResponse = async (response, setResponse) => {
    try {
      const newResponse = await fetch("http://localhost:8000/add-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const data = await newResponse.json();
      setResponse(null)
    } catch (e) {
      console.error(e);
    }
  };

  // Update ticket properties
  export const updateTicketProperties = async (e, currentTicket) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/edit-ticket-properties",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTicket),
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Get responses by ticket id
  export const getTicketResponses = async (id, setResponse) => {
    try {
      const response = await fetch(`http://localhost:8000/responses/${id}`);
      const data = await response.json();
      setResponse(data)
    } catch(e) {
      console.error(e)
    }
  }