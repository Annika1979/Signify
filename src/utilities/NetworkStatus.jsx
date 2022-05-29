import React from 'react'
import { useState, useEffect } from 'react'
import '../../scss/netcss.css';


function NetworkStatus() {
  let [offline, isOnline] = useState(navigator.onLine);

  const setOnline = () => {
    isOnline(true);
  };
  const setOffline = () => {
    isOnline(false);
  };

  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);


    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  });
  return (
    <div className='parent'>

      {!offline ? (
        <div className='offlineduvet'>
          <h1 className='text2'>Backoffice, samt beställningar är förnärvarande "offline"</h1>
        </div>

      ) : (

        null
      )}

    </div>

  )
}

export default NetworkStatus