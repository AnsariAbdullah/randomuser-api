import React, { useState } from 'react';
import './date.css';

// add about section taken from an array using Math.random
// or 
// below add emoji to describe her taken from an array using Math.random
// and
// add a loader on button after its clicked

const Date = () => {
  const [contacts, setContacts] = useState([]);
  
  function fetchData() {
    document.getElementById("api-button").innerHTML = '<span class="loading">⏳</span>';
    setTimeout(
      ()=>{
        fetch("https://randomuser.me/api/?results=1&gender=female")
        .then(response => response.json())
        .then(data => {
          console.log(data.results)
          setContacts(data.results)
        });
      }
      , 800
    );
  }
  
  return(
    <div className="container">
      <h1 className="title">Your potential mate</h1>
      { contacts && contacts.length ? 
        <div className="wrapper">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              avatar={contact.picture.large}
              name={contact.name.first + ' ' + contact.name.last}
              city={contact.location.city}
              country={contact.location.country}
            />
          ))}
        </div>
        : 
        <button id="api-button" onClick={fetchData}>
          Fetch my future partner ❤️
        </button>
      }
    </div>
  )
}

const ContactCard = (props) => {
  return(
    <div className="contact-card">
      <div className="image-wrapper">
        <img src={props.avatar} alt="profile" />
      </div>
      <div className="user-details">
        <p>Name: {props.name}</p>
        <p>City: {props.city}</p>
        <p>Country: {props.country}</p>
      </div>
    </div>
  )
}

export default Date;