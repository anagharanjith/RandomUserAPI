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
      <h2 className='text-center mt-4'>Random User On Refresh</h2>
      <Card className='container d-flex justify-content-center mt-5 align-item-center shadow' style={{ width: '60%', backgroundColor: bgColor }}>
        {userData && (
          <>
            <Card.Body>
              <div class="container">
                <div class="row">
                  <div class="col-md-6">
                    <div class='text-center'>
                      <div className='text-center'>
                      <Card.Img className='d-flex justify-content-center ms-auto me-auto mt-3' style={{ height: '30%', width: '30%' }} variant="top" src={userData.image} />
                        <h4>{userData.firstName} {userData.lastName}</h4>
                        <h6>{userData.gender}</h6>
                      </div>
                      <div className="d-flex justify-content-around">
                      <div className="d-flex flex-column">
                      <h6>Birth Date</h6>
                      <p> {userData.birthDate} </p>
                      </div>
                      <div className="d-flex flex-column">
                      <h6>Age  <br /></h6>
                      <p> {userData.birthDate} </p>
                      </div>
                      </div>
                      <div className="d-flex justify-content-around">
                      <h6>Weight : <br /> {userData.weight} </h6>
                      <h6>Height : <br /> {userData.height} </h6>
                      </div>
                      <Button variant="info" onClick={refreshData}>REFRESH</Button>
                    </div>
                  </div>
                  <div class="col-md-6 text-center">
                      <h5>Home Address  <br /></h5>
                      <p> {userData.address ? `${userData.address.address}` : ''}</p>
                      <h5>Mobile Phone  <br /></h5>
                      <p> {userData.phone}</p>
                      <h5> Company  <br /></h5>
                      <p>{userData.company.name}</p>
                      <h5> Job Title  <br /></h5>
                      <p>{userData.company.title} </p>
                      <h5> Email  <br /></h5>
                      <p>{userData.email}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </>
        )}
      </Card>
    </>
  )
}

export default App;
