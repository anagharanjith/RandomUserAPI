import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.users.length); 
      setUserData(data.users[randomIndex]); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshData = () => {
    fetchUserData();
    setBgColor(getRandomColor());
  };

  const getRandomColor = () => {
    const maxColorComponent = 200;
    const red = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
    const green = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
    const blue = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
  return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <> 
        <Card className='container d-flex justify-content-center mt-5 align-item-center shadow' style={{ width: '22rem', backgroundColor: bgColor }}>
          {userData && (
            <>
              <Card.Img className='d-flex justify-content-center ms-auto me-auto mt-3' style={{height:'30%',width:'30%'}} variant="top" src={userData.image} />
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <h6></h6>
                  <h6></h6>
                  <h6></h6>
                </div><br />
                <div className='text-center'>
                <h4>{userData.firstName} {userData.lastName}, {userData.age}</h4>
                <h5>{userData.address ? `${userData.address.address}, ${userData.address.postalCode}, ${userData.address.city}` : ''}</h5>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p><i className="fa-solid fa-phone"></i>{userData.phone}</p>
                  <p><i className="fa-solid fa-calendar-days"></i>{userData.birthDate}</p>
                </div>
                <Button variant="info" onClick={refreshData}>Get New user</Button>
              </Card.Body>
            </>
          )}
        </Card>
    </>
  )
}

export default App;
