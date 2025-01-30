import React from 'react';
import './index.css';
import arrow from '../../img/arrow-down black.svg'


const InputOptions = ({
  options,
  clicked,
  setClicked,
  choiceMade,
  setChoiceMade,
  setButtonActive
}) => {


  function handleClick(
    clicked,
    setClicked
  ) {
    if (clicked === false) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }
  

  return  (
    <div
      className='inputClicked'
      onClick={e => {
        e.stopPropagation();
        handleClick(clicked, setClicked);
      }}
    >
      <div className='pStyle'>
        <p>
          {options.filter(opt => opt[0] === choiceMade).join('').slice(2) || " "} 
        </p>
     <img src={arrow} alt="" className={clicked ? "rotate" : ""} />
      </div>
      <div
        className={clicked ? "visible" : 'hidden'}
      >
        {options
          .map((opt, i) => {
            return (
              choiceMade === opt[0] ? (
                <div key={i+100} className='checkOpt'>
                  <li
                    onClick={() => { setChoiceMade(opt[0]); setButtonActive(true) } }
                >   
                {opt[1]}
              </li>
                </div>
              ) : (
              <div  key={i}
              className='checkOpt'>
               <li onClick={() => { setChoiceMade(opt[0]); setButtonActive(true) }}>
              {opt[1]}
              </li>  
              </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default InputOptions;
