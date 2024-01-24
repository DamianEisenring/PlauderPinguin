import React, { useState } from 'react';

function Welcome() {
  const [contactname, setContactname] = useState('');
  const [contactId, setContactId] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === 'contactname' ? setContactname(value) : setContactId(parseInt(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5162/ChatController/createContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contactname: contactname,
          ContactId: parseInt(contactId),
        }),
      });

      if (response.ok) {
        console.log('Contact created successfully');
      } else {
        console.error('Failed to create contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Welcome">
      <form onSubmit={handleSubmit}>
        <label>
          Contact Name:
          <input
            type="text"
            name="contactname"
            value={contactname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Contact ID:
          <input
            type="number"
            name="contactId"
            value={contactId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default Welcome;
