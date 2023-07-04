export default function handleExpandMenu({setTurnOn, turnOn, setTurnOff1,setTurnOff2}) {
    setTurnOn(!turnOn);
    setTurnOff1(false);
    setTurnOff2(false);
  }